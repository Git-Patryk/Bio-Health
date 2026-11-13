// Prezentacja „Makieta strony produktu” (BC5): każde kliknięcie / strzałka / spacja / pilot = następny krok.
// ?druk&s=N[&k=K] pokazuje slajd N w kroku K (domyślnie cały) — do eksportu PDF.
// Atrybuty kroków: data-krok="n" (pokaż od kroku n), data-do="m" (schowaj po kroku m),
// data-anim = sposób wejścia (slupek, przemiana, tlo, po).
import { gsap } from 'gsap';

const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const parametry = new URLSearchParams(location.search);
const druk = parametry.has('druk');
const bezRuchu = druk || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (druk) document.documentElement.classList.add('druk');

/* ---------- makieta lo-fi (siatka 1440 × 1240 px, jak pierwszy ekran strony) ---------- */
// [x, y, szerokość, wysokość, rodzaj, podpis, dodatkowa klasa]
const LOFI = [
  [0, 0, 1440, 34, 'pasek', 'Pasek informacyjny'],
  [128, 50, 112, 38, 'ramka', 'Logo'],
  [274, 56, 602, 26, 'tekst', 'Menu według celu: redukcja, masa, trening, zestawy próbne, subskrypcja'],
  [1014, 57, 26, 26, 'ikona', ''],
  [1062, 50, 146, 40, 'pigulka', 'Dobierz zestaw'],
  [1229, 57, 26, 26, 'ikona', ''],
  [1277, 57, 26, 26, 'ikona', ''],
  [128, 124, 463, 20, 'tekst', 'Ścieżka: strona główna / kategoria / produkt'],
  [270, 248, 286, 422, 'zdjecie', 'Zdjęcie produktu'],
  [140, 215, 143, 42, 'plakietka', 'Ocena'],
  [128, 430, 116, 68, 'plakietka', 'Białko w porcji'],
  [498, 596, 198, 70, 'plakietka', 'Najbliższa dostawa'],
  [280, 756, 64, 64, 'zdjecie', ''],
  [366, 756, 64, 64, 'zdjecie', ''],
  [466, 756, 64, 64, 'zdjecie', ''],
  [744, 163, 568, 1077, 'panel', ''],
  [778, 198, 236, 20, 'tekst', 'Kategoria produktu'],
  [778, 226, 394, 90, 'naglowek', 'Nazwa produktu'],
  [778, 329, 180, 20, 'tekst', 'Ocena, opinie'],
  [976, 329, 164, 20, 'link', 'Jak sprawdzamy'],
  [778, 370, 124, 44, 'cena', 'Cena'],
  [910, 386, 196, 22, 'tekst', 'za dostawę co X tyg.'],
  [778, 418, 494, 34, 'tekst', 'Cena za kg, jednorazowa, najniższa z 30 dni'],
  [778, 480, 120, 20, 'tekst', 'Smak'],
  [778, 511, 127, 42, 'pigulka', 'Smak 1', 'wybrany'],
  [913, 511, 104, 42, 'pigulka', 'Smak 2'],
  [1026, 511, 101, 42, 'pigulka', 'Smak 3'],
  [1136, 511, 129, 42, 'pigulka', 'Smak 4'],
  [778, 561, 129, 42, 'pigulka', 'Smak 5'],
  [916, 561, 92, 42, 'pigulka', 'Smak 6', 'brak'],
  [778, 614, 350, 22, 'link', 'Zestaw próbny'],
  [778, 640, 254, 20, 'tekst', 'Powiadom o smaku'],
  [778, 684, 84, 20, 'tekst', 'Wielkość'],
  [778, 716, 132, 42, 'pigulka', 'Wariant 1'],
  [918, 716, 136, 42, 'pigulka', 'Wariant 2', 'wybrany'],
  [1063, 716, 123, 42, 'pigulka', 'Wariant 3'],
  [778, 780, 126, 20, 'tekst', 'Sposób zakupu'],
  [778, 813, 262, 180, 'karta', 'Subskrypcja: rabat i cena\nDostawa co [rytm]\n✓ bez przedpłaty\n✓ pauza\nNastępna dostawa: data', 'wybrany'],
  [1049, 813, 229, 180, 'karta', 'Jednorazowo: cena\nBez zobowiązań'],
  [778, 1002, 464, 20, 'tekst', 'Podpowiedź: na ile starcza opakowanie'],
  [778, 1043, 103, 52, 'pigulka', '−  ilość  +'],
  [892, 1043, 323, 52, 'przycisk', 'Dodaj do koszyka: kwota'],
  [1226, 1043, 52, 52, 'ikona', '♡'],
  [778, 1116, 460, 40, 'tekst', 'Dostawa: kiedy wyślemy i ile kosztuje'],
  [778, 1170, 380, 22, 'tekst', 'Płatności: BLIK, karta, przelew'],
  [778, 1202, 320, 22, 'tekst', 'Zwroty: 14 dni'],
];
const SZER = 1440;
const WYS = 1240;
const procX = (v) => `${(v / SZER) * 100}%`;
const procY = (v) => `${(v / WYS) * 100}%`;
function ustawProstokat(el, x, y, w, h) {
  Object.assign(el.style, { left: procX(x), top: procY(y), width: procX(w), height: procY(h) });
}

