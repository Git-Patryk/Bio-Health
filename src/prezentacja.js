// Prezentacja krokowa: każde kliknięcie / strzałka / spacja / pilot = następny krok.
// ?druk&s=N pokazuje slajd N w całości (do eksportu PDF).
import { gsap } from 'gsap';

const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const parametry = new URLSearchParams(location.search);
const druk = parametry.has('druk');
const bezRuchu = druk || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (druk) document.documentElement.classList.add('druk');

const scena = document.getElementById('scena');
const slajdy = $$('.slajd');
const maksKrok = slajdy.map((s) => Math.max(0, ...$$('[data-krok]', s).map((e) => Number(e.dataset.krok))));
let nr = -1;
let krok = 0;
let przewijanie = null;

// znaczniki na makiecie: pozycja w procentach z atrybutów (CSP nie pozwala na style w HTML)
$$('.znacznik').forEach((z) => { z.style.left = `${z.dataset.x}%`; });
$$('.ramka-przegladarki').forEach((r) => {
  // znaczniki liczymy względem obrazka (pod paskiem przeglądarki 34 px)
  const img = r.querySelector('img');
  const ustaw = () => $$('.znacznik', r).forEach((z) => { z.style.top = `${34 + (img.clientHeight * z.dataset.y) / 100}px`; });
  if (img.complete) ustaw(); else img.addEventListener('load', ustaw);
});

function skaluj() {
  if (druk) { scena.style.transform = 'none'; return; }
  const s = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
  scena.style.transform = `translate(-50%, -50%) scale(${s})`;
}
window.addEventListener('resize', skaluj);
skaluj();

function pokazElement(el, natychmiast) {
  const anim = el.dataset.anim;
  if (natychmiast || bezRuchu) {
    gsap.set(el, { autoAlpha: 1, y: 0, scale: 1, clipPath: 'inset(0 0% 0 0)' });
    return;
  }
  if (anim === 'kurtyna') gsap.fromTo(el, { autoAlpha: 1, clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.6, ease: 'power3.inOut' });
  else if (anim === 'fade') gsap.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.9, ease: 'power2.out' });
  else if (el.classList.contains('znacznik')) gsap.fromTo(el, { autoAlpha: 0, scale: 0.3 }, { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'back.out(2.4)' });
  else gsap.fromTo(el, { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out' });
}
function ukryjElement(el) {
  gsap.killTweensOf(el);
  gsap.set(el, { autoAlpha: 0 });
}

function ustawKroki(slajd, k, natychmiast) {
  $$('[data-krok]', slajd).forEach((el) => {
    const n = Number(el.dataset.krok);
    const widoczny = el.dataset.pokazany === '1';
    if (n <= k && !widoczny) { el.dataset.pokazany = '1'; pokazElement(el, natychmiast); }
    if (n > k && (widoczny || el.dataset.pokazany === undefined)) { el.dataset.pokazany = '0'; ukryjElement(el); }
  });
}

function startPrzewijania(slajd) {
  przewijanie?.kill();
  const okno = slajd.querySelector('.okno-przewijane');
  if (!okno || bezRuchu) return;
  const img = okno.querySelector('img');
  const ruszaj = () => {
    const dystans = img.clientHeight - okno.clientHeight;
    przewijanie = gsap.fromTo(img, { y: 0 }, { y: -dystans, duration: 16, ease: 'none', repeat: -1, yoyo: true, repeatDelay: 1.2, delay: 0.8 });
  };
  if (img.complete) ruszaj(); else img.addEventListener('load', ruszaj, { once: true });
}

function pokaz(i, k = 0, kierunek = 1) {
  const poprzedni = slajdy[nr];
  nr = Math.max(0, Math.min(slajdy.length - 1, i));
  krok = Math.max(0, Math.min(maksKrok[nr], k));
  const s = slajdy[nr];
  if (poprzedni !== s) {
    if (poprzedni) {
      poprzedni.classList.remove('aktywny');
      gsap.set(poprzedni, { autoAlpha: 0 });
    }
    $$('[data-krok]', s).forEach((el) => { delete el.dataset.pokazany; });
    s.classList.add('aktywny');
    if (bezRuchu) gsap.set(s, { autoAlpha: 1 });
    else gsap.fromTo(s, { autoAlpha: 0, x: 40 * kierunek }, { autoAlpha: 1, x: 0, duration: 0.55, ease: 'power3.out' });
    startPrzewijania(s);
    if (!bezRuchu && s.querySelector('.stos')) {
      gsap.fromTo('.stos-a', { y: 60, autoAlpha: 0 }, { y: 0, autoAlpha: 0.85, duration: 1, ease: 'power3.out', delay: 0.15 });
      gsap.fromTo('.stos-b', { y: 90, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.1, ease: 'power3.out', delay: 0.35 });
    }
  }
  ustawKroki(s, krok, kierunek < 0 || druk);
  document.getElementById('postep').style.width = `${((nr + 1) / slajdy.length) * 100}%`;
  document.getElementById('licznik-slajdow').textContent = `${nr + 1} / ${slajdy.length}`;
  document.title = `${nr + 1}. ${s.dataset.tytul} — BC5 Makiety`;
  if (!druk) history.replaceState(null, '', `#${nr + 1}`);
}

function dalej() {
  if (krok < maksKrok[nr]) { krok += 1; ustawKroki(slajdy[nr], krok, false); }
  else if (nr < slajdy.length - 1) pokaz(nr + 1, 0, 1);
}
function wstecz() {
  if (krok > 0) { krok -= 1; ustawKroki(slajdy[nr], krok, true); }
  else if (nr > 0) pokaz(nr - 1, maksKrok[nr - 1], -1);
}

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
  pokaz(n, 99);
} else {
  const z = Number(location.hash.replace('#', '')) || 1;
  pokaz(z - 1, 0);
}
