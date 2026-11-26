// Prezentacja „Content, SEO i GEO” (BC6): każde kliknięcie / strzałka / spacja / pilot = następny krok.
// ?druk&s=N[&k=K] pokazuje slajd N w kroku K (domyślnie cały) — do eksportu PDF.
// Atrybuty: data-krok="n" (pokaż od kroku n), data-do="m" (schowaj po kroku m), data-anim="scal" (łączenie pasków).
// Silnik na wzór prezentacji makiet (src/prezentacja.js).
import { gsap } from 'gsap';

const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const parametry = new URLSearchParams(location.search);
const druk = parametry.has('druk');
const bezRuchu = druk || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (druk) document.documentElement.classList.add('druk');

// obrysy na zrzutach (pozycje w % z atrybutów — CSP nie pozwala na style w HTML)
$$('.obrys').forEach((o) => {
  Object.assign(o.style, { left: `${o.dataset.x}%`, top: `${o.dataset.y}%`, width: `${o.dataset.w}%`, height: `${o.dataset.h}%` });
});

/* ---------- skalowanie sceny ---------- */
const scena = document.getElementById('scena');
const slajdy = $$('.slajd');
const maksKrok = slajdy.map((s) => Math.max(0, ...$$('[data-krok]', s).map((e) => Number(e.dataset.krok))));
let nr = -1;
let krok = 0;

function skaluj() {
  if (druk) { scena.style.transform = 'none'; return; }
  const s = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
  scena.style.transform = `translate(-50%, -50%) scale(${s})`;
}
window.addEventListener('resize', skaluj);
skaluj();

/* ---------- liczby, które „dobiegają” do wartości ---------- */
const formatuj = (v, miejsca) => (v < 0 ? '−' : '') + Math.abs(v).toFixed(miejsca).replace('.', ',');
function policz(el, natychmiast) {
  const cel = Number(el.dataset.liczba);
  const miejsca = Number(el.dataset.miejsca || 0);
  const przyrostek = el.dataset.przyrostek || '';
  if (natychmiast) { el.textContent = formatuj(cel, miejsca) + przyrostek; return; }
  const stan = { v: 0 };
  gsap.to(stan, { v: cel, duration: 1.4, ease: 'power3.out', onUpdate: () => { el.textContent = formatuj(stan.v, miejsca) + przyrostek; } });
}

/* ---------- slajd „białko”: paski i łączenie wariantów w jedno hasło ---------- */
const SKALA_PASKOW = 45; // najdłuższy pasek (protein 42,8) prawie na całą szerokość
function rosnijPaski(slajd, natychmiast) {
  $$('.pasek', slajd).forEach((p, i) => {
    const w = p.querySelector('.p-wyp');
    const cel = `${(Number(p.dataset.w) / SKALA_PASKOW) * 100}%`;
    gsap.killTweensOf(w);
    if (natychmiast) gsap.set(w, { width: cel });
    else gsap.fromTo(w, { width: 0 }, { width: cel, duration: 1.1, ease: 'power3.out', delay: 0.25 + i * 0.12 });
  });
}
function scal(slajd, natychmiast) {
  const glowny = slajd.querySelector('.pasek--glowny');
  const warianty = $$('.pasek--scal', slajd);
  const podpis = glowny.querySelector('.grupa-podpis');
  gsap.killTweensOf([...warianty, podpis]);
  if (natychmiast) {
    gsap.set(warianty, { autoAlpha: 0, y: 0 });
    gsap.set(podpis, { autoAlpha: 1 });
    return;
  }
  const yGlownego = glowny.getBoundingClientRect().top;
  warianty.forEach((p, i) => {
    const dy = (yGlownego - p.getBoundingClientRect().top) / (scena.getBoundingClientRect().height / 1080);
    gsap.to(p, { y: dy, autoAlpha: 0, scale: 0.92, duration: 0.7, ease: 'power2.in', delay: 0.15 + i * 0.12 });
  });
  gsap.fromTo(podpis, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, delay: 0.9 });
  gsap.fromTo(glowny, { scale: 1 }, { scale: 1.04, duration: 0.3, yoyo: true, repeat: 1, delay: 0.85, ease: 'sine.inOut', transformOrigin: 'left center' });
}
function rozdziel(slajd) {
  const warianty = $$('.pasek--scal', slajd);
  const podpis = slajd.querySelector('.grupa-podpis');
  gsap.killTweensOf([...warianty, podpis]);
  gsap.set(warianty, { autoAlpha: 1, y: 0, scale: 1 });
  gsap.set(podpis, { autoAlpha: 0 });
}