const makieta = document.getElementById('makieta');
const przemiana = makieta?.querySelector('.przemiana');
const hifiPelna = przemiana?.querySelector('.hifi-pelna');
const kawalki = [];
if (makieta) {
  const pierwszy = makieta.firstChild;
  for (const [x, y, w, h, rodzaj, podpis, klasa] of LOFI) {
    const el = document.createElement('div');
    el.className = `lf lf-${rodzaj}${klasa ? ` ${klasa}` : ''}`;
    ustawProstokat(el, x, y, w, h);
    if (rodzaj === 'zdjecie') {
      el.innerHTML = '<svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><line x1="0" y1="0" x2="100" y2="100" stroke="#b5b5b5" stroke-width="1" vector-effect="non-scaling-stroke"/><line x1="100" y1="0" x2="0" y2="100" stroke="#b5b5b5" stroke-width="1" vector-effect="non-scaling-stroke"/></svg>';
      if (podpis) { const s = document.createElement('span'); s.textContent = podpis; el.append(s); }
    } else el.textContent = podpis;
    makieta.insertBefore(el, pierwszy);

    // kawałek hi-fi w tym samym miejscu: przy przemianie „zabarwia” szare pole
    if (rodzaj !== 'panel' && przemiana) {
      const k = document.createElement('div');
      k.className = 'kawalek';
      ustawProstokat(k, x, y, w, h);
      const img = document.createElement('img');
      img.src = hifiPelna.getAttribute('src');
      img.alt = '';
      Object.assign(img.style, { width: `${(SZER / w) * 100}%`, height: `${(WYS / h) * 100}%`, left: `${(-x / w) * 100}%`, top: `${(-y / h) * 100}%` });
      k.append(img);
      przemiana.insertBefore(k, hifiPelna);
      kawalki.push({ el: k, y, x });
    }
  }
  kawalki.sort((a, b) => a.y - b.y || a.x - b.x);
  $$('.znacznik', makieta).forEach((z) => { z.style.left = procX(z.dataset.x); z.style.top = procY(z.dataset.y); });
}

// obrysy na zrzutach (pozycje w % z atrybutów — CSP nie pozwala na style w HTML)
$$('.obrys').forEach((o) => {
  Object.assign(o.style, { left: `${o.dataset.x}%`, top: `${o.dataset.y}%`, width: `${o.dataset.w}%`, height: `${o.dataset.h}%` });
});
$$('.wypelnienie').forEach((w) => { w.dataset.cel = `${(Number(w.dataset.w) / 40) * 100}%`; });

