"use strict";
// 🏇 Vies land & Lekker land – het tikspel uit de manegebak.
// Boven is Lekker land, onder is Vies land, in het midden rijdt de tikker (een meisje op een pony).
// Wie getikt wordt, gaat naar het midden en tikt mee.

// s: wat de meeste kinderen ervan vinden (alleen gebruikt voor de computer-pony's)
const ETEN = [
  // lekker
  { e: "🍕", n: "Pizza", s: 1 }, { e: "🍦", n: "IJsjes", s: 1 }, { e: "🍟", n: "Patat", s: 1 }, { e: "🥞", n: "Pannenkoeken", s: 1 },
  { e: "🍫", n: "Chocolade", s: 1 }, { e: "🍓", n: "Aardbeien", s: 1 }, { e: "🍬", n: "Snoepjes", s: 1 }, { e: "🍿", n: "Popcorn", s: 1 },
  { e: "🍩", n: "Donuts", s: 1 }, { e: "🎂", n: "Verjaardagstaart", s: 1 }, { e: "🍉", n: "Watermeloen", s: 1 }, { e: "🍌", n: "Bananen", s: 1 },
  { e: "🍎", n: "Appels", s: 1 }, { e: "🍔", n: "Hamburgers", s: 1 }, { e: "🍝", n: "Spaghetti", s: 1 }, { e: "🧇", n: "Wafels", s: 1 },
  { e: "🥐", n: "Croissants", s: 1 }, { e: "🧁", n: "Cupcakes", s: 1 }, { e: "🍭", n: "Lolly's", s: 1 }, { e: "🍪", n: "Koekjes", s: 1 },
  { e: "🍒", n: "Kersen", s: 1 }, { e: "🍇", n: "Druiven", s: 1 }, { e: "🥭", n: "Mango", s: 1 }, { e: "🍍", n: "Ananas", s: 1 },
  { e: "🌭", n: "Hotdogs", s: 1 }, { e: "🍣", n: "Sushi", s: 1 }, { e: "🌮", n: "Taco's", s: 1 }, { e: "🍰", n: "Slagroomtaart", s: 1 },
  { e: "🍮", n: "Pudding", s: 1 }, { e: "🥤", n: "Limonade", s: 1 }, { e: "🍯", n: "Honing", s: 1 }, { e: "🍞", n: "Brood met hagelslag", s: 1 },
  { e: "🥪", n: "Tosti's", s: 1 }, { e: "🍗", n: "Kippenpootjes", s: 1 }, { e: "🥕", n: "Worteltjes", s: 1 }, { e: "🍐", n: "Peren", s: 1 },
  { e: "🍑", n: "Perziken", s: 1 }, { e: "🥝", n: "Kiwi's", s: 1 }, { e: "🥨", n: "Pretzels", s: 1 }, { e: "🍨", n: "Softijs", s: 1 },
  { e: "🧃", n: "Pakjes appelsap", s: 1 }, { e: "🥟", n: "Loempia's", s: 1 }, { e: "🍳", n: "Gebakken eieren", s: 1 }, { e: "🍊", n: "Mandarijnen", s: 1 },
  // vies
  { e: "🥬", n: "Spruitjes", s: 0 }, { e: "🥦", n: "Broccoli", s: 0 }, { e: "🍄", n: "Champignons", s: 0 }, { e: "🫒", n: "Olijven", s: 0 },
  { e: "🧅", n: "Rauwe uien", s: 0 }, { e: "🧄", n: "Knoflook", s: 0 }, { e: "🥒", n: "Augurken", s: 0 }, { e: "🐟", n: "Zure haring", s: 0 },
  { e: "🦪", n: "Oesters", s: 0 }, { e: "🦑", n: "Inktvis", s: 0 }, { e: "🐌", n: "Slakken", s: 0 }, { e: "🪱", n: "Wormen", s: 0 },
  { e: "🧀", n: "Stinkkaas", s: 0 }, { e: "☕", n: "Zwarte koffie", s: 0 }, { e: "🍋", n: "Zure citroenen", s: 0 }, { e: "🌶️", n: "Hete pepers", s: 0 },
  { e: "🥚", n: "Rotte eieren", s: 0 }, { e: "🧦", n: "Zweetsokken", s: 0 }, { e: "🌾", n: "Hooi", s: 0 }, { e: "🐛", n: "Rupsen", s: 0 },
  { e: "🦗", n: "Sprinkhanen", s: 0 }, { e: "🕷️", n: "Spinnen", s: 0 }, { e: "🪰", n: "Vliegen", s: 0 }, { e: "💩", n: "Paardenpoep", s: 0 },
  { e: "🟤", n: "Modderpap", s: 0 }, { e: "🥛", n: "Zure melk", s: 0 }, { e: "🐸", n: "Kikkerbilletjes", s: 0 }, { e: "🦐", n: "Garnalen", s: 0 },
  { e: "🐙", n: "Octopus", s: 0 }, { e: "🧼", n: "Zeep", s: 0 }, { e: "🍆", n: "Aubergine", s: 0 }, { e: "🥗", n: "Andijviestamppot", s: 0 },
  { e: "🫑", n: "Paprika", s: 0 }, { e: "🧂", n: "Een hap zout", s: 0 }, { e: "🥫", n: "Koude soep", s: 0 }, { e: "🦴", n: "Kluiven", s: 0 },
  { e: "🪳", n: "Kakkerlakken", s: 0 }, { e: "🐜", n: "Mieren", s: 0 }, { e: "🍵", n: "Bittere thee", s: 0 }, { e: "🥩", n: "Rauwe lever", s: 0 },
  { e: "🫘", n: "Bruine bonen", s: 0 }, { e: "🪨", n: "Kiezelsteentjes", s: 0 },
];

