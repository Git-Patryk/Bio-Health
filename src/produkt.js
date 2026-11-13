// Strona produktu: klikalny prototyp (BC5). Wszystko działa w przeglądarce,
// nic nie jest wysyłane. Koszyk żyje tylko w pamięci strony.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
// ?zrzut = wersja bez animacji do zrzutów ekranu (makieta hi-fi do prezentacji)
const trybZrzutu = location.search.includes('zrzut');
if (trybZrzutu) document.documentElement.classList.add('zrzut');
const ruchOgraniczony = window.matchMedia('(prefers-reduced-motion: reduce)').matches || trybZrzutu;
const zl = new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' });
const zaokr = (x) => Math.round(x * 100) / 100;

// ---------------------------------------------------------------- dane
const SMAKI = [
  { id: 'czekolada', nazwa: 'Czekolada', pole: '#e9dcd3', opak: '#5b3a2a', tekst: '#ffffff' },
  { id: 'wanilia', nazwa: 'Wanilia', pole: '#f3e8c9', opak: '#d9b65e', tekst: '#161a33' },
  { id: 'karmel', nazwa: 'Karmel', pole: '#f1dcc2', opak: '#c27a36', tekst: '#ffffff' },
  { id: 'truskawka', nazwa: 'Truskawka', pole: '#f7d9dd', opak: '#d2475d', tekst: '#ffffff' },
  { id: 'bez-smaku', nazwa: 'Bez smaku', pole: '#e6e9ef', opak: '#8e97ab', tekst: '#ffffff' },
  { id: 'kawa', nazwa: 'Kawa', pole: '#e3dad3', opak: '#3e2c24', tekst: '#ffffff', niedostepny: true },
];
const WIELKOSCI = [
  { g: 450, porcje: 15, cena: 59, rytm: 2 },
  { g: 900, porcje: 30, cena: 109, przed: 119, rytm: 4 },
  { g: 2000, porcje: 66, cena: 219, rytm: 8 },
];
const RABAT_SUB = 0.15;
const DARMOWA_OD = 150;
const RYTMY = [2, 4, 6, 8];

const stan = { smak: SMAKI[0], wielkosc: WIELKOSCI[1], tryb: 'sub', rytm: 4, ilosc: 1, pauza: false };
const koszyk = [];

const nazwaWielkosci = (w) => (w.g >= 1000 ? `${w.g / 1000} kg` : `${w.g} g`);
const cenaSub = (w) => zaokr(w.cena * (1 - RABAT_SUB));
const cenaTeraz = () => (stan.tryb === 'sub' ? cenaSub(stan.wielkosc) : stan.wielkosc.cena);
const tygodnie = (n) => (n === 2 || n === 4 ? `${n} tygodnie` : `${n} tygodni`);
const dataPl = (d, opcje = { day: 'numeric', month: 'long' }) => d.toLocaleDateString('pl-PL', opcje);
const dodajDni = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };

// ------------------------------------------------- małe grafiki produktów
function svgOpakowanie(kolor, napis = 'WPC 80') {
  return `<svg viewBox="0 0 300 400" aria-hidden="true"><path fill="${kolor}" d="M44 26h212l3 30c9 92 17 206 9 310-1 13-9 20-22 20H54c-13 0-21-7-22-20-8-104 0-218 9-310z"/><path fill="rgba(0,0,0,.18)" d="M44 26h212l2 26H42z"/><rect x="70" y="120" width="160" height="150" rx="18" fill="rgba(255,255,255,.94)"/><text x="150" y="212" text-anchor="middle" font-family="Onest Variable, sans-serif" font-weight="750" font-size="40" fill="#161a33">${napis}</text></svg>`;
}
function svgSloik(kolor, napis) {
  return `<svg viewBox="0 0 300 400" aria-hidden="true"><rect x="70" y="60" width="160" height="50" rx="12" fill="#161a33"/><rect x="58" y="104" width="184" height="260" rx="30" fill="${kolor}"/><rect x="80" y="170" width="140" height="120" rx="14" fill="rgba(255,255,255,.94)"/><text x="150" y="240" text-anchor="middle" font-family="Onest Variable, sans-serif" font-weight="700" font-size="30" fill="#161a33">${napis}</text></svg>`;
}
function svgShaker() {
  return `<svg viewBox="0 0 300 400" aria-hidden="true"><rect x="110" y="30" width="80" height="40" rx="10" fill="#161a33"/><path d="M82 70h136l-14 300a14 14 0 0 1-14 13H110a14 14 0 0 1-14-13z" fill="rgba(22,26,51,.18)"/><path d="M82 70h136l-3 60H85z" fill="#161a33"/><text x="150" y="270" text-anchor="middle" font-family="Onest Variable, sans-serif" font-weight="700" font-size="28" fill="#161a33">600 ml</text></svg>`;
}
const svgSaszetka = (kolor) => `<svg viewBox="0 0 300 400" aria-hidden="true"><rect x="90" y="40" width="120" height="320" rx="14" fill="${kolor}"/><rect x="90" y="40" width="120" height="30" rx="8" fill="rgba(0,0,0,.18)"/><rect x="104" y="150" width="92" height="110" rx="10" fill="rgba(255,255,255,.94)"/></svg>`;

