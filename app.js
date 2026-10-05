"use strict";
const $ = (s) => document.querySelector(s);
const RONDES = 10;
const SNEL_SEC = 60;
const MEMORY_PAREN = 6;
const OPSLAG = "ponyquiz-v1";

const staat = JSON.parse(localStorage.getItem(OPSLAG) || "{}");
staat.heb = staat.heb || {};        // naam -> true als ooit goed geraden
staat.records = staat.records || {}; // modus -> beste score
if (staat.record) { staat.records.foto = staat.record; delete staat.record; }
const bewaar = () => localStorage.setItem(OPSLAG, JSON.stringify(staat));

const MODI = {
  foto: "📸 Wie is dit?", weetje: "🔎 Wie ben ik?", trivia: "🧠 Pony-trivia", manege: "🏇 Manege-weetjes",
  mix: "🎲 Grote mix", snel: "⏱️ Snelle ronde", memory: "🃏 Memory",
  tikspel: "🏇 Vies & Lekker land", waar: "✅ Klopt het?", hussel: "🔤 Hussel de naam", ruiter: "🎒 Maak de ruiter klaar", puzzel: "🧩 Pony-puzzel",
};
const LAAG_IS_BETER = ["memory", "puzzel"];
const PONY = Object.fromEntries(PONYS.map((p) => [p.naam, p]));

let spel = null;
let klok = null;

const schud = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const kies = (a) => a[Math.floor(Math.random() * a.length)];
const zonderAccent = (t) => t.normalize("NFD").replace(/[̀-ͯ]/g, "");
const esc = (t) => t.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

function toon(id) {
  document.querySelectorAll(".scherm").forEach((s) => s.classList.toggle("actief", s.id === id));
  window.scrollTo(0, 0);
}

function telling() {
  $("#verzameld").textContent = PONYS.filter((p) => staat.heb[p.naam]).length;
  $("#totaal").textContent = PONYS.length;
  const delen = Object.entries(staat.records).filter(([m]) => MODI[m])
    .map(([m, v]) => `${MODI[m].split(" ")[0]} ${v}${LAAG_IS_BETER.includes(m) ? " zetten" : ""}`);
  $("#record").textContent = delen.length ? "🏆 Records: " + delen.join(" · ") : "";
}

function verzamel(p) {
  if (!p || staat.heb[p.naam]) return;
  staat.heb[p.naam] = true;
  spel.nieuw.push(p);
  bewaar();
  telling();
}