/* ---------- skalowanie sceny ---------- */
const scena = document.getElementById('scena');
const slajdy = $$('.slajd');
const maksKrok = slajdy.map((s) => Math.max(0, ...$$('[data-krok]', s).map((e) => Number(e.dataset.krok))));
let nr = -1;
let krok = 0;
let petla = null;

function skaluj() {
  if (druk) { scena.style.transform = 'none'; return; }
  const s = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
  scena.style.transform = `translate(-50%, -50%) scale(${s})`;
}
window.addEventListener('resize', skaluj);
skaluj();

/* ---------- liczby, które „dobiegają” do wartości ---------- */
const formatuj = (v, miejsca) => v.toFixed(miejsca).replace('.', ',');
function policz(el, natychmiast) {
  const cel = Number(el.dataset.liczba);
  const miejsca = Number(el.dataset.miejsca || 0);
  const przyrostek = el.dataset.przyrostek || '';
  if (natychmiast) { el.textContent = formatuj(cel, miejsca) + przyrostek; return; }
  const stan = { v: 0 };
  gsap.to(stan, {
    v: cel, duration: 1.4, ease: 'power3.out',
    onUpdate: () => { el.textContent = formatuj(stan.v, miejsca) + przyrostek; },
  });
}

/* ---------- przemiana lo-fi → hi-fi ---------- */
function przemien(natychmiast) {
  gsap.killTweensOf([przemiana, hifiPelna, ...kawalki.map((k) => k.el)]);
  gsap.set(przemiana, { autoAlpha: 1 });
  if (natychmiast) {
    kawalki.forEach((k) => gsap.set(k.el, { autoAlpha: 1, clipPath: 'inset(0 0% 0 0)', scale: 1 }));
    gsap.set(hifiPelna, { autoAlpha: 1 });
    return;
  }
  gsap.set(hifiPelna, { autoAlpha: 0 });
  const tl = gsap.timeline({ delay: 0.25 });
  // szare pola po kolei wypełniają się kolorem i prawdziwą treścią, od góry do dołu
  tl.fromTo(kawalki.map((k) => k.el),
    { autoAlpha: 1, clipPath: 'inset(0 100% 0 0)' },
    { clipPath: 'inset(0 0% 0 0)', duration: 0.55, ease: 'power2.inOut', stagger: 0.05 });
  tl.to(hifiPelna, { autoAlpha: 1, duration: 0.9, ease: 'power2.out' }, '-=0.2');
  tl.fromTo(makieta.closest('.ramka-przegladarki'), { scale: 1 }, { scale: 1.015, duration: 0.5, yoyo: true, repeat: 1, ease: 'sine.inOut' }, '<');
}