const TK = { H: 1.35, L: 0.22, R: 0.052, RENNERS: 7, MAX_RONDES: 15 };
let tikSpel = null;

const tikAfstand = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
const inMidden = (e) => e.y > TK.L && e.y < TK.H - TK.L;
const landY = (land) => (land === "lekker" ? TK.L / 2 : TK.H - TK.L / 2);
const renners = () => tikSpel.ents.filter((e) => e.rol === "ruiter");
const tikkers = () => tikSpel.ents.filter((e) => e.rol === "tikker");
const ik = () => tikSpel.ents.find((e) => e.speler);

function ponyFoto(p) {
  const img = new Image();
  img.src = p.fotos[0];
  return img;
}

// ---------- start: kies je rol en je pony ----------
function tikspelStart() {
  tikStop();
  spel = { modus: "tikspel", nieuw: [] };
  $("#tikGetikt").hidden = true;
  $("#tikStart").hidden = false;
  $("#tikPonyKeuze").hidden = true;
  $("#tikSpeelveld").hidden = true;
  toon("tikspel");
}

function tikKiesPony() {
  $("#tikStart").hidden = true;
  $("#tikPonyKeuze").hidden = false;
  const lijst = $("#tikPonyLijst");
  lijst.innerHTML = "";
  PONYS.filter((p) => p.naam !== "Shetlanders").forEach((p) => {
    const b = document.createElement("button");
    b.className = "stalkaart heb";
    b.innerHTML = `<img loading="lazy" src="${p.fotos[0]}" alt=""><b>${esc(p.naam)}</b>`;
    b.onclick = () => tikNieuw("ruiter", p);
    lijst.append(b);
  });
}