// Naam (en losse delen ervan) wegpoetsen uit het weetje, voor "Wie ben ik?"
function verstop(p) {
  const delen = new Set([p.naam, ...p.naam.split(/[ ’']/)].filter((d) => d.length > 2 && !/^(du|Man|Pet|Gem)$/.test(d)));
  if (p.naam === "Shetlanders") delen.add("shetlander");
  let t = esc(p.tekst);
  for (const d of [...delen].sort((a, b) => b.length - a.length)) {
    const varianten = [d, zonderAccent(d)].map((v) => v.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    t = t.replace(new RegExp(`(${varianten.join("|")})(s)?`, "gi"), "<mark>???</mark>");
  }
  return t.replace(/(<mark>\?\?\?<\/mark>)(\s*<mark>\?\?\?<\/mark>)+/g, "$1");
}

const andere = (p, n = 3, niet = []) => schud(PONYS.filter((x) => x !== p && !niet.includes(x.naam))).slice(0, n);

// ---------- vraag-makers: elk geeft { titel, foto?, tekst?, fotoKeuzes?, opties:[{key,label,foto?}], juist, uitleg } ----------
const MAKERS = {
  foto(p) {
    p = p || kies(PONYS);
    const foto = kies(p.fotos);
    return {
      titel: "📸 Wie is dit?", foto, pony: p,
      opties: schud([p, ...andere(p)]).map((o) => ({ key: o.naam, label: o.naam })), juist: p.naam,
      uitleg: { foto, naam: p.naam === "Shetlanders" ? "Dit zijn de shetlanders" : `Dit is ${p.naam}`, tekst: p.tekst },
    };
  },
  weetje(p) {
    p = p || kies(PONYS);
    const foto = kies(p.fotos);
    return {
      titel: "🔎 Wie ben ik?", html: verstop(p), fotoKeuzes: true, pony: p,
      opties: schud([p, ...andere(p)]).map((o) => ({ key: o.naam, label: o.naam, foto: o === p ? foto : kies(o.fotos) })), juist: p.naam,
      uitleg: { foto, naam: `Dit is ${p.naam}`, tekst: p.tekst },
    };
  },
  trivia(q) {
    q = q || kies(PONY_VRAGEN);
    const p = PONY[q.a];
    const foto = kies(p.fotos);
    return {
      titel: "🧠 " + q.v, pony: p, triviaVraag: q,
      opties: schud([p, ...andere(p, 3, q.niet || [])]).map((o) => ({ key: o.naam, label: o.naam })), juist: p.naam,
      uitleg: { foto, naam: `Het is ${p.naam}!`, tekst: (q.hint ? q.hint + " " : "") + p.tekst },
    };
  },
  manege(q) {
    q = q || kies(MANEGE_VRAGEN);
    return {
      titel: q.e + " " + q.v, manegeVraag: q,
      opties: schud([q.goed, ...q.fout]).map((o) => ({ key: o, label: o })), juist: q.goed,
      uitleg: { emoji: q.e, naam: `Antwoord: ${q.goed}`, tekst: q.uitleg, bron: `Bron: manegehooidonk.nl – ${q.bron}` },
    };
  },
  waar(q) {
    q = q || kies(STELLINGEN());
    const klopt = Math.random() < .5;
    let html, foto, uitleg;
    if (q.a) {
      const p = PONY[q.a];
      const ander = klopt ? p : kies(andere(p, 3, q.niet || []));
      foto = kies(ander.fotos);
      html = `<b>${esc(ander.naam)}</b> ${esc(q.v.replace(/^Wie /, "").replace(/\?$/, "."))}`;
      uitleg = { foto: kies(p.fotos), naam: klopt ? `Ja! Dat is ${p.naam}.` : `Nee, dat is ${p.naam}!`, tekst: (q.hint ? q.hint + " " : "") + p.tekst };
      return { titel: "✅ Klopt het?", foto, html, pony: p, opties: [{ key: "ja", label: "👍 Klopt" }, { key: "nee", label: "👎 Klopt niet" }], juist: klopt ? "ja" : "nee", uitleg, tweeKeuzes: true };
    }
    const antw = klopt ? q.goed : kies(q.fout);
    html = `${esc(q.v)}<br><span class="stelling">👉 ${esc(antw)}</span>`;
    uitleg = { emoji: q.e, naam: klopt ? `Ja! ${q.goed}` : `Nee, het is: ${q.goed}`, tekst: q.uitleg, bron: `Bron: manegehooidonk.nl – ${q.bron}` };
    return { titel: "✅ Klopt het?", html, opties: [{ key: "ja", label: "👍 Klopt" }, { key: "nee", label: "👎 Klopt niet" }], juist: klopt ? "ja" : "nee", uitleg, tweeKeuzes: true };
  },
};

// stellingen voor "Klopt het?": pony-vragen die met "Wie" beginnen + manege-vragen
const STELLINGEN = () => [...PONY_VRAGEN.filter((q) => q.v.startsWith("Wie ")), ...MANEGE_VRAGEN];

function rondeVragen(modus) {
  if (modus === "waar") return schud(STELLINGEN()).slice(0, RONDES).map((q) => () => MAKERS.waar(q));
  if (modus === "foto" || modus === "weetje") return schud(PONYS).slice(0, RONDES).map((p) => () => MAKERS[modus](p));
  if (modus === "trivia") return schud(PONY_VRAGEN).slice(0, RONDES).map((q) => () => MAKERS.trivia(q));
  if (modus === "manege") return schud(MANEGE_VRAGEN).slice(0, RONDES).map((q) => () => MAKERS.manege(q));
  // mix: van elke soort wat, zonder dubbele vragen
  const soorten = schud(["foto", "foto", "foto", "weetje", "weetje", "trivia", "trivia", "manege", "manege", "waar"]);
  const ponys = schud(PONYS), trivia = schud(PONY_VRAGEN), manege = schud(MANEGE_VRAGEN);
  return soorten.map((s) => () => MAKERS[s](s === "trivia" ? trivia.pop() : s === "manege" ? manege.pop() : s === "waar" ? null : ponys.pop()));
}

// ---------- quiz ----------
function start(modus) {
  clearInterval(klok);
  if (modus === "tikspel") return tikspelStart();
  if (modus === "memory") return memory();
  if (modus === "hussel") return hussel();
  if (modus === "ruiter") return ruiter();
  if (modus === "puzzel") return puzzel();
  spel = { modus, nr: 0, punten: 0, reeks: 0, goed: 0, nieuw: [], snel: modus === "snel" };
  spel.rij = spel.snel ? [] : rondeVragen(modus);
  $("#reeks").hidden = true;
  $("#klok").hidden = !spel.snel;
  toon("quiz");
  if (spel.snel) {
    spel.eind = Date.now() + SNEL_SEC * 1000;
    spel.stapel = schud(PONYS);
    klok = setInterval(tik, 200);
    tik();
  }
  vraag();
}

function tik() {
  const over = Math.max(0, Math.ceil((spel.eind - Date.now()) / 1000));
  $("#klok b").textContent = over;
  $("#klok").classList.toggle("bijna", over <= 10);
  $("#balk").style.width = `${((SNEL_SEC - over) / SNEL_SEC) * 100}%`;
  if (over <= 0) { clearInterval(klok); einde(); }
}

function vraag() {
  if (spel.snel && !spel.stapel.length) spel.stapel = schud(PONYS);
  const v = spel.huidig = spel.snel ? MAKERS.foto(spel.stapel.pop()) : spel.rij[spel.nr]();
  spel.beantwoord = false;

  $("#vraagNr").textContent = spel.snel ? `${spel.goed} goed` : `${spel.nr + 1}/${RONDES}`;
  if (!spel.snel) $("#balk").style.width = `${(spel.nr / RONDES) * 100}%`;
  $("#punten").textContent = spel.punten;
  $("#uitleg").hidden = true;
  $("#vraag").textContent = spel.snel ? "⏱️ Wie is dit?" : v.titel;
  $("#vraag").classList.toggle("lang", v.titel.length > 40);

  $("#vraagFoto").hidden = !v.foto;
  if (v.foto) $("#vraagFoto img").src = v.foto;
  $("#vraagTekst").hidden = !v.html;
  if (v.html) $("#vraagTekst").innerHTML = v.html;

  const keuzes = $("#keuzes");
  keuzes.innerHTML = "";
  keuzes.className = "keuzes" + (v.fotoKeuzes ? " fotos" : "") + (v.tweeKeuzes ? " twee" : "") + (v.opties.some((o) => o.label.length > 22) ? " breed" : "");
  v.opties.forEach((o) => {
    const b = document.createElement("button");
    b.className = "keuze";
    b.dataset.key = o.key;
    b.innerHTML = o.foto ? `<img src="${o.foto}" alt="${esc(o.label)}"><span hidden>${esc(o.label)}</span>` : esc(o.label);
    b.onclick = () => antwoord(o.key, b);
    keuzes.append(b);
  });
  // volgende foto's alvast laden
  if (spel.snel && spel.stapel.length) spel.stapel.at(-1).fotos.forEach((f) => { new Image().src = f; });
}

function antwoord(key, gekozen) {
  if (spel.beantwoord) return;
  spel.beantwoord = true;
  const v = spel.huidig;
  const goed = key === v.juist;
  document.querySelectorAll(".keuze").forEach((b) => {
    b.disabled = true;
    if (b.dataset.key === v.juist) b.classList.add("goed");
    const naam = b.querySelector("span");
    if (naam) naam.hidden = false;
  });
  if (!goed) gekozen.classList.add("fout");

  if (goed) {
    spel.reeks++;
    spel.goed++;
    spel.punten += 10 + Math.min(spel.reeks - 1, 5) * 2;
    verzamel(v.pony);
    if (spel.reeks >= 3 && !spel.snel) confetti(25);
  } else spel.reeks = 0;
  $("#punten").textContent = spel.punten;
  const r = $("#reeks");
  r.hidden = spel.reeks < 2;
  r.querySelector("b").textContent = spel.reeks;

  if (spel.snel) { setTimeout(() => { if (Date.now() < spel.eind) vraag(); }, goed ? 450 : 1100); return; }

  const u = v.uitleg;
  const oordeel = $("#uitlegOordeel");
  oordeel.textContent = goed ? kies(["Goed zo! 🎉", "Helemaal goed! ⭐", "Jij weet het! 🐴", "Top! 🏆", "Knap hoor! 💪"]) : "Oeps, bijna! 🙈";
  oordeel.className = `oordeel ${goed ? "goed" : "fout"}`;
  $("#uitlegNaam").textContent = u.naam;
  $("#uitlegFoto").hidden = !u.foto;
  if (u.foto) $("#uitlegFoto").src = u.foto;
  $("#uitlegEmoji").hidden = !u.emoji;
  $("#uitlegEmoji").textContent = u.emoji || "";
  $("#uitlegTekst").textContent = u.tekst;
  $("#uitlegBron").textContent = u.bron || "";
  $("#volgende").textContent = spel.nr + 1 < RONDES ? "Volgende ▶" : "Uitslag 🏁";
  $("#uitleg").hidden = false;
  setTimeout(() => $("#uitleg").scrollIntoView({ behavior: "smooth", block: "start" }), 150);
}

function volgende() {
  spel.nr++;
  if (spel.nr < RONDES) { vraag(); window.scrollTo({ top: 0, behavior: "smooth" }); }
  else einde();
}

function einde() {
  const { goed, punten, nieuw, modus } = spel;
  let sterren, tekst;
  if (spel.uitslag) {
    ({ sterren, tekst } = spel.uitslag);
    const oud = staat.records[modus], score = spel.uitslag.score;
    const beter = LAAG_IS_BETER.includes(modus) ? !oud || score < oud : score > (oud || 0);
    if (beter) { if (oud) tekst += " 🏆 Nieuw record!"; staat.records[modus] = score; bewaar(); }
  } else if (modus === "memory") {
    sterren = spel.zetten <= 9 ? 3 : spel.zetten <= 13 ? 2 : 1;
    tekst = `Je vond alle ${MEMORY_PAREN} paren in ${spel.zetten} beurten.`;
    const oud = staat.records.memory;
    if (!oud || spel.zetten < oud) { if (oud) tekst += " 🏆 Nieuw record!"; staat.records.memory = spel.zetten; bewaar(); }
  } else {
    sterren = spel.snel ? (goed >= 20 ? 3 : goed >= 12 ? 2 : goed >= 5 ? 1 : 0) : goed >= 9 ? 3 : goed >= 6 ? 2 : goed >= 3 ? 1 : 0;
    tekst = spel.snel ? `Je raadde er ${goed} goed in ${SNEL_SEC} seconden en scoorde ${punten} punten.` : `Je had er ${goed} van de ${RONDES} goed en scoorde ${punten} punten.`;
    if (punten > (staat.records[modus] || 0)) {
      if (staat.records[modus]) tekst += " 🏆 Nieuw record!";
      staat.records[modus] = punten; bewaar();
    }
  }
  telling();
  $("#sterren").innerHTML = [0, 1, 2].map((i) => `<span style="animation-delay:${i * .25}s">${i < sterren ? "⭐" : "☆"}</span>`).join("");
  $("#eindTitel").textContent = ["Goed geprobeerd!", "Lekker bezig!", "Super gedaan!", "Pony-kampioen!"][sterren];
  $("#eindTekst").textContent = tekst;
  $("#nieuw").innerHTML = nieuw.length
    ? `<p style="width:100%;margin:0;font-weight:800">Nieuw in je stal:</p>` + nieuw.map((p) => `<figure><img src="${p.fotos[0]}" alt=""><figcaption>${esc(p.naam)}</figcaption></figure>`).join("")
    : "";
  toon("einde");
  if (sterren >= 2) confetti(90);
}

// ---------- memory ----------
function memory() {
  const ponys = schud(PONYS.filter((p) => p.naam !== "Shetlanders")).slice(0, MEMORY_PAREN);
  spel = { modus: "memory", zetten: 0, paren: 0, open: [], nieuw: [], bezig: false };
  const kaarten = schud(ponys.flatMap((p) => [{ p, soort: "foto", foto: kies(p.fotos) }, { p, soort: "naam" }]));
  const bord = $("#memBord");
  bord.innerHTML = "";
  kaarten.forEach((k) => {
    const b = document.createElement("button");
    b.className = "memkaart";
    b.innerHTML = `<div class="binnen"><div class="voor">🐴</div><div class="achter ${k.soort}">${k.soort === "foto" ? `<img src="${k.foto}" alt="">` : `<span>${esc(k.p.naam)}</span>`}</div></div>`;
    b.onclick = () => draai(b, k);
    bord.append(b);
  });
  $("#memZetten").textContent = 0;
  $("#memBalk").style.width = "0";
  $("#memMelding").textContent = "";
  toon("memory");
}

function draai(b, k) {
  if (spel.bezig || b.classList.contains("om")) return;
  b.classList.add("om");
  spel.open.push({ b, k });
  if (spel.open.length < 2) return;
  spel.zetten++;
  $("#memZetten").textContent = spel.zetten;
  const [x, y] = spel.open;
  spel.open = [];
  if (x.k.p === y.k.p) {
    setTimeout(() => {
      x.b.classList.add("gevonden"); y.b.classList.add("gevonden");
      spel.paren++;
      verzamel(x.k.p);
      $("#memBalk").style.width = `${(spel.paren / MEMORY_PAREN) * 100}%`;
      $("#memMelding").textContent = `🎉 ${x.k.p.naam}! ` + x.k.p.tekst.split(/(?<=\.)\s/)[0];
      if (spel.paren === MEMORY_PAREN) setTimeout(einde, 1400);
    }, 350);
  } else {
    spel.bezig = true;
    setTimeout(() => { x.b.classList.remove("om"); y.b.classList.remove("om"); spel.bezig = false; }, 1100);
  }
}

// ---------- nieuwe spellen ----------
// 🔤 Hussel de naam
const HUSSEL_AANTAL = 5;
function hussel() {
  const kandidaten = PONYS.filter((p) => p.naam !== "Shetlanders" && p.naam.replace(/[^A-Za-zÀ-ÿ]/g, "").length <= 12);
  spel = { modus: "hussel", nr: 0, punten: 0, goed: 0, nieuw: [], rij: schud(kandidaten).slice(0, HUSSEL_AANTAL) };
  toon("hussel");
  husselVraag();
}

function husselVraag() {
  const p = spel.rij[spel.nr];
  const tekens = [...p.naam.toUpperCase()];
  const letters = tekens.map((t, i) => ({ t, i })).filter((x) => /[A-ZÀ-ÿ]/i.test(x.t) && x.t !== " ");
  let volgorde;
  do { volgorde = schud(letters); } while (letters.length > 1 && volgorde.every((x, i) => x === letters[i]));
  Object.assign(spel, { p, tekens, letters, tegels: volgorde.map((x, k) => ({ t: x.t, k })), vak: {}, hints: 0, klaar: false });
  $("#husselNr").textContent = `${spel.nr + 1}/${HUSSEL_AANTAL}`;
  $("#husselBalk").style.width = `${(spel.nr / HUSSEL_AANTAL) * 100}%`;
  $("#husselPunten").textContent = spel.punten;
  $("#husselFoto").src = kies(p.fotos);
  $("#husselUitleg").hidden = true;
  $("#husselKnoppen").hidden = false;
  husselTeken();
}

function husselTeken() {
  const { tekens, vak, tegels } = spel;
  const vakken = $("#husselVakken");
  vakken.innerHTML = "";
  tekens.forEach((t, i) => {
    const el = document.createElement("button");
    if (!/[A-ZÀ-ÿ]/i.test(t) || t === " ") { el.className = "vakje vast"; el.textContent = t === " " ? "" : t; el.disabled = true; }
    else {
      el.className = "vakje" + (vak[i] ? " vol" : "");
      el.textContent = vak[i] ? vak[i].t : "";
      el.onclick = () => { if (!spel.klaar && vak[i]) { delete vak[i]; husselTeken(); } };
    }
    vakken.append(el);
  });
  const gebruikt = new Set(Object.values(vak).map((x) => x.k));
  const bak = $("#husselTegels");
  bak.innerHTML = "";
  tegels.forEach((x) => {
    const b = document.createElement("button");
    b.className = "tegel-letter";
    b.textContent = x.t;
    b.disabled = gebruikt.has(x.k) || spel.klaar;
    b.onclick = () => { const leeg = spel.letters.find((l) => !vak[l.i]); if (leeg) { vak[leeg.i] = x; husselTeken(); husselCheck(); } };
    bak.append(b);
  });
}

function husselCheck() {
  const { letters, vak } = spel;
  if (letters.some((l) => !vak[l.i])) return;
  if (letters.every((l) => vak[l.i].t === l.t)) return husselKlaar(true);
  const vakken = $("#husselVakken");
  vakken.classList.add("fout");
  setTimeout(() => {
    vakken.classList.remove("fout");
    letters.forEach((l) => { if (vak[l.i].t !== l.t) delete vak[l.i]; });
    husselTeken();
  }, 700);
}

function husselHint() {
  const { letters, vak, tegels } = spel;
  letters.forEach((l) => { if (vak[l.i] && vak[l.i].t !== l.t) delete vak[l.i]; });
  const l = letters.find((x) => !vak[x.i]);
  if (!l) return;
  const gebruikt = new Set(Object.values(vak).map((x) => x.k));
  vak[l.i] = tegels.find((x) => x.t === l.t && !gebruikt.has(x.k));
  spel.hints++;
  husselTeken();
  husselCheck();
}

function husselKlaar(goed, opgegeven) {
  spel.klaar = true;
  const p = spel.p;
  if (opgegeven) spel.letters.forEach((l) => { spel.vak[l.i] = { t: l.t, k: -1 }; });
  husselTeken();
  $("#husselVakken").classList.add(goed ? "goed" : "opgegeven");
  let erbij = 0;
  if (goed) { erbij = Math.max(5, 20 - spel.hints * 5); spel.punten += erbij; spel.goed++; verzamel(p); if (!spel.hints) confetti(25); }
  $("#husselPunten").textContent = spel.punten;
  $("#husselOordeel").textContent = goed ? (spel.hints ? `Goed zo! +${erbij} 🎉` : `Helemaal zelf! +${erbij} ⭐`) : `Het was ${p.naam}!`;
  $("#husselOordeel").className = `oordeel ${goed ? "goed" : "fout"}`;
  $("#husselTekst").textContent = p.tekst;
  $("#husselVolgende").textContent = spel.nr + 1 < HUSSEL_AANTAL ? "Volgende ▶" : "Uitslag 🏁";
  $("#husselKnoppen").hidden = true;
  $("#husselUitleg").hidden = false;
  setTimeout(() => $("#husselUitleg").scrollIntoView({ behavior: "smooth", block: "nearest" }), 150);
}

function husselVolgende() {
  spel.nr++;
  if (spel.nr < HUSSEL_AANTAL) { husselVraag(); window.scrollTo({ top: 0, behavior: "smooth" }); return; }
  const max = HUSSEL_AANTAL * 20;
  spel.uitslag = {
    score: spel.punten,
    sterren: spel.punten >= max * .85 ? 3 : spel.punten >= max * .6 ? 2 : spel.punten >= max * .3 ? 1 : 0,
    tekst: `Je spelde ${spel.goed} van de ${HUSSEL_AANTAL} namen goed en scoorde ${spel.punten} punten.`,
  };
  einde();
}

// 🎒 Maak de ruiter klaar
const RUITER_RONDES = 3;
function ruiter() {
  spel = { modus: "ruiter", nr: 0, punten: 0, nieuw: [], goedLijst: schud(UITRUSTING.filter((x) => x.goed)), foutLijst: schud(UITRUSTING.filter((x) => !x.goed)) };
  toon("ruiter");
  ruiterRonde();
}

function ruiterRonde() {
  const pak = (lijst, goed) => {
    if (lijst.length < 3) lijst.push(...schud(UITRUSTING.filter((x) => x.goed === goed && !lijst.includes(x))));
    return lijst.splice(0, 3);
  };
  spel.items = schud([...pak(spel.goedLijst, true), ...pak(spel.foutLijst, false)]);
  spel.gekozen = new Set();
  spel.gecheckt = false;
  $("#ruiterNr").textContent = `Ronde ${spel.nr + 1}/${RUITER_RONDES}`;
  $("#ruiterBalk").style.width = `${(spel.nr / RUITER_RONDES) * 100}%`;
  $("#ruiterPunten").textContent = spel.punten;
  $("#ruiterUitleg").innerHTML = "";
  $("#ruiterCheck").hidden = false;
  $("#ruiterVolgende").hidden = true;
  ruiterTeken();
}

function ruiterTeken() {
  const bord = $("#ruiterItems");
  bord.innerHTML = "";
  spel.items.forEach((it, i) => {
    const b = document.createElement("button");
    const in_ = spel.gekozen.has(i);
    let cls = "item" + (in_ ? " in" : "");
    if (spel.gecheckt) cls += in_ === it.goed ? " juist" : " onjuist";
    b.className = cls;
    b.innerHTML = `<span class="item-emoji">${it.e}</span><span>${esc(it.naam)}</span>${in_ ? '<i class="vink">🎒</i>' : ""}`;
    b.disabled = spel.gecheckt;
    b.onclick = () => { in_ ? spel.gekozen.delete(i) : spel.gekozen.add(i); ruiterTeken(); };
    bord.append(b);
  });
  $("#ruiterTas").textContent = spel.gekozen.size;
}

function ruiterCheck() {
  spel.gecheckt = true;
  let juist = 0;
  spel.items.forEach((it, i) => { if (spel.gekozen.has(i) === it.goed) juist++; });
  spel.punten += juist * 5;
  $("#ruiterPunten").textContent = spel.punten;
  ruiterTeken();
  const goedGedaan = juist === spel.items.length;
  if (goedGedaan) confetti(40);
  $("#ruiterUitleg").innerHTML = `<p class="oordeel ${goedGedaan ? "goed" : juist >= 4 ? "goed" : "fout"}">${goedGedaan ? "Perfect! Klaar om te rijden! 🏇" : `${juist} van de ${spel.items.length} goed gekozen`}</p>` +
    spel.items.map((it) => `<div class="uitleg-regel ${it.goed ? "ja" : "nee"}"><b>${it.e} ${esc(it.naam)}: ${it.goed ? "✅ wel doen" : "❌ niet doen"}</b><br>${esc(it.uitleg)}</div>`).join("") +
    `<p class="bron">Bron: manegehooidonk.nl – Wat heb ik nodig bij paardrijden?</p>`;
  $("#ruiterCheck").hidden = true;
  $("#ruiterVolgende").hidden = false;
  $("#ruiterVolgende").textContent = spel.nr + 1 < RUITER_RONDES ? "Volgende ronde ▶" : "Uitslag 🏁";
  setTimeout(() => $("#ruiterUitleg").scrollIntoView({ behavior: "smooth", block: "start" }), 200);
}

function ruiterVolgende() {
  spel.nr++;
  if (spel.nr < RUITER_RONDES) { ruiterRonde(); window.scrollTo({ top: 0, behavior: "smooth" }); return; }
  const max = RUITER_RONDES * 30;
  spel.uitslag = {
    score: spel.punten,
    sterren: spel.punten >= max * .9 ? 3 : spel.punten >= max * .7 ? 2 : spel.punten >= max * .45 ? 1 : 0,
    tekst: `Je scoorde ${spel.punten} van de ${max} punten. Zo weet je precies wat je aantrekt om te gaan rijden!`,
  };
  einde();
}

// 🧩 Pony-puzzel
function puzzel() {
  const p = kies(PONYS);
  const foto = kies(p.fotos);
  let stukken;
  do { stukken = schud([...Array(9).keys()]); } while (stukken.every((s, i) => s === i));
  spel = { modus: "puzzel", p, foto, stukken, gekozen: null, zetten: 0, nieuw: [], klaar: false };
  $("#puzzelZetten").textContent = 0;
  $("#puzzelVraag").hidden = true;
  $("#puzzelUitleg").hidden = true;
  $("#puzzelBord").classList.remove("af");
  toon("puzzel");
  puzzelTeken();
}

function puzzelTeken() {
  const bord = $("#puzzelBord");
  bord.innerHTML = "";
  spel.stukken.forEach((s, plek) => {
    const b = document.createElement("button");
    b.className = "stuk" + (spel.gekozen === plek ? " gekozen" : "") + (s === plek ? " op-plek" : "");
    b.innerHTML = `<img src="${spel.foto}" alt="" style="left:${-(s % 3) * 100}%;top:${-Math.floor(s / 3) * 100}%">`;
    b.disabled = spel.klaar;
    b.onclick = () => puzzelTik(plek);
    bord.append(b);
  });
}

function puzzelTik(plek) {
  if (spel.gekozen === null) { spel.gekozen = plek; return puzzelTeken(); }
  if (spel.gekozen !== plek) {
    const st = spel.stukken;
    [st[spel.gekozen], st[plek]] = [st[plek], st[spel.gekozen]];
    spel.zetten++;
    $("#puzzelZetten").textContent = spel.zetten;
  }
  spel.gekozen = null;
  if (spel.stukken.every((s, i) => s === i)) { spel.klaar = true; $("#puzzelBord").classList.add("af"); }
  puzzelTeken();
  if (spel.klaar) setTimeout(puzzelVraag, 700);
}

function puzzelVraag() {
  const p = spel.p;
  const opties = schud([p, ...andere(p, 2)]);
  const k = $("#puzzelKeuzes");
  k.innerHTML = "";
  opties.forEach((o) => {
    const b = document.createElement("button");
    b.className = "keuze";
    b.textContent = o.naam;
    b.dataset.key = o.naam;
    b.onclick = () => {
      const goed = o === p;
      k.querySelectorAll(".keuze").forEach((x) => { x.disabled = true; if (x.dataset.key === p.naam) x.classList.add("goed"); });
      if (!goed) b.classList.add("fout");
      else verzamel(p);
      spel.naamGoed = goed;
      $("#puzzelOordeel").textContent = goed ? "Goed geraden! 🎉" : `Oeps! Dit is ${p.naam}`;
      $("#puzzelOordeel").className = `oordeel ${goed ? "goed" : "fout"}`;
      $("#puzzelTekst").textContent = p.tekst;
      $("#puzzelUitleg").hidden = false;
      setTimeout(() => $("#puzzelUitleg").scrollIntoView({ behavior: "smooth", block: "start" }), 150);
    };
    k.append(b);
  });
  $("#puzzelVraag").hidden = false;
  $("#puzzelVraag").scrollIntoView({ behavior: "smooth", block: "start" });
}

function puzzelKlaar() {
  let sterren = spel.zetten <= 10 ? 3 : spel.zetten <= 16 ? 2 : 1;
  if (!spel.naamGoed) sterren = Math.max(0, sterren - 1);
  spel.uitslag = {
    score: spel.zetten, sterren,
    tekst: `Je legde de puzzel van ${spel.p.naam} in ${spel.zetten} zetten${spel.naamGoed ? " en raadde de naam goed!" : "."}`,
  };
  einde();
}

// ---------- stal ----------
function stal() {
  const lijst = $("#stalLijst");
  lijst.innerHTML = "";
  PONYS.forEach((p) => {
    const b = document.createElement("button");
    const heb = staat.heb[p.naam];
    b.className = `stalkaart${heb ? " heb" : ""}`;
    b.innerHTML = `<img loading="lazy" src="${p.fotos[0]}" alt=""><b>${esc(p.naam)}</b>${heb ? '<span class="medaille">🏅</span>' : ""}`;
    b.onclick = () => kaart(p);
    lijst.append(b);
  });
  toon("stal");
}

function kaart(p) {
  $("#kaartFotos").innerHTML = p.fotos.map((f) => `<img src="${f}" alt="${esc(p.naam)}">`).join("");
  $("#kaartNaam").textContent = (staat.heb[p.naam] ? "🏅 " : "") + p.naam;
  $("#kaartTekst").textContent = p.tekst;
  $("#kaart").hidden = false;
}

function confetti(n) {
  const c = $("#confetti");
  const kleuren = ["#a3123f", "#ffd166", "#2e9e5b", "#4dabf7", "#ff8fab", "#ffa94d"];
  for (let i = 0; i < n; i++) {
    const s = document.createElement("i");
    s.style.left = Math.random() * 100 + "vw";
    s.style.background = kies(kleuren);
    s.style.animationDelay = Math.random() * .6 + "s";
    s.style.animationDuration = 1.8 + Math.random() * 1.4 + "s";
    c.append(s);
    setTimeout(() => s.remove(), 4000);
  }
}

const naarHome = () => { clearInterval(klok); tikStop(); telling(); toon("home"); };
document.querySelectorAll(".modus").forEach((b) => (b.onclick = () => (b.dataset.modus === "stal" ? stal() : start(b.dataset.modus))));
$("#volgende").onclick = volgende;
$("#husselHint").onclick = husselHint;
$("#husselOpgeven").onclick = () => husselKlaar(false, true);
$("#husselVolgende").onclick = husselVolgende;
$("#ruiterCheck").onclick = ruiterCheck;
$("#ruiterVolgende").onclick = ruiterVolgende;
$("#puzzelVolgende").onclick = puzzelKlaar;
$("#opnieuw").onclick = () => start(spel.modus);
$("#eindHome").onclick = naarHome;
$("#naarHome").onclick = naarHome;
$("#kaartSluit").onclick = () => ($("#kaart").hidden = true);
$("#kaart").onclick = (e) => { if (e.target.id === "kaart") $("#kaart").hidden = true; };
document.addEventListener("keydown", (e) => { if (e.key === "Escape") $("#kaart").hidden = true; });
telling();