// ---------------------------------------------------------------- render
function ustawKolory() {
  const r = document.documentElement.style;
  r.setProperty('--pole', stan.smak.pole);
  r.setProperty('--opak', stan.smak.opak);
  r.setProperty('--opak-tekst', stan.smak.tekst);
}

function renderSmaki() {
  const el = $('#smaki');
  el.innerHTML = SMAKI.map((s) => `
    <button type="button" class="opcja" data-smak="${s.id}" aria-pressed="${s === stan.smak}"
      ${s.niedostepny ? 'aria-disabled="true" aria-describedby="info-kawa"' : ''}>
      <span class="kropka"></span>${s.nazwa}
    </button>`).join('');
  // kolor kropki ustawiamy przez CSSOM (CSP blokuje atrybut style w HTML)
  $$('.kropka', el).forEach((k, i) => k.style.setProperty('--k', SMAKI[i].opak));
}

function renderWielkosci() {
  $('#wielkosci').innerHTML = WIELKOSCI.map((w) => `
    <button type="button" class="opcja" data-g="${w.g}" aria-pressed="${w === stan.wielkosc}">
      ${nazwaWielkosci(w)} <small>${w.porcje} porcji</small>
    </button>`).join('');
}

function renderCeny() {
  const w = stan.wielkosc;
  const sub = cenaSub(w);
  const teraz = cenaTeraz();
  const kg = w.g / 1000;
  $('#cena-glowna').textContent = zl.format(teraz);
  $('#cena-dop').textContent = stan.tryb === 'sub' ? `za dostawę co ${tygodnie(stan.rytm)}` : 'jednorazowo';
  $('#cena-sub').textContent = zl.format(sub);
  $('#cena-raz').textContent = zl.format(w.cena);

  const promo = w.przed
    ? ` <s>${zl.format(w.przed)}</s>. Najniższa cena z 30 dni przed obniżką: ${zl.format(w.przed)}.`
    : '.';
  $('#cena-info').innerHTML = stan.tryb === 'sub'
    ? `${zl.format(sub / kg)}/kg w subskrypcji. Jednorazowo ${zl.format(w.cena)}${promo}`
    : `${zl.format(w.cena / kg)}/kg${promo}`;

  const razem = zl.format(teraz * stan.ilosc);
  $('#kwota-przycisk').textContent = razem;
  $('#mini-cena').textContent = razem;
  $('#mob-cena').textContent = razem;
  $('#mob-opis').textContent = stan.tryb === 'sub' ? `co ${tygodnie(stan.rytm)}` : 'jednorazowo';
  $('#mini-nazwa').textContent = `${stan.smak.nazwa}, ${nazwaWielkosci(w)}`;
}

function renderDostawa() {
  const nast = dodajDni(new Date(), stan.rytm * 7);
  $('#nastepna').textContent = dataPl(nast);
  $('#karta-dzien').textContent = nast.getDate();
  $('#karta-mies').textContent = dataPl(nast, { month: 'short' }).replace('.', '');
  $('#karta-rytm').textContent = tygodnie(stan.rytm);
  $('#rytm-select').value = String(stan.rytm);
  const w = stan.wielkosc;
  $('#podpowiedz-rytm').textContent = stan.tryb === 'sub'
    ? `Przy jednej porcji dziennie ${nazwaWielkosci(w)} starcza na ok. ${Math.round(w.porcje / 7)} tyg.${stan.rytm === w.rytm ? ' Rytm dopasowany.' : ` Proponujemy co ${tygodnie(w.rytm)}.`}`
    : '';
}

function renderOpakowanie() {
  $('#opak-smak').textContent = stan.smak.nazwa.toLowerCase();
  $('#opak-gram').textContent = nazwaWielkosci(stan.wielkosc);
  $('#opak-opis').textContent = `Opakowanie białka WPC 80, ${nazwaWielkosci(stan.wielkosc)}, smak ${stan.smak.nazwa.toLowerCase()}`;
  $('#nazwa-smaku').textContent = stan.smak.nazwa.toLowerCase();
  $('#filtr-smak').textContent = stan.smak.nazwa;
}

function renderWszystko() {
  ustawKolory();
  renderOpakowanie();
  renderCeny();
  renderDostawa();
  renderOs();
  renderRazem();
  if (filtrOpinii === 'smak') renderOpinie();
}