function tikNieuw(mode, eigen) {
  const pool = schud(PONYS.filter((p) => p.naam !== "Shetlanders" && p !== eigen));
  const meisjePony = pool.pop();
  const ponys = mode === "ruiter" ? [eigen, ...pool.slice(0, TK.RENNERS - 1)] : pool.slice(0, TK.RENNERS + 1);
  tikSpel = {
    mode, ronde: 0, punten: 0, reeks: 0, tikken: 0, gebruikt: new Set(), fase: "roep", roep: null,
    vinger: null, berichten: [], laatst: performance.now(), raf: 0,
    ents: [
      ...ponys.map((p, i) => ({
        p, img: ponyFoto(p), rol: "ruiter", speler: mode === "ruiter" && i === 0, land: "lekker", doel: null, bleef: 0,
        x: (i + 0.5) / ponys.length, y: landY("lekker"), wacht: 0, zwiep: Math.random() * 6,
      })),
      { p: meisjePony, img: ponyFoto(meisjePony), rol: "tikker", meisje: true, speler: mode === "tikker", x: 0.5, y: TK.H / 2, wacht: 0 },
    ],
  };
  $("#tikPonyKeuze").hidden = true;
  $("#tikStart").hidden = true;
  $("#tikSpeelveld").hidden = false;
  toon("tikspel");
  tikMaat();
  tikSpel.raf = requestAnimationFrame(tikLus);
  setTimeout(tikRonde, 500);
}

// ---------- rondes ----------
function tikRonde() {
  if (!tikSpel) return;
  tikSpel.ronde++;
  tikSpel.fase = "roep";
  tikSpel.roep = null;
  tikBalk();
  $("#tikRoep").innerHTML = "";
  const paneel = $("#tikKnoppen");
  paneel.innerHTML = "";
  if (tikSpel.mode === "ruiter") {
    const item = tikKiesEten();
    tikRoepUit(item);
    const mij = ik();
    const moet = mij.bleef >= 2;
    $("#tikHint").textContent = moet ? "⚠️ Je bent al 2 keer blijven staan: nu móét je oversteken!" : `Je staat in ${mij.land === "lekker" ? "😋 Lekker land" : "🤢 Vies land"}. Wat vind jij ervan?`;
    [["lekker", "😋 Lekker!"], ["vies", "🤢 Vies!"]].forEach(([land, label]) => {
      const b = document.createElement("button");
      b.className = `knop tikkeuze ${land}`;
      b.textContent = label;
      b.disabled = moet && land === mij.land;
      b.onclick = () => { mij.keuze = land; tikBeslis(); };
      paneel.append(b);
    });
  } else {
    $("#tikHint").textContent = "👧 Jij bent de tikker! Wat roep je?";
    const lekker = schud(ETEN.filter((x) => x.s && !tikSpel.gebruikt.has(x))).slice(0, 3);
    const vies = schud(ETEN.filter((x) => !x.s && !tikSpel.gebruikt.has(x))).slice(0, 3);
    schud([...lekker, ...vies]).forEach((item) => {
      const b = document.createElement("button");
      b.className = "etenknop";
      b.innerHTML = `<span>${item.e}</span>${esc(item.n)}`;
      b.onclick = () => { tikRoepUit(item); tikBeslis(); };
      paneel.append(b);
    });
  }
  tikToonKeuze();
}

function tikToonKeuze() {
  // zorg dat de bak én de knoppen in beeld zijn
  setTimeout(() => $("#tikKnoppen").scrollIntoView({ behavior: "smooth", block: "end" }), 50);
}

function tikKiesEten() {
  // de tikker roept liever iets waardoor veel pony's moeten oversteken
  const vrij = ETEN.filter((x) => !tikSpel.gebruikt.has(x));
  const lijst = vrij.length ? vrij : ETEN;
  const inLekker = renners().filter((e) => e.land === "lekker").length;
  const wilVies = inLekker >= renners().length / 2;
  const slim = lijst.filter((x) => (wilVies ? !x.s : x.s));
  return kies(Math.random() < 0.7 && slim.length ? slim : lijst);
}

function tikRoepUit(item) {
  tikSpel.roep = item;
  tikSpel.gebruikt.add(item);
  $("#tikRoep").innerHTML = `<span class="roep-emoji">${item.e}</span><span>👧 "${esc(item.n)}!"</span>`;
}

