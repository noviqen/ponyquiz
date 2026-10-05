"use strict";
const $ = (s) => document.querySelector(s);
const RONDES = 10;
const OPSLAG = "ponyquiz-v1";

const staat = JSON.parse(localStorage.getItem(OPSLAG) || "{}");
staat.heb = staat.heb || {};      // naam -> true als ooit goed geraden
staat.record = staat.record || 0;
const bewaar = () => localStorage.setItem(OPSLAG, JSON.stringify(staat));

let spel = null;

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
  $("#record").textContent = staat.record ? `🏆 Jouw record: ${staat.record} punten` : "";
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

function start(modus) {
  spel = { modus, rij: schud(PONYS).slice(0, RONDES), nr: 0, punten: 0, reeks: 0, goed: 0, nieuw: [] };
  $("#reeks").hidden = true;
  toon("quiz");
  vraag();
}

function vraag() {
  const p = spel.rij[spel.nr];
  spel.foto = kies(p.fotos);
  const anderen = schud(PONYS.filter((x) => x !== p)).slice(0, 3);
  const opties = schud([p, ...anderen]);

  $("#vraagNr").textContent = `${spel.nr + 1}/${RONDES}`;
  $("#balk").style.width = `${(spel.nr / RONDES) * 100}%`;
  $("#punten").textContent = spel.punten;
  $("#uitleg").hidden = true;

  const keuzes = $("#keuzes");
  keuzes.innerHTML = "";
  if (spel.modus === "foto") {
    $("#vraag").textContent = "📸 Wie is dit?";
    $("#vraagFoto").hidden = false;
    $("#vraagTekst").hidden = true;
    $("#vraagFoto img").src = spel.foto;
    keuzes.className = "keuzes";
    opties.forEach((o) => keuzes.append(knop(o, esc(o.naam), p)));
  } else {
    $("#vraag").textContent = "🔎 Wie ben ik?";
    $("#vraagFoto").hidden = true;
    $("#vraagTekst").hidden = false;
    $("#vraagTekst").innerHTML = verstop(p);
    keuzes.className = "keuzes fotos";
    opties.forEach((o) => keuzes.append(knop(o, `<img src="${kies(o.fotos)}" alt="${esc(o.naam)}"><span hidden>${esc(o.naam)}</span>`, p)));
  }
  // volgende foto alvast laden
  const volgende = spel.rij[spel.nr + 1];
  if (volgende) volgende.fotos.forEach((f) => { new Image().src = f; });
}

function knop(optie, html, juist) {
  const b = document.createElement("button");
  b.className = "keuze";
  b.innerHTML = html;
  b.onclick = () => antwoord(optie, juist, b);
  b.dataset.naam = optie.naam;
  return b;
}

function antwoord(optie, p, gekozen) {
  const goed = optie === p;
  document.querySelectorAll(".keuze").forEach((b) => {
    b.disabled = true;
    if (b.dataset.naam === p.naam) b.classList.add("goed");
    const naam = b.querySelector("span");
    if (naam) naam.hidden = false;
  });
  if (!goed) gekozen.classList.add("fout");

  if (goed) {
    spel.reeks++;
    spel.goed++;
    spel.punten += 10 + Math.min(spel.reeks - 1, 5) * 2;
    if (!staat.heb[p.naam]) { staat.heb[p.naam] = true; spel.nieuw.push(p); bewaar(); telling(); }
    if (spel.reeks >= 3) confetti(25);
  } else spel.reeks = 0;
  $("#punten").textContent = spel.punten;
  const r = $("#reeks");
  r.hidden = spel.reeks < 2;
  r.querySelector("b").textContent = spel.reeks;

  const oordeel = $("#uitlegOordeel");
  oordeel.textContent = goed ? kies(["Goed zo! 🎉", "Helemaal goed! ⭐", "Jij kent ze! 🐴", "Top! 🏆"]) : "Oeps, bijna! 🙈";
  oordeel.className = `oordeel ${goed ? "goed" : "fout"}`;
  $("#uitlegNaam").textContent = p.naam === "Shetlanders" ? "Dit zijn de shetlanders" : `Dit is ${p.naam}`;
  $("#uitlegFoto").src = spel.foto;
  $("#uitlegTekst").textContent = p.tekst;
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
  const { goed, punten, nieuw } = spel;
  const sterren = goed >= 9 ? 3 : goed >= 6 ? 2 : goed >= 3 ? 1 : 0;
  $("#sterren").innerHTML = [0, 1, 2].map((i) => `<span style="animation-delay:${i * .25}s">${i < sterren ? "⭐" : "☆"}</span>`).join("");
  $("#eindTitel").textContent = ["Goed geprobeerd!", "Lekker bezig!", "Super gedaan!", "Pony-kampioen!"][sterren];
  let tekst = `Je had er ${goed} van de ${RONDES} goed en scoorde ${punten} punten.`;
  if (punten > staat.record) {
    if (staat.record) tekst += " 🏆 Nieuw record!";
    staat.record = punten; bewaar(); telling();
  }
  $("#eindTekst").textContent = tekst;
  $("#nieuw").innerHTML = nieuw.length
    ? `<p style="width:100%;margin:0;font-weight:800">Nieuw in je stal:</p>` + nieuw.map((p) => `<figure><img src="${p.fotos[0]}" alt=""><figcaption>${esc(p.naam)}</figcaption></figure>`).join("")
    : "";
  toon("einde");
  if (sterren >= 2) confetti(90);
}

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

document.querySelectorAll(".modus").forEach((b) => (b.onclick = () => (b.dataset.modus === "stal" ? stal() : start(b.dataset.modus))));
$("#volgende").onclick = volgende;
$("#opnieuw").onclick = () => start(spel.modus);
$("#eindHome").onclick = () => { telling(); toon("home"); };
$("#naarHome").onclick = () => { telling(); toon("home"); };
$("#kaartSluit").onclick = () => ($("#kaart").hidden = true);
$("#kaart").onclick = (e) => { if (e.target.id === "kaart") $("#kaart").hidden = true; };
document.addEventListener("keydown", (e) => { if (e.key === "Escape") $("#kaart").hidden = true; });
telling();