// ---------------------------------------------------------- interakcje
$('#smaki').addEventListener('click', (e) => {
  const b = e.target.closest('[data-smak]');
  if (!b) return;
  const s = SMAKI.find((x) => x.id === b.dataset.smak);
  if (s.niedostepny) { otworzOkno('powiadom'); return; }
  if (s === stan.smak) return;
  stan.smak = s;
  $$('[data-smak]').forEach((x) => x.setAttribute('aria-pressed', x === b));
  renderWszystko();
  if (!ruchOgraniczony) {
    gsap.fromTo('.opakowanie', { rotation: -5, y: 10, scale: 0.97 }, { rotation: 0, y: 0, scale: 1, duration: 0.9, ease: 'elastic.out(1, 0.55)' });
  }
});

$('#wielkosci').addEventListener('click', (e) => {
  const b = e.target.closest('[data-g]');
  if (!b) return;
  stan.wielkosc = WIELKOSCI.find((w) => w.g === Number(b.dataset.g));
  stan.rytm = stan.wielkosc.rytm; // podpowiadamy rytm do wielkości (prawo Teslera)
  $$('[data-g]').forEach((x) => x.setAttribute('aria-pressed', x === b));
  renderSegment();
  renderWszystko();
  if (!ruchOgraniczony) {
    const skala = { 450: 0.86, 900: 1, 2000: 1.1 }[stan.wielkosc.g];
    gsap.to('.opakowanie', { scale: skala, duration: 0.6, ease: 'power3.out' });
  }
});

$$('input[name="tryb"]').forEach((r) => r.addEventListener('change', () => { stan.tryb = r.value; renderCeny(); renderDostawa(); }));
$('#rytm-select').addEventListener('change', (e) => ustawRytm(Number(e.target.value)));
$('#mniej').addEventListener('click', () => { stan.ilosc = Math.max(1, stan.ilosc - 1); $('#ilosc').textContent = stan.ilosc; renderCeny(); });
$('#wiecej').addEventListener('click', () => { stan.ilosc = Math.min(9, stan.ilosc + 1); $('#ilosc').textContent = stan.ilosc; renderCeny(); });
$('#ulubione').addEventListener('click', (e) => {
  const b = e.currentTarget;
  const tak = b.getAttribute('aria-pressed') !== 'true';
  b.setAttribute('aria-pressed', tak);
  pokazToast(tak ? 'Dodano do ulubionych' : 'Usunięto z ulubionych');
});

function ustawRytm(n) {
  stan.rytm = n;
  renderSegment();
  renderCeny();
  renderDostawa();
  renderOs();
}

// galeria
$('.miniatury').addEventListener('click', (e) => {
  const b = e.target.closest('[data-pokaz]');
  if (!b) return;
  const w = b.dataset.pokaz;
  $$('.miniatury [role="tab"]').forEach((x) => x.setAttribute('aria-selected', x === b));
  $$('.widok').forEach((x) => x.classList.toggle('widok--aktywny', x.dataset.widok === w));
  $('#scena-produktu').dataset.widok = w;
});

// ------------------------------------------------------------- koszyk
function pozycjaGlowna() {
  const sub = stan.tryb === 'sub';
  return {
    id: `wpc-${stan.smak.id}-${stan.wielkosc.g}-${sub ? `sub${stan.rytm}` : 'raz'}`,
    nazwa: `Białko WPC 80, ${stan.smak.nazwa.toLowerCase()}, ${nazwaWielkosci(stan.wielkosc)}`,
    opis: sub ? `Subskrypcja co ${tygodnie(stan.rytm)}, bez przedpłaty` : 'Zakup jednorazowy',
    cena: cenaTeraz(),
    grafika: svgOpakowanie(stan.smak.opak),
    tlo: stan.smak.pole,
  };
}
const PROBNY = () => ({ id: 'probny', nazwa: 'Zestaw próbny WPC 80', opis: '5 saszetek po 30 g, różne smaki', cena: 19, grafika: svgSaszetka('#d2475d'), tlo: '#f7d9dd' });
const KREATYNA = { id: 'kreatyna', nazwa: 'Kreatyna monohydrat 300 g', opis: 'Zakup jednorazowy', cena: 49, grafika: svgSloik('#3d5afe', 'Kreatyna'), tlo: '#e3e8ff' };
const SHAKER = { id: 'shaker', nazwa: 'Shaker 600 ml', opis: 'Zakup jednorazowy', cena: 19, grafika: svgShaker(), tlo: '#eef0f4' };

function dodajDoKoszyka(poz, ilosc = 1, otworz = true) {
  const jest = koszyk.find((p) => p.id === poz.id);
  if (jest) jest.ilosc += ilosc; else koszyk.push({ ...poz, ilosc });
  renderKoszyk(`Dodano: ${poz.nazwa}`);
  if (otworz) otworzKoszyk();
}