function tikBeslis() {
  const item = tikSpel.roep;
  let lopers = 0;
  renners().forEach((e) => {
    let kies_;
    if (e.speler) kies_ = e.keuze;
    else {
      kies_ = Math.random() < (item.s ? 0.8 : 0.2) ? "lekker" : "vies";
      if (e.bleef >= 2) kies_ = e.land === "lekker" ? "vies" : "lekker";
    }
    if (kies_ === e.land) { e.bleef++; e.doel = null; }
    else { e.bleef = 0; e.doel = kies_; e.wacht = e.speler ? 0 : Math.random() * 1.6; e.startY = e.y; e.vx = e.vy = 0; lopers++; }
  });
  $("#tikKnoppen").innerHTML = "";
  if (!lopers) {
    tikBericht("Niemand rent! 😴", 0.5, TK.H / 2);
    tikSpel.fase = "tussen";
    setTimeout(tikRondeKlaar, 1300);
    return;
  }
  const mij = ik();
  $("#tikHint").textContent = tikSpel.mode === "tikker" ? "👆 Sleep met je vinger: jouw tikker volgt je (rustig aan)!" :
    mij.doel ? "🏃 Rennen! Sleep je pony om de tikker te ontwijken. Loslaten = rustig doorrijden." : "😌 Jij blijft staan. Kijk maar wie er getikt wordt!";
  tikSpel.vinger = null;
  tikSpel.fase = "ren";
  $("#tikVeld").scrollIntoView({ behavior: "smooth", block: "center" });
}

function tikRondeKlaar() {
  if (!tikSpel) return;
  const over = renners();
  if (tikSpel.mode === "ruiter") {
    if (over.length === 1 && over[0].speler) return tikEinde(true);
  } else if (!over.length || tikSpel.ronde >= TK.MAX_RONDES) return tikEinde(!over.length);
  tikRonde();
}

// ---------- tempo (schuif) ----------
const TEMPI = [
  { n: "🐢 Stap", f: 0.35 }, { n: "🐴 Rustige draf", f: 0.5 }, { n: "🏇 Draf", f: 0.65 },
  { n: "💨 Galop", f: 0.8 }, { n: "🐇 Volle galop", f: 1 },
];
let tikTempo = Math.min(TEMPI.length - 1, Math.max(0, +(localStorage.getItem("ponyquiz-tempo") ?? 0)));
function tikZetTempo(i) {
  tikTempo = i;
  localStorage.setItem("ponyquiz-tempo", i);
  $("#tikTempo").value = i;
  $("#tikTempoNaam").textContent = TEMPI[i].n;
}

// ---------- beweging ----------
const SPELER_V = { ruiter: 0.34, tikker: 0.4, vanzelf: 0.26, soepel: 3.2 }; // max. snelheid en "vertraging" bij slepen

// Laat de eigen pony soepel (met vertraging) naar een doelsnelheid bewegen
function tikStuur(e, wx, wy, dt) {
  const k = Math.min(1, dt * SPELER_V.soepel);
  e.vx = (e.vx || 0) + (wx - (e.vx || 0)) * k;
  e.vy = (e.vy || 0) + (wy - (e.vy || 0)) * k;
  e.x += e.vx * dt;
  e.y += e.vy * dt;
}
function naarVinger(e, max) {
  const v = tikSpel.vinger;
  if (!v) return null;
  const dx = v.x - e.x, dy = v.y - e.y, d = Math.hypot(dx, dy);
  if (d < 0.01) return [0, 0];
  const snel = Math.min(max, d * 3); // dichtbij je vinger rustig afremmen
  return [(dx / d) * snel, (dy / d) * snel];
}
function tikLus(nu) {
  if (!tikSpel) return;
  const dt = Math.min(0.05, (nu - tikSpel.laatst) / 1000) * TEMPI[tikTempo].f; // alles gaat even snel mee met de schuif
  tikSpel.laatst = nu;
  if (tikSpel.fase === "ren") tikBeweeg(dt);
  tikTikkersBeweeg(dt);
  tikTeken();
  tikSpel.raf = requestAnimationFrame(tikLus);
}

