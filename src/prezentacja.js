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

/* ---------- makieta lo-fi (siatka 1440 × 870 px = pierwszy ekran strony na laptopie) ---------- */
// [x, y, szerokość, wysokość, rodzaj, podpis, dodatkowa klasa]
const LOFI = [
  [0, 0, 1440, 34, 'pasek', 'Pasek informacyjny'],
  [128, 53, 110, 34, 'ramka', 'Logo'],
  [274, 57, 601, 26, 'tekst', 'Menu według celu: redukcja, masa, trening, zestawy próbne, subskrypcja'],
  [1014, 57, 26, 26, 'ikona', ''],
  [1061, 50, 147, 40, 'pigulka', 'Dobierz zestaw'],
  [1229, 57, 26, 26, 'ikona', ''],
  [1277, 57, 26, 26, 'ikona', ''],
  [128, 116, 423, 20, 'tekst', 'Ścieżka: strona główna / kategoria / produkt'],
  [235, 214, 212, 318, 'zdjecie', 'Zdjęcie produktu'],
  [136, 181, 143, 43, 'plakietka', 'Ocena'],
  [128, 351, 116, 70, 'plakietka', 'Białko w porcji'],
  [383, 466, 198, 72, 'plakietka', 'Najbliższa dostawa'],
  [208, 603, 64, 64, 'zdjecie', ''],
  [294, 603, 64, 64, 'zdjecie', ''],
  [394, 603, 64, 64, 'zdjecie', ''],
  [591, 118, 721, 752, 'panel', ''],
  [621, 142, 260, 22, 'tekst', 'Kategoria produktu'],
  [621, 168, 500, 41, 'naglowek', 'Nazwa produktu'],
  [621, 217, 180, 23, 'tekst', 'Ocena, opinie'],
  [819, 217, 164, 23, 'link', 'Jak sprawdzamy'],
  [621, 251, 116, 41, 'cena', 'Cena'],
  [746, 266, 195, 21, 'tekst', 'za dostawę co X tyg.'],
  [621, 293, 661, 40, 'tekst', 'Cena za kg, jednorazowa, najniższa z 30 dni'],
  [621, 347, 118, 23, 'tekst', 'Smak'],
  [621, 378, 116, 38, 'pigulka', 'Smak 1', 'wybrany'],
  [743, 378, 94, 38, 'pigulka', 'Smak 2'],
  [843, 378, 91, 38, 'pigulka', 'Smak 3'],
  [940, 378, 118, 38, 'pigulka', 'Smak 4'],
  [1065, 378, 118, 38, 'pigulka', 'Smak 5'],
  [1189, 378, 83, 38, 'pigulka', 'Smak 6', 'brak'],
  [621, 424, 336, 22, 'link', 'Nie wiesz, który? Zestaw próbny'],
  [970, 424, 245, 22, 'tekst', 'Powiadom o smaku'],
  [621, 459, 84, 23, 'tekst', 'Wielkość'],
  [621, 490, 124, 38, 'pigulka', 'Wariant 1'],
  [751, 490, 128, 38, 'pigulka', 'Wariant 2', 'wybrany'],
  [885, 490, 116, 38, 'pigulka', 'Wariant 3'],
  [621, 542, 126, 23, 'tekst', 'Sposób zakupu'],
  [621, 568, 355, 124, 'karta', 'Subskrypcja: rabat i cena\nDostawa co [rytm]\n✓ bez przedpłaty  ✓ pauza\nNastępna dostawa: data', 'wybrany'],
  [986, 572, 296, 120, 'karta', 'Jednorazowo: cena\nBez zobowiązań'],
  [621, 698, 460, 20, 'tekst', 'Podpowiedź: na ile starcza opakowanie'],
  [621, 729, 104, 50, 'pigulka', '−  ilość  +'],
  [735, 729, 485, 50, 'przycisk', 'Dodaj do koszyka: kwota'],
  [1230, 728, 52, 52, 'ikona', '♡'],
  [621, 800, 211, 55, 'tekst', 'Dostawa: kiedy i za ile'],
  [846, 800, 211, 55, 'tekst', 'Płatności: BLIK, karta'],
  [1071, 800, 211, 55, 'tekst', 'Zwroty: 14 dni'],
];
const SZER = 1440;
const WYS = 870;
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