function renderKoszyk(potwierdzenie = '') {
  const suma = koszyk.reduce((s, p) => s + p.cena * p.ilosc, 0);
  const sztuk = koszyk.reduce((s, p) => s + p.ilosc, 0);
  const licznik = $('#licznik');
  licznik.hidden = sztuk === 0;
  licznik.textContent = sztuk;
  $('#otworz-koszyk').setAttribute('aria-label', `Koszyk, ${sztuk} produktów`);
  $('#koszyk-potw').textContent = potwierdzenie ? `✓ ${potwierdzenie}` : '';
  $('#koszyk-lista').innerHTML = koszyk.length
    ? koszyk.map((p) => `
      <li class="poz">
        <span class="poz-obraz" data-tlo="${p.tlo}">${p.grafika}</span>
        <span><b>${p.nazwa}</b><small>${p.opis}${p.ilosc > 1 ? `, ${p.ilosc} szt.` : ''}</small>
          <button type="button" class="poz-usun" data-usun="${p.id}">Usuń</button></span>
        <span class="poz-cena">${zl.format(p.cena * p.ilosc)}</span>
      </li>`).join('')
    : '<li class="koszyk-pusty">Koszyk jest pusty.</li>';
  $$('.poz-obraz', $('#koszyk-lista')).forEach((el) => { el.style.background = el.dataset.tlo; });

  const brak = Math.max(0, DARMOWA_OD - suma);
  $('#darmowa-tekst').innerHTML = brak > 0
    ? `Do darmowej dostawy brakuje <b>${zl.format(brak)}</b>`
    : '<b>Masz darmową dostawę</b>';
  $('#darmowa-wyp').style.width = `${Math.min(100, (suma / DARMOWA_OD) * 100)}%`;
  $('#darmowa').hidden = koszyk.length === 0;
  $('#koszyk-suma').textContent = zl.format(suma);

  const prop = $('#koszyk-propozycja');
  prop.innerHTML = koszyk.length && !koszyk.some((p) => p.id === 'shaker')
    ? `<h3>Pasuje do zamówienia</h3>
       <div class="poz"><span class="poz-obraz" data-tlo="${SHAKER.tlo}">${SHAKER.grafika}</span>
       <span><b>${SHAKER.nazwa}</b><small>${zl.format(SHAKER.cena)}</small></span>
       <button type="button" class="pigulka pigulka--obrys" id="dodaj-shaker">Dodaj</button></div>`
    : '';
  $$('.poz-obraz', prop).forEach((el) => { el.style.background = el.dataset.tlo; });
}

$('#koszyk-lista').addEventListener('click', (e) => {
  const b = e.target.closest('[data-usun]');
  if (!b) return;
  koszyk.splice(koszyk.findIndex((p) => p.id === b.dataset.usun), 1);
  renderKoszyk();
});
$('#koszyk-propozycja').addEventListener('click', (e) => {
  if (e.target.closest('#dodaj-shaker')) dodajDoKoszyka(SHAKER, 1, false);
});

let ostatniFokus = null;
function otworzKoszyk() {
  ostatniFokus = document.activeElement;
  const k = $('#koszyk');
  const z = $('#zaslona');
  k.hidden = false;
  z.hidden = false;
  const pokaz = () => { k.classList.add('otwarty'); z.classList.add('widoczna'); };
  if (ruchOgraniczony) pokaz(); else requestAnimationFrame(pokaz);
  lenis?.stop();
  $('#zamknij-koszyk').focus();
}
function zamknijKoszyk() {
  const k = $('#koszyk');
  const z = $('#zaslona');
  k.classList.remove('otwarty');
  z.classList.remove('widoczna');
  setTimeout(() => { k.hidden = true; z.hidden = true; }, ruchOgraniczony ? 0 : 450);
  lenis?.start();
  ostatniFokus?.focus();
}
['#dodaj', '#dodaj-mini', '#dodaj-mob'].forEach((s) => $(s).addEventListener('click', () => dodajDoKoszyka(pozycjaGlowna(), stan.ilosc)));
$('#dodaj-probny').addEventListener('click', () => dodajDoKoszyka(PROBNY()));
$('#otworz-koszyk').addEventListener('click', () => { renderKoszyk(); otworzKoszyk(); });
$('#zamknij-koszyk').addEventListener('click', zamknijKoszyk);
$('#kontynuuj').addEventListener('click', zamknijKoszyk);
$('#zaslona').addEventListener('click', zamknijKoszyk);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !$('#koszyk').hidden) zamknijKoszyk();
});