function tikBeweeg(dt) {
  const vY = 0.34;
  const ts = tikkers();
  renners().forEach((e) => {
    if (!e.doel) return;
    if (e.wacht > 0) { e.wacht -= dt; return; }
    const doelY = landY(e.doel);
    const richting = Math.sign(doelY - e.y);
    if (e.speler) {
      // slepen met je vinger; laat je los, dan rijdt je pony rustig vanzelf door
      const w = naarVinger(e, SPELER_V.ruiter) || [0, richting * SPELER_V.vanzelf];
      tikStuur(e, w[0], w[1], dt);
      // terug naar je eigen land kan niet
      e.y = richting > 0 ? Math.max(e.y, e.startY) : Math.min(e.y, e.startY);
    } else e.y += richting * vY * dt;
    // zijwaarts sturen
    let doelX = e.x;
    if (!e.speler) {
      // zoek de plek in de breedte die het verst van de tikkers vóór je ligt
      const gevaar = ts.filter((t) => t.wacht <= 0 && (t.y - e.y) * richting > -0.08 && Math.abs(t.y - e.y) < 0.5);
      e.zwiep += dt * 3;
      if (gevaar.length) {
        let beste = e.x, score = -1e9;
        for (let x = 0.08; x <= 0.92; x += 0.04) {
          const vrij = Math.min(...gevaar.map((t) => Math.abs(x - t.x) + Math.abs(t.y - e.y) * 0.6));
          const s = vrij - Math.abs(x - e.x) * 0.35;
          if (s > score) { score = s; beste = x; }
        }
        doelX = beste;
      } else doelX = e.x + Math.sin(e.zwiep) * 0.1;
    }
    if (!e.speler) e.x += Math.max(-0.6 * dt, Math.min(0.6 * dt, doelX - e.x));
    e.x = Math.max(TK.R, Math.min(1 - TK.R, e.x));
    const binnen = e.speler
      ? (e.doel === "vies" ? e.y >= TK.H - TK.L + TK.R * 0.5 : e.y <= TK.L - TK.R * 0.5) // jij: zodra je in het land bent
      : (richting > 0 && e.y >= doelY) || (richting < 0 && e.y <= doelY);
    if (binnen) {
      if (!e.speler) e.y = doelY;
      e.land = e.doel; e.doel = null; e.vx = e.vy = 0;
      if (e.speler) {
        tikSpel.reeks++;
        const erbij = 10 + Math.min(tikSpel.reeks - 1, 5) * 2;
        tikSpel.punten += erbij;
        tikBericht(`Veilig! +${erbij}`, e.x, e.y + (e.land === "lekker" ? 0.1 : -0.1), "#2e9e5b");
        tikBalk();
      }
    }
    // getikt?
    if (inMidden(e)) {
      const tikker = ts.find((t) => t.wacht <= 0 && tikAfstand(t, e) < TK.R * 1.55);
      if (tikker) tikGetikt(e, tikker);
    }
  });
  if (tikSpel.fase === "ren" && !renners().some((e) => e.doel)) {
    tikSpel.fase = "tussen";
    setTimeout(tikRondeKlaar, 900);
  }
}