/* ---------- pokazywanie i chowanie elementów ---------- */
function pokazElement(el, natychmiast) {
  const anim = el.dataset.anim;
  if (anim === 'przemiana') { przemien(natychmiast || bezRuchu); return; }
  if (natychmiast || bezRuchu) {
    gsap.set(el, { autoAlpha: 1, y: 0, scale: 1, rotation: el.classList.contains('stempel') ? -4 : 0 });
    $$('.licz', el).forEach((l) => policz(l, true));
    $$('.wypelnienie', el).forEach((w) => gsap.set(w, { width: w.dataset.cel }));
    return;
  }
  $$('.licz', el).forEach((l) => policz(l, false));
  if (anim === 'slupek') {
    gsap.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 });
    const w = el.querySelector('.wypelnienie');
    const i = $$('[data-anim="slupek"]', el.parentElement).indexOf(el);
    gsap.fromTo(w, { width: 0 }, { width: w.dataset.cel, duration: 1.1, ease: 'power3.out', delay: 0.15 + i * 0.12 });
  } else if (anim === 'tlo' || anim === 'po') {
    gsap.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.2, ease: 'power2.out', delay: anim === 'po' ? 2.6 : 1.4 });
  } else if (el.classList.contains('znacznik')) {
    gsap.fromTo(el, { autoAlpha: 0, scale: 0.3 }, { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'back.out(2.4)' });
  } else if (el.classList.contains('obrys')) {
    gsap.fromTo(el, { autoAlpha: 0, scale: 1.25 }, { autoAlpha: 1, scale: 1, duration: 0.55, ease: 'back.out(1.8)', delay: 0.35 });
  } else if (el.classList.contains('kadr')) {
    gsap.fromTo(el, { autoAlpha: 0, y: 40, rotation: 1.5 }, { autoAlpha: 1, y: 0, rotation: 0, duration: 0.7, ease: 'power3.out' });
    const st = el.querySelector('.stempel');
    if (st) gsap.fromTo(st, { scale: 2.4, rotation: -16, autoAlpha: 0 }, { scale: 1, rotation: -4, autoAlpha: 1, duration: 0.5, ease: 'back.out(2)', delay: 0.45 });
  } else {
    gsap.fromTo(el, { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out' });
  }
}
function ukryjElement(el, lagodnie) {
  gsap.killTweensOf(el);
  if (lagodnie && !bezRuchu) gsap.to(el, { autoAlpha: 0, duration: 0.4 });
  else gsap.set(el, { autoAlpha: 0 });
}

function widocznyW(el, k) {
  const od = Number(el.dataset.krok);
  const doK = el.dataset.do === undefined ? Infinity : Number(el.dataset.do);
  return od <= k && k <= doK;
}
function ustawKroki(slajd, k, natychmiast) {
  $$('[data-krok]', slajd).forEach((el) => {
    const widoczny = el.dataset.pokazany === '1';
    if (widocznyW(el, k) && !widoczny) { el.dataset.pokazany = '1'; pokazElement(el, natychmiast); }
    if (!widocznyW(el, k) && (widoczny || el.dataset.pokazany === undefined)) { el.dataset.pokazany = '0'; ukryjElement(el, !natychmiast); }
  });
}

/* ---------- slajd „Kolor smaku”: strona sama zmienia smaki ---------- */
function startSmakow(slajd) {
  petla?.kill();
  petla = null;
  const kadry = $$('.smak-kadr', slajd);
  if (!kadry.length) return;
  const tlo = slajd.querySelector('.smaki-tlo');
  gsap.set(kadry, { autoAlpha: 0 });
  gsap.set(kadry[0], { autoAlpha: 1 });
  gsap.set(tlo, { backgroundColor: kadry[0].dataset.tlo });
  if (bezRuchu) return;
  petla = gsap.timeline({ repeat: -1, delay: 1.2 });
  kadry.forEach((kadr, i) => {
    const nast = kadry[(i + 1) % kadry.length];
    petla.to(kadr, { autoAlpha: 0, duration: 0.8, ease: 'power2.inOut' }, '+=1.6')
      .to(nast, { autoAlpha: 1, duration: 0.8, ease: 'power2.inOut' }, '<')
      .to(tlo, { backgroundColor: nast.dataset.tlo, duration: 0.8, ease: 'power2.inOut' }, '<');
  });
}

/* ---------- nawigacja ---------- */
function pokaz(i, k = 0, kierunek = 1) {
  const poprzedni = slajdy[nr];
  nr = Math.max(0, Math.min(slajdy.length - 1, i));
  krok = Math.max(0, Math.min(maksKrok[nr], k));
  const s = slajdy[nr];
  if (poprzedni !== s) {
    if (poprzedni) {
      poprzedni.classList.remove('aktywny');
      // zatrzymaj trwające animacje poprzedniego slajdu, żeby nie został widoczny pod nowym
      gsap.killTweensOf(poprzedni);
      gsap.killTweensOf(poprzedni.querySelectorAll('*'));
      gsap.set(poprzedni, { autoAlpha: 0, x: 0 });
    }
    $$('[data-krok]', s).forEach((el) => { delete el.dataset.pokazany; });
    s.classList.add('aktywny');
    if (bezRuchu) gsap.set(s, { autoAlpha: 1 });
    else gsap.fromTo(s, { autoAlpha: 0, x: 40 * kierunek }, { autoAlpha: 1, x: 0, duration: 0.55, ease: 'power3.out' });
    startSmakow(s);
    // liczby widoczne od razu (bez data-krok) też „dobiegają”
    $$('.licz', s).filter((l) => !l.closest('[data-krok]')).forEach((l) => policz(l, bezRuchu));
    if (!bezRuchu && s.querySelector('.stos')) {
      gsap.fromTo(s.querySelector('.stos-a'), { y: 60, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, ease: 'power3.out', delay: 0.15 });
      gsap.fromTo(s.querySelector('.stos-b'), { y: 90, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.1, ease: 'power3.out', delay: 0.5 });
    }
  }
  ustawKroki(s, krok, kierunek < 0 || druk);
  const postep = document.getElementById('postep');
  postep.style.width = `${((nr + 1) / slajdy.length) * 100}%`;
  postep.style.backgroundColor = s.dataset.akcent || '';
  document.getElementById('licznik-slajdow').textContent = `${nr + 1} / ${slajdy.length}`;
  document.title = `${nr + 1}. ${s.dataset.tytul} — Bio & Health`;
  odswiezPrzyciski();
  if (!druk) history.replaceState(null, '', `#${nr + 1}`);
}

function dalej() {
  if (krok < maksKrok[nr]) { krok += 1; ustawKroki(slajdy[nr], krok, false); odswiezPrzyciski(); }
  else if (nr < slajdy.length - 1) pokaz(nr + 1, 0, 1);
}
function wstecz() {
  if (krok > 0) { krok -= 1; ustawKroki(slajdy[nr], krok, true); odswiezPrzyciski(); }
  else if (nr > 0) pokaz(nr - 1, maksKrok[nr - 1], -1);
}
function odswiezPrzyciski() {
  przyciskWstecz.disabled = nr === 0 && krok === 0;
  przyciskDalej.disabled = nr === slajdy.length - 1 && krok === maksKrok[nr];
}

// klikalne strzałki w prawym dolnym rogu (blur: spacja/Enter nie „klika” przycisku drugi raz)
const przyciskWstecz = document.getElementById('przycisk-wstecz');
const przyciskDalej = document.getElementById('przycisk-dalej');
przyciskWstecz.addEventListener('click', () => { wstecz(); przyciskWstecz.blur(); });
przyciskDalej.addEventListener('click', () => { dalej(); przyciskDalej.blur(); });

document.addEventListener('keydown', (e) => {
  if (['ArrowRight', 'PageDown', ' ', 'Enter'].includes(e.key)) { e.preventDefault(); dalej(); }
  else if (['ArrowLeft', 'PageUp', 'Backspace'].includes(e.key)) { e.preventDefault(); wstecz(); }
  else if (e.key === 'Home') pokaz(0);
  else if (e.key === 'End') pokaz(slajdy.length - 1, maksKrok[slajdy.length - 1]);
  else if (e.key.toLowerCase() === 'f') {
    if (document.fullscreenElement) document.exitFullscreen(); else document.documentElement.requestFullscreen?.();
  }
});
document.addEventListener('click', (e) => {
  if (e.target.closest('a, button')) return;
  if (e.clientX < window.innerWidth * 0.2) wstecz(); else dalej();
});
let dotykX = null;
document.addEventListener('touchstart', (e) => { dotykX = e.touches[0].clientX; }, { passive: true });
document.addEventListener('touchend', (e) => {
  if (dotykX === null) return;
  const d = e.changedTouches[0].clientX - dotykX;
  if (Math.abs(d) > 50) (d < 0 ? dalej : wstecz)();
  dotykX = null;
});

setTimeout(() => { const p = document.getElementById('pomoc'); if (p) p.style.opacity = '0'; }, 5000);

// start
$$('[data-krok]').forEach((el) => gsap.set(el, { autoAlpha: 0 }));
if (druk) {
  const n = Number(parametry.get('s') || 1) - 1;
  pokaz(n, Number(parametry.get('k') ?? 99));
} else {
  const z = Number(location.hash.replace('#', '')) || 1;
  pokaz(z - 1, 0);
}