// --------------------------------------------- często kupowane razem
const razemZaznaczone = new Set(['wpc', 'kreatyna', 'shaker']);
function renderRazem() {
  const glowna = pozycjaGlowna();
  const pozycje = [
    { klucz: 'wpc', ...glowna, nazwa: `Białko WPC 80, ${nazwaWielkosci(stan.wielkosc)}`, cena: stan.wielkosc.cena },
    { klucz: 'kreatyna', ...KREATYNA },
    { klucz: 'shaker', ...SHAKER },
  ];
  $('#razem-lista').innerHTML = pozycje.map((p) => `
    <li class="razem-karta"><label>
      <input type="checkbox" data-razem="${p.klucz}" ${razemZaznaczone.has(p.klucz) ? 'checked' : ''} aria-label="Zaznacz: ${p.nazwa}">
      <span class="razem-obraz" data-tlo="${p.tlo}">${p.grafika}</span>
      <span><b>${p.nazwa}</b><br><span class="szary">${zl.format(p.cena)}</span></span>
    </label></li>`).join('');
  $$('.razem-obraz', $('#razem-lista')).forEach((el) => { el.style.background = el.dataset.tlo; });
  const suma = pozycje.filter((p) => razemZaznaczone.has(p.klucz)).reduce((s, p) => s + p.cena, 0);
  $('#razem-kwota').textContent = zl.format(suma);
  $('#razem-dodaj').disabled = suma === 0;
  renderRazem.pozycje = pozycje;
}
$('#razem-lista').addEventListener('change', (e) => {
  const k = e.target.dataset.razem;
  if (e.target.checked) razemZaznaczone.add(k); else razemZaznaczone.delete(k);
  renderRazem();
});
$('#razem-dodaj').addEventListener('click', () => {
  renderRazem.pozycje.filter((p) => razemZaznaczone.has(p.klucz)).forEach((p) => {
    const poz = p.klucz === 'wpc' ? { ...pozycjaGlowna(), id: `wpc-${stan.smak.id}-${stan.wielkosc.g}-raz`, opis: 'Zakup jednorazowy', cena: stan.wielkosc.cena } : p;
    dodajDoKoszyka(poz, 1, false);
  });
  renderKoszyk('Dodano zaznaczone produkty');
  otworzKoszyk();
});

// ---------------------------------------------------- polecane
const POLECANE = [
  { nazwa: 'Kreatyna monohydrat 300 g', cena: 49, grafika: svgSloik('#3d5afe', 'Kreatyna'), tlo: '#e3e8ff' },
  { nazwa: 'Witamina D3 2000 IU, 90 kapsułek', cena: 24, grafika: svgSloik('#e8a317', 'D3'), tlo: '#fbefd2' },
  { nazwa: 'Elektrolity, 20 saszetek', cena: 29, grafika: svgSaszetka('#1e9e8a'), tlo: '#d6f1ec' },
  { nazwa: 'Zestaw próbny WPC 80', cena: 19, grafika: svgSaszetka('#d2475d'), tlo: '#f7d9dd' },
];
$('#polecane-lista').innerHTML = POLECANE.map((p) => `
  <li class="polecany"><a href="#" data-modal="inny-produkt">
    <span class="razem-obraz" data-tlo="${p.tlo}">${p.grafika}</span>
    <span><b>${p.nazwa}</b><br><span class="szary">${zl.format(p.cena)}</span></span>
  </a></li>`).join('');
$$('.razem-obraz', $('#polecane-lista')).forEach((el) => { el.style.background = el.dataset.tlo; });