function tikTikkersBeweeg(dt) {
  const ts = tikkers();
  const lopers = renners().filter((e) => e.doel && e.wacht <= 0.3);
  ts.forEach((t, i) => {
    if (t.wacht > 0) t.wacht -= dt;
    let doel;
    if (t.speler && tikSpel.fase === "ren" && !(t.wacht > 0)) {
      // eigen tikker: slepen met vertraging; loslaten = afremmen
      const w = naarVinger(t, SPELER_V.tikker) || [0, 0];
      tikStuur(t, w[0], w[1], dt);
      t.x = Math.max(TK.R, Math.min(1 - TK.R, t.x));
      t.y = Math.max(TK.L + TK.R * 0.5, Math.min(TK.H - TK.L - TK.R * 0.5, t.y));
      return;
    }
    if (t.wacht > 0) doel = { x: t.x, y: TK.H / 2 };
    else if (tikSpel.fase === "ren" && lopers.length) {
      // elke tikker kiest de dichtstbijzijnde loper (een beetje vooruit gemikt)
      const prooi = lopers.slice().sort((a, b) => tikAfstand(a, t) - tikAfstand(b, t))[i % Math.min(lopers.length, 2)];
      const r = Math.sign(landY(prooi.doel) - prooi.y);
      doel = { x: prooi.x, y: prooi.y + r * 0.12 };
    } else doel = { x: (i + 1) / (ts.length + 1), y: TK.H / 2 };
    const basis = Math.min(0.22 + tikSpel.ronde * 0.015, 0.36);
    const v = t.wacht > 0 ? 0.3 : basis * (t.meisje ? 1 : 0.85) * (tikSpel.mode === "tikker" ? 0.75 : 1);
    const dx = doel.x - t.x, dy = doel.y - t.y, d = Math.hypot(dx, dy);
    if (d > 0.005) { const s = Math.min(d, v * dt); t.x += (dx / d) * s; t.y += (dy / d) * s; }
    t.x = Math.max(TK.R, Math.min(1 - TK.R, t.x));
    t.y = Math.max(TK.L + TK.R * 0.5, Math.min(TK.H - TK.L - TK.R * 0.5, t.y));
  });
}

function tikGetikt(e, tikker) {
  e.rol = "tikker";
  e.doel = null;
  e.wacht = 1.5; // eerst naar het midden, dan pas meetikken
  tikBericht(`${e.speler ? "Jij" : e.p.naam} getikt! 😱`, e.x, e.y - 0.08, "#d9433b");
  if (tikSpel.mode === "tikker") {
    const erbij = tikker.speler ? 10 : 5;
    tikSpel.punten += erbij;
    tikSpel.tikken++;
    if (tikker.speler) confetti(15);
  }
  tikBalk();
  if (e.speler && tikSpel.mode === "ruiter") {
    tikSpel.fase = "pauze";
    $("#tikGetiktTekst").textContent = `${tikker.meisje ? "Het meisje" : tikker.p.naam} heeft je getikt in ronde ${tikSpel.ronde}. Je had ${tikSpel.punten} punten.`;
    $("#tikGetikt").hidden = false;
  }
}

function tikVerderAlsTikker() {
  $("#tikGetikt").hidden = true;
  tikSpel.mode = "tikker";
  tikSpel.fase = "ren";
  tikSpel.vinger = null;
  $("#tikHint").textContent = "👧 Nu ben jij een tikker! Sleep met je vinger om te tikken.";
  tikBalk();
}

function tikEinde(gewonnen) {
  if (tikSpel.mode === "ruiter" && gewonnen) tikSpel.punten += 50;
  const { mode, punten, ronde } = tikSpel;
  tikStop();
  $("#tikGetikt").hidden = true;
  let sterren, tekst;
  if (mode === "ruiter") {
    sterren = gewonnen ? 3 : punten >= 60 ? 2 : punten >= 25 ? 1 : 0;
    tekst = gewonnen ? `🏆 Jij bent als laatste over! Gewonnen met ${punten} punten (inclusief 50 bonuspunten).` : `Je hield het ${ronde} rondes vol en scoorde ${punten} punten.`;
  } else {
    sterren = gewonnen ? (ronde <= 5 ? 3 : ronde <= 9 ? 2 : 1) : 0;
    tekst = gewonnen ? `Iedereen is getikt in ${ronde} rondes! Je scoorde ${punten} punten.` : `Na ${ronde} rondes waren nog niet alle pony's getikt. Je scoorde ${punten} punten.`;
  }
  spel.uitslag = { score: punten, sterren, tekst };
  einde();
}

function tikStop() {
  if (tikSpel) cancelAnimationFrame(tikSpel.raf);
  tikSpel = null;
}

// ---------- tekenen ----------
function tikMaat() {
  const c = $("#tikVeld");
  const w = c.parentElement.clientWidth;
  const dpr = window.devicePixelRatio || 1;
  c.style.width = w + "px";
  c.style.height = w * TK.H + "px";
  c.width = Math.round(w * dpr);
  c.height = Math.round(w * TK.H * dpr);
}