/* ---------- slajd tytułowy: wpisywanie „białko” ---------- */
function wpisz(natychmiast) {
  const el = document.getElementById('pisanie');
  if (!el) return;
  const tekst = 'białko';
  if (natychmiast) { el.textContent = tekst; return; }
  el.textContent = '';
  [...tekst].forEach((z, i) => gsap.delayedCall(0.6 + i * 0.14, () => { el.textContent += z; }));
}

/* ---------- pokazywanie i chowanie elementów ---------- */
function pokazElement(el, natychmiast) {
  const slajd = el.closest('.slajd');
  if (el.dataset.anim === 'scal') scal(slajd, natychmiast || bezRuchu);
  if (natychmiast || bezRuchu) {
    gsap.set(el, { autoAlpha: 1, y: 0, scale: 1 });
    $$('.licz', el).forEach((l) => policz(l, true));
    const st = el.classList.contains('stempel') ? el : null;
    if (st) gsap.set(st, { rotation: -4 });
    return;
  }
  $$('.licz', el).forEach((l) => policz(l, false));
  if (el.classList.contains('obrys')) {
    gsap.fromTo(el, { autoAlpha: 0, scale: 1.2 }, { autoAlpha: 1, scale: 1, duration: 0.55, ease: 'back.out(1.8)', delay: 0.2 });
  } else if (el.classList.contains('stempel')) {
    gsap.fromTo(el, { autoAlpha: 0, scale: 2.4, rotation: -16 }, { autoAlpha: 1, scale: 1, rotation: -4, duration: 0.5, ease: 'back.out(2)' });
  } else if (el.classList.contains('strzalka')) {
    gsap.fromTo(el, { autoAlpha: 0, x: -30 }, { autoAlpha: 1, x: 0, duration: 0.5, ease: 'power3.out' });
  } else {
    gsap.fromTo(el, { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out' });
    const st = el.querySelector('.stempel');
    if (st) gsap.fromTo(st, { scale: 2.2, rotation: -16, autoAlpha: 0 }, { scale: 1, rotation: -4, autoAlpha: 1, duration: 0.5, ease: 'back.out(2)', delay: 0.3 });
  }
}
function ukryjElement(el, lagodnie) {
  gsap.killTweensOf(el);
  if (el.dataset.anim === 'scal') rozdziel(el.closest('.slajd'));
  if (lagodnie && !bezRuchu) gsap.to(el, { autoAlpha: 0, duration: 0.35 });
  else gsap.set(el, { autoAlpha: 0 });
}

const widocznyW = (el, k) => Number(el.dataset.krok) <= k && k <= (el.dataset.do === undefined ? Infinity : Number(el.dataset.do));
function ustawKroki(slajd, k, natychmiast) {
  $$('[data-krok]', slajd).forEach((el) => {
    const widoczny = el.dataset.pokazany === '1';
    if (widocznyW(el, k) && !widoczny) { el.dataset.pokazany = '1'; pokazElement(el, natychmiast); }
    if (!widocznyW(el, k) && (widoczny || el.dataset.pokazany === undefined)) { el.dataset.pokazany = '0'; ukryjElement(el, !natychmiast); }
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
      gsap.killTweensOf(poprzedni);
      gsap.killTweensOf(poprzedni.querySelectorAll('*'));
      gsap.set(poprzedni, { autoAlpha: 0, x: 0 });
    }
    $$('[data-krok]', s).forEach((el) => { delete el.dataset.pokazany; });
    if (s.querySelector('.paski')) rozdziel(s);
    s.classList.add('aktywny');
    if (bezRuchu) gsap.set(s, { autoAlpha: 1 });
    else gsap.fromTo(s, { autoAlpha: 0, x: 40 * kierunek }, { autoAlpha: 1, x: 0, duration: 0.55, ease: 'power3.out' });
    $$('.licz', s).filter((l) => !l.closest('[data-krok]')).forEach((l) => policz(l, bezRuchu));
    if (s.querySelector('.paski')) rosnijPaski(s, bezRuchu || kierunek < 0);
    if (s.querySelector('#pisanie')) wpisz(bezRuchu);
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
const przyciskWstecz = document.getElementById('przycisk-wstecz');
const przyciskDalej = document.getElementById('przycisk-dalej');
function odswiezPrzyciski() {
  przyciskWstecz.disabled = nr === 0 && krok === 0;
  przyciskDalej.disabled = nr === slajdy.length - 1 && krok === maksKrok[nr];
}
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
  pokaz(Number(parametry.get('s') || 1) - 1, Number(parametry.get('k') ?? 99));
} else {
  pokaz((Number(location.hash.replace('#', '')) || 1) - 1, 0);
}