// ------------------------------------------------------------ opinie
const OPINIE = [
  { gw: 5, tytul: 'Rozpuszcza się bez grudek', tekst: 'Biorę po treningu z wodą. Wystarczy chwila w shakerze, smak czekolady nie jest przesłodzony.', autor: 'Kacper', smak: 'czekolada', kiedy: '2 tygodnie temu' },
  { gw: 5, tytul: 'Pauza naprawdę działa', tekst: 'Wstrzymałam dostawy na czas wyjazdu i wznowiłam po powrocie. Bez telefonów i maili z prośbą.', autor: 'Ola', smak: 'wanilia', kiedy: 'miesiąc temu' },
  { gw: 2, tytul: 'Za słodkie jak dla mnie', tekst: 'Jakość w porządku, ale czekolada jest dla mnie za słodka. Następnym razem wezmę wersję bez smaku.', autor: 'Ania', smak: 'czekolada', kiedy: 'miesiąc temu', odp: 'Dziękujemy za opinię. Wersja bez smaku nie zawiera słodzika. Możesz ją sprawdzić w zestawie próbnym, zanim kupisz duże opakowanie.' },
  { gw: 5, tytul: 'Krótki skład, jasna etykieta', tekst: 'Wreszcie widzę wszystko przed zakupem, łącznie z alergenami. Bez smaku dobrze sprawdza się w owsiance.', autor: 'Tomek', smak: 'bez-smaku', kiedy: '2 miesiące temu' },
  { gw: 4, tytul: 'Dobra z mlekiem', tekst: 'Truskawka smakuje najlepiej z mlekiem, z wodą jest trochę płaska.', autor: 'Michał', smak: 'truskawka', kiedy: '3 miesiące temu' },
  { gw: 1, tytul: 'Paczka przyszła uszkodzona', tekst: 'Opakowanie było rozdarte, część proszku wysypała się w kartonie.', autor: 'Kasia', smak: 'karmel', kiedy: '3 miesiące temu', odp: 'Wysłaliśmy nową paczkę bez dodatkowych kosztów i zgłosiliśmy sprawę przewoźnikowi.' },
  { gw: 4, tytul: 'Karmel bardzo smaczny', tekst: 'Mój ulubiony smak. Odejmuję gwiazdkę za to, że miarka mogłaby być większa.', autor: 'Paweł', smak: 'karmel', kiedy: '4 miesiące temu' },
];
let filtrOpinii = 'wszystkie';
function renderOpinie() {
  const lista = OPINIE.filter((o) => (filtrOpinii === 'smak' ? o.smak === stan.smak.id : filtrOpinii === 'krytyczne' ? o.gw <= 2 : true));
  const nazwa = (id) => SMAKI.find((s) => s.id === id).nazwa;
  $('#lista-opinii').innerHTML = lista.length
    ? lista.map((o) => `
      <li class="opinia">
        <div class="opinia-gora"><span class="gw" aria-label="${o.gw} na 5">${'★'.repeat(o.gw)}${'☆'.repeat(5 - o.gw)}</span><span class="szary maly">${o.kiedy}</span></div>
        <h3>${o.tytul}</h3>
        <p>${o.tekst}</p>
        ${o.odp ? `<p class="odpowiedz"><b>Odpowiedź sklepu:</b> ${o.odp}</p>` : ''}
        <div class="opinia-dol"><span>${o.autor}, zweryfikowany zakup</span><span>Smak: ${nazwa(o.smak).toLowerCase()}</span><button type="button" data-modal="zglos">Zgłoś opinię</button></div>
      </li>`).join('')
    : `<li class="pusto">Nie ma jeszcze opinii o smaku ${stan.smak.nazwa.toLowerCase()}. Kupisz go jako pierwszy?</li>`;
}
$('.filtry').addEventListener('click', (e) => {
  const b = e.target.closest('[data-filtr]');
  if (!b) return;
  filtrOpinii = b.dataset.filtr;
  $$('[data-filtr]').forEach((x) => x.setAttribute('aria-pressed', x === b));
  renderOpinie();
});
$$('.rozklad .pasek').forEach((p) => p.style.setProperty('--w', `${p.dataset.proc}%`));

// --------------------------------------------------- rytm dostaw (oś)
function renderSegment() {
  $('#segment').innerHTML = RYTMY.map((n) => `<button type="button" role="radio" aria-checked="${n === stan.rytm}" data-rytm="${n}">co ${n} tyg.</button>`).join('');
}
$('#segment').addEventListener('click', (e) => {
  const b = e.target.closest('[data-rytm]');
  if (b) ustawRytm(Number(b.dataset.rytm));
});
$('#pauza').addEventListener('click', (e) => {
  stan.pauza = !stan.pauza;
  e.currentTarget.setAttribute('aria-pressed', stan.pauza);
  e.currentTarget.textContent = stan.pauza ? 'Wznów w styczniu' : 'Wstrzymaj na styczeń';
  renderOs();
});

function renderOs() {
  const dzis = new Date();
  const start = dodajDni(dzis, -((dzis.getDay() + 6) % 7)); // poniedziałek tego tygodnia
  const tyg = Array.from({ length: 16 }, (_, i) => dodajDni(start, i * 7));
  const wStyczniu = (d) => d.getMonth() === 0;
  const dostawy = new Set();
  let i = 0;
  while (i < 16) {
    if (stan.pauza && wStyczniu(tyg[i])) { i += 1; continue; } // pauza przesuwa dostawę na pierwszy tydzień po styczniu
    dostawy.add(i);
    i += stan.rytm;
  }
  $('#os').innerHTML = tyg.map((d, k) => {
    const klasy = ['tydzien', dostawy.has(k) ? 'dostawa' : '', stan.pauza && wStyczniu(d) ? 'pauza' : '', k === 0 ? 'dzis' : ''].join(' ');
    const etyk = k === 0 ? 'teraz' : dataPl(d, { day: 'numeric', month: 'short' }).replace('.', '');
    return `<li class="${klasy}"><span class="slot"></span><span>${etyk}</span></li>`;
  }).join('');
  const daty = [...dostawy].slice(0, 4).map((k) => (k === 0 ? 'w tym tygodniu' : dataPl(tyg[k])));
  $('#os-opis').textContent = `${stan.pauza ? 'Styczeń wstrzymany. ' : ''}Najbliższe dostawy: ${daty.join(', ')}. Płacisz ${zl.format(cenaSub(stan.wielkosc))} przy każdej wysyłce.`;
  if (!ruchOgraniczony && renderOs.gotowe) {
    gsap.from('#os .dostawa .slot', { scale: 0.6, opacity: 0, duration: 0.5, stagger: 0.04, ease: 'back.out(2)' });
  }
  renderOs.gotowe = true;
}