function tikBericht(tekst, x, y, kleur = "#2b1d14") {
  tikSpel.berichten.push({ tekst, x, y, kleur, t: 1.4 });
}

function tikBalk() {
  $("#tikRonde").textContent = `Ronde ${tikSpel.ronde}`;
  $("#tikPunten").textContent = tikSpel.punten;
  $("#tikOver").textContent = renners().length;
}

function tikTeken() {
  const c = $("#tikVeld"), g = c.getContext("2d");
  const S = c.width; // 1 eenheid = canvasbreedte
  const P = (v) => v * S;
  g.clearRect(0, 0, c.width, c.height);
  // zand
  g.fillStyle = "#ead3a8";
  g.fillRect(0, 0, c.width, c.height);
  // landen
  g.fillStyle = "#bfe3a6";
  g.fillRect(0, 0, S, P(TK.L));
  g.fillStyle = "#c9b88a";
  g.fillRect(0, P(TK.H - TK.L), S, P(TK.L));
  g.font = `800 ${P(0.055)}px system-ui, sans-serif`;
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.globalAlpha = 0.45;
  g.fillStyle = "#1f6d3e";
  g.fillText("😋 LEKKER LAND", S / 2, P(TK.L / 2));
  g.fillStyle = "#5b4a1e";
  g.fillText("🤢 VIES LAND", S / 2, P(TK.H - TK.L / 2));
  g.globalAlpha = 1;
  // lijnen tussen landen en midden
  g.strokeStyle = "#fff";
  g.lineWidth = P(0.008);
  g.setLineDash([P(0.03), P(0.02)]);
  [TK.L, TK.H - TK.L].forEach((y) => { g.beginPath(); g.moveTo(0, P(y)); g.lineTo(S, P(y)); g.stroke(); });
  g.setLineDash([]);
  // hek
  g.strokeStyle = "#7a5230";
  g.lineWidth = P(0.02);
  g.strokeRect(P(0.01), P(0.01), S - P(0.02), P(TK.H) - P(0.02));
  // bakletters A K E H C M B F
  const letters = [["A", 0.5, TK.H], ["K", 0, TK.H * 0.78], ["E", 0, TK.H * 0.5], ["H", 0, TK.H * 0.22], ["C", 0.5, 0], ["M", 1, TK.H * 0.22], ["B", 1, TK.H * 0.5], ["F", 1, TK.H * 0.78]];
  g.font = `800 ${P(0.03)}px system-ui, sans-serif`;
  letters.forEach(([l, x, y]) => {
    const px = P(Math.min(Math.max(x, 0.03), 0.97)), py = P(Math.min(Math.max(y, 0.03), TK.H - 0.03));
    g.fillStyle = "#fff"; g.beginPath(); g.arc(px, py, P(0.028), 0, 7); g.fill();
    g.fillStyle = "#a3123f"; g.fillText(l, px, py + P(0.002));
  });
  // doelwijzer van de speler
  if (tikSpel.vinger && tikSpel.fase === "ren") {
    g.strokeStyle = "#ffd166cc"; g.lineWidth = P(0.008);
    g.setLineDash([P(0.015), P(0.012)]);
    const m = ik();
    if (m) { g.beginPath(); g.moveTo(P(m.x), P(m.y)); g.lineTo(P(tikSpel.vinger.x), P(tikSpel.vinger.y)); g.stroke(); }
    g.setLineDash([]);
    g.beginPath(); g.arc(P(tikSpel.vinger.x), P(tikSpel.vinger.y), P(0.025), 0, 7); g.stroke();
  }
  // pony's: eerst ruiters, dan tikkers erbovenop
  [...renners(), ...tikkers()].forEach((e) => tikPony(g, e, P));
  // zwevende berichten
  tikSpel.berichten = tikSpel.berichten.filter((b) => (b.t -= 1 / 60) > 0);
  g.font = `800 ${P(0.045)}px system-ui, sans-serif`;
  tikSpel.berichten.forEach((b) => {
    g.globalAlpha = Math.min(1, b.t);
    g.lineWidth = P(0.012); g.strokeStyle = "#fff";
    const y = P(b.y - (1.4 - b.t) * 0.06);
    g.strokeText(b.tekst, P(Math.min(Math.max(b.x, 0.25), 0.75)), y);
    g.fillStyle = b.kleur; g.fillText(b.tekst, P(Math.min(Math.max(b.x, 0.25), 0.75)), y);
  });
  g.globalAlpha = 1;
}