// ------------------------------------------------------ okna i toast
const OKNA = {
  ankieta: ['Ankieta „Dobierz zestaw”', '<p>Ankietę przygotowujemy razem z grupą projektową. Zapyta o cel (redukcja, masa, regularny trening), rytm dnia i ulubione smaki. Nie zapyta o zdrowie.</p><p class="szary">W tym prototypie strony produktu ankiety jeszcze nie ma.</p>'],
  powiadom: ['Powiadomimy Cię, gdy wróci kawa', '<label class="pole">Adres e-mail<input type="email" id="powiadom-email" autocomplete="email" placeholder="np. jan@example.com"></label><p class="szary maly">Wyślemy jedną wiadomość, gdy smak wróci. To formularz pokazowy: nic nie zostanie wysłane.</p><p class="komunikat blad" id="powiadom-blad" role="alert"></p>', 'Powiadom mnie'],
  szukaj: ['Wyszukiwarka', '<p>Wyszukiwarka będzie na stronie głównej sklepu. Ten prototyp pokazuje stronę jednego produktu.</p>'],
  konto: ['Konto', '<p>Logowanie, rejestracja i panel subskrypcji to kolejne ekrany ścieżki zakupowej. Ten prototyp pokazuje stronę produktu.</p>'],
  kasa: ['Kasa', '<p>Następne kroki to dane do zamówienia, wybór dostawy, płatność i podsumowanie z przyciskiem „Zamawiam z obowiązkiem zapłaty”.</p><p class="szary">Ten prototyp kończy się na koszyku.</p>'],
  zglos: ['Zgłoś opinię', '<p>W prawdziwym sklepie formularz zapyta, co jest nie tak z opinią (np. obraźliwa treść, reklama). Zgłoszenie sprawdzi moderator.</p>'],
  'inny-produkt': ['Inne produkty', '<p>W prototypie działa jedna strona produktu: białko WPC 80.</p>'],
  'w-przygotowaniu': ['Ta strona jest w przygotowaniu', '<p>W prototypie działa strona jednego produktu: białka WPC 80. Pozostałe podstrony sklepu powstaną w kolejnych etapach.</p>'],
};
const okno = $('#okno');
let rodzajOkna = '';
function otworzOkno(rodzaj) {
  const [tytul, tresc, przycisk = 'Rozumiem'] = OKNA[rodzaj];
  rodzajOkna = rodzaj;
  $('#okno-tytul').textContent = tytul;
  $('#okno-tresc').innerHTML = tresc;
  $('button[value="ok"]', okno).textContent = przycisk;
  okno.showModal();
}
// zamykanie okna: X w rogu, kliknięcie w tło obok okna albo Esc (Esc obsługuje sam <dialog>)
$('#zamknij-okno').addEventListener('click', () => okno.close());
okno.addEventListener('click', (e) => { if (e.target === okno) okno.close(); });
$('button[value="ok"]', okno).addEventListener('click', (e) => {
  if (rodzajOkna !== 'powiadom') return;
  const pole = $('#powiadom-email');
  if (!pole.value.trim() || !pole.checkValidity()) {
    e.preventDefault();
    $('#powiadom-blad').textContent = 'Wpisz adres e-mail w formacie jan@example.com.';
    pole.focus();
    return;
  }
  pokazToast('Zapisane. To wersja pokazowa: nic nie wysłaliśmy.');
});
document.addEventListener('click', (e) => {
  const b = e.target.closest('[data-modal]');
  if (!b) return;
  e.preventDefault();
  if (b.dataset.modal === 'kasa') zamknijKoszyk();
  otworzOkno(b.dataset.modal);
});

let toastCzas;
function pokazToast(tekst) {
  const t = $('#toast');
  t.textContent = tekst;
  t.classList.add('widoczny');
  clearTimeout(toastCzas);
  toastCzas = setTimeout(() => t.classList.remove('widoczny'), 2800);
}

// newsletter
$('#news-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = $('#news-email');
  const zgoda = $('#news-zgoda');
  const k = $('#news-komunikat');
  k.className = 'komunikat';
  if (!email.value.trim() || !email.checkValidity()) { k.textContent = 'Wpisz adres e-mail w formacie jan@example.com.'; k.classList.add('blad'); email.focus(); return; }
  if (!zgoda.checked) { k.textContent = 'Zaznacz zgodę, żeby zapisać się na newsletter.'; k.classList.add('blad'); zgoda.focus(); return; }
  k.textContent = 'Gotowe. W prawdziwym sklepie dostałbyś teraz e-mail z linkiem potwierdzającym. To formularz pokazowy: nic nie wysłaliśmy.';
  k.classList.add('ok');
  e.target.reset();
});

// menu na telefonie
$('#przelacz-menu').addEventListener('click', (e) => {
  const otw = $('#menu').classList.toggle('otwarte');
  e.currentTarget.setAttribute('aria-expanded', otw);
});

// --------------------------------------------- przewijanie i animacje
let lenis = null;
if (!ruchOgraniczony) {
  lenis = new Lenis({ duration: 1.1, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}

const odsuniecie = () => -(parseInt(getComputedStyle(document.documentElement).getPropertyValue('--naglowek-h'), 10) + 68);
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a || a.dataset.modal) return;
  // linki do podstron, których prototyp jeszcze nie ma: zamiast skoku na górę strony krótka informacja
  if (a.getAttribute('href') === '#') { e.preventDefault(); $('#menu').classList.remove('otwarte'); otworzOkno('w-przygotowaniu'); return; }
  const cel = $(a.getAttribute('href'));
  if (!cel) return;
  e.preventDefault();
  $('#menu').classList.remove('otwarte');
  if (lenis) lenis.scrollTo(cel, { offset: odsuniecie() });
  else window.scrollTo({ top: cel.getBoundingClientRect().top + window.scrollY + odsuniecie() });
});

// przycisk „na górę”: pojawia się po przewinięciu o ponad półtora ekranu
const doGory = $('#do-gory');
doGory.hidden = false;
const pokazDoGory = () => doGory.classList.toggle('widoczny', window.scrollY > window.innerHeight * 1.5);
window.addEventListener('scroll', pokazDoGory, { passive: true });
pokazDoGory();
doGory.addEventListener('click', () => {
  if (lenis) lenis.scrollTo(0); else window.scrollTo({ top: 0, behavior: ruchOgraniczony ? 'auto' : 'smooth' });
  $('.logo').focus({ preventScroll: true });
});

// nagłówek: przezroczysty nad kolorem, biały po przewinięciu
ScrollTrigger.create({ start: 40, onUpdate: (s) => $('#naglowek').classList.toggle('zwiniety', s.scroll() > 40) });

// mini pasek zakupu i pasek na telefonie: gdy główny przycisk zniknie z ekranu
new IntersectionObserver(([w]) => {
  const ponizej = !w.isIntersecting && w.boundingClientRect.top < 0;
  $('#pasek-sekcji').classList.toggle('z-zakupem', ponizej);
  $('#pasek-mobilny').classList.toggle('widoczny', ponizej);
}).observe($('#dodaj'));

// podświetlanie aktywnej sekcji w podmenu
const linkiSekcji = $$('.pasek-sekcji nav a');
const obserwatorSekcji = new IntersectionObserver((wpisy) => {
  wpisy.forEach((w) => {
    if (w.isIntersecting) linkiSekcji.forEach((a) => a.classList.toggle('aktywna', a.getAttribute('href') === `#${w.target.id}`));
  });
}, { rootMargin: '-40% 0px -55% 0px' });
['opis', 'sklad', 'rytm', 'opinie', 'pytania'].forEach((id) => obserwatorSekcji.observe($(`#${id}`)));

if (!ruchOgraniczony) {
  // jedno wejście strony: opakowanie, potem karty
  gsap.timeline({ defaults: { ease: 'power3.out' } })
    .from('.opakowanie', { y: 80, rotation: -8, opacity: 0, duration: 1.1 })
    .from('.panel-zakupu', { y: 30, opacity: 0, duration: 0.8 }, 0.15)
    .fromTo('.karta-plywajaca', { y: 20, scale: 0.9, autoAlpha: 0 }, { y: 0, scale: 1, autoAlpha: 1, duration: 0.6, stagger: 0.12, ease: 'back.out(1.8)', clearProps: 'opacity,visibility' }, 0.55);

  // lekkie unoszenie opakowania przy przewijaniu
  gsap.to('.scena-produktu .opakowanie', { yPercent: -6, ease: 'none', scrollTrigger: { trigger: '.produkt', start: 'top top', end: 'bottom top', scrub: true } });
  // baner: zdjęcie przesuwa się wolniej niż strona
  gsap.fromTo('.baner img', { yPercent: -12 }, { yPercent: 0, ease: 'none', scrollTrigger: { trigger: '.baner', start: 'top bottom', end: 'bottom top', scrub: true } });
}

// ------------------------------------------------------------ start
renderSmaki();
renderWielkosci();
renderSegment();
renderOpinie();
renderKoszyk();
renderWszystko();