function tikPony(g, e, P) {
  const r = P(e.rol === "tikker" ? TK.R * 1.12 : TK.R);
  const x = P(e.x), y = P(e.y);
  g.save();
  g.beginPath(); g.arc(x, y, r, 0, 7); g.closePath();
  g.fillStyle = "#8b6a4e"; g.fill();
  g.clip();
  if (e.img.complete && e.img.naturalWidth) {
    const w = e.img.naturalWidth, h = e.img.naturalHeight, m = Math.min(w, h);
    g.drawImage(e.img, (w - m) / 2, (h - m) / 2, m, m, x - r, y - r, r * 2, r * 2);
  }
  g.restore();
  g.lineWidth = P(e.speler ? 0.012 : 0.007);
  g.strokeStyle = e.rol === "tikker" ? "#d9433b" : e.speler ? "#ffd166" : "#fff";
  g.beginPath(); g.arc(x, y, r, 0, 7); g.stroke();
  if (e.speler) { g.strokeStyle = "#ffd166"; g.lineWidth = P(0.006); g.beginPath(); g.arc(x, y, r + P(0.012), 0, 7); g.stroke(); }
  if (e.rol === "tikker") {
    g.font = `${P(0.045)}px system-ui, sans-serif`;
    g.fillText("👧", x + r * 0.75, y - r * 0.75);
  }
  g.font = `800 ${P(0.026)}px system-ui, sans-serif`;
  const label = e.speler ? "JIJ" : e.p.naam.length > 9 ? e.p.naam.slice(0, 8) + "…" : e.p.naam;
  g.lineWidth = P(0.008); g.strokeStyle = "#fff";
  g.strokeText(label, x, y + r + P(0.022));
  g.fillStyle = e.speler ? "#a3123f" : "#2b1d14";
  g.fillText(label, x, y + r + P(0.022));
}

// ---------- besturing ----------
function tikPointer(ev) {
  if (!tikSpel) return;
  const c = $("#tikVeld"), b = c.getBoundingClientRect();
  // bij aanraken mikt de pony net boven je vinger, zodat je hem blijft zien
  const omhoog = ev.pointerType === "touch" ? 0.07 : 0;
  tikSpel.vinger = { x: (ev.clientX - b.left) / b.width, y: ((ev.clientY - b.top) / b.height) * TK.H - omhoog };
}

(function tikKoppel() {
  const c = $("#tikVeld");
  let ingedrukt = false;
  const los = () => { ingedrukt = false; if (tikSpel) tikSpel.vinger = null; };
  c.addEventListener("pointerdown", (ev) => { ingedrukt = true; c.setPointerCapture(ev.pointerId); tikPointer(ev); });
  c.addEventListener("pointermove", (ev) => { if (ingedrukt) tikPointer(ev); });
  c.addEventListener("pointerup", los);
  c.addEventListener("pointercancel", los);
  window.addEventListener("resize", () => { if (tikSpel) tikMaat(); });
  $("#tikTempo").max = TEMPI.length - 1;
  $("#tikTempo").oninput = (ev) => tikZetTempo(+ev.target.value);
  tikZetTempo(tikTempo);
  $("#tikAlsRuiter").onclick = tikKiesPony;
  $("#tikAlsTikker").onclick = () => tikNieuw("tikker");
  $("#tikWillekeurig").onclick = () => tikNieuw("ruiter", kies(PONYS.filter((p) => p.naam !== "Shetlanders")));
  $("#tikVerder").onclick = tikVerderAlsTikker;
  $("#tikStoppen").onclick = () => tikEinde(false);
})();
