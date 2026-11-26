// Generuje działy sklepu, Sklep, Wyprzedaż, Strefę Wiedzy i wspólny nagłówek z jednego zestawu danych (narzedzia/dane-sklepu.mjs).
// Uruchom z katalogu projektu:  node narzedzia/generuj-strony.mjs
// Strony są zwykłym HTML (bez JavaScriptu do treści), żeby czytały je wyszukiwarki i asystenci AI.
// Nagłówek wstawiamy też do index.html, produkt.html i informacje.html — między znaczniki <!-- NAGLOWEK:START/END -->.

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { ADRES, KATEGORIE, ARTYKULY, CECHY } from './dane-sklepu.mjs';

const KATALOG = resolve(import.meta.dirname, '..');
const zl = (n) => n.toFixed(2).replace('.', ',') + ' zł';
const bezTagow = (s) => s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const atrybut = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
const kategoria = (slug) => KATEGORIE.find((k) => k.slug === slug);
const artykul = (slug) => ARTYKULY.find((a) => a.slug === slug);
const hrefProduktu = (k, p) => p.link || `./${k.slug}.html#${p.id}`;

// ------------------------------------------------------------------ nagłówek (wspólny dla wszystkich stron)
// Układ: logo → Sklep (duży panel z wszystkimi działami), Białko, Suplementy, Witaminy, Wyprzedaż → (przerwa)
// Strefa Wiedzy → Dobierz zestaw → szukaj, konto, koszyk → język. Na karcie produktu przyciski otwierają okna
// tej strony; na pozostałych prowadzą do karty produktu (produkt.html#szukaj, #konto, #koszyk). „Dobierz zestaw” → ankieta.html.
const strzalka = '<svg class="menu-strzalka" viewBox="0 0 12 12" aria-hidden="true"><path d="m3 4.5 3 3 3-3"/></svg>';
const LOGO_ZNAK = '<svg class="logo-znak" viewBox="0 0 100 100" aria-hidden="true"><path class="lz-petla" d="M79.11 25.57 A38 38 0 1 1 25.57 20.89" fill="none" stroke-width="12" stroke-linecap="round"/><path class="lz-grot" d="M36.5 11.4 L31.6 32.6 L15.2 13.3 Z" stroke-width="2" stroke-linejoin="round"/><g transform="rotate(-40 50 53)"><path class="lz-k1" d="M49 43 H38 A10 10 0 0 0 38 63 H49 Z"/><path class="lz-k2" d="M51 43 H62 A10 10 0 0 1 62 63 H51 Z"/></g></svg>';
const LOGO_NAPIS = '<span class="logo-napis" aria-hidden="true">BIO<span>&amp;</span>HEALTH</span>';
const logo = () => `<a class="logo" href="./" aria-label="Bio &amp; Health — strona główna">${LOGO_ZNAK}${LOGO_NAPIS}</a>`;
const logoStopka = `<p class="logo logo--jasne logo--stopka" aria-label="Bio &amp; Health">${LOGO_ZNAK}${LOGO_NAPIS}</p>`;
const IKONY = {
  szukaj: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
  konto: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg>',
  koszyk: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
  menu: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h16M4 16h16"/></svg>',
  jezyk: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"/></svg>',
};

// Pasek korzyści nad nagłówkiem: statyczny (bez przewijania się tekstu), tylko prawdziwe obietnice sklepu.
function pasekKorzysci({ produkt = false } = {}) {
  const ik = (d) => `<svg viewBox="0 0 24 24" aria-hidden="true">${d}</svg>`;
  return `<aside class="pasek-korzysci" aria-label="Zalety zakupów w Bio &amp; Health">
      <ul>
        <li>${ik('<path d="M5 19 19 5"/><circle cx="7" cy="7" r="2.5"/><circle cx="17" cy="17" r="2.5"/>')}<span><b>−15%</b> na każdą dostawę w subskrypcji</span></li>
        <li>${ik('<path d="M3 7h11v9H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17.5" cy="17.5" r="1.8"/>')}<span>Darmowa dostawa do Paczkomatu od 150 zł</span></li>
        <li>${ik('<path d="M20 12a8 8 0 1 1-2.3-5.7"/><path d="M20 4v4h-4"/>')}<a href="${produkt ? '#rytm' : './produkt.html#rytm'}">Dostawa co 2, 4, 6 lub 8 tygodni — jak to działa?</a></li>
      </ul>
    </aside>`;
}

function naglowek({ kat = null, strona = null, produkt = false } = {}) {
  const cur = ' aria-current="page"';
  const podkategorie = (k) => k.produkty
    .filter((p, i, t) => t.findIndex((x) => hrefProduktu(k, x) === hrefProduktu(k, p)) === i)
    .map((p) => `<li><a href="${hrefProduktu(k, p)}"${strona && hrefProduktu(k, p) === strona ? cur : ''}>${p.menu}</a></li>`)
    .join('');
  const ankieta = 'href="./ankieta.html"';
  const mega = `<div class="menu-panel menu-panel--mega"><div class="mega">${KATEGORIE.map((k) => `<div class="mega-kolumna"><h3><a href="./${k.slug}.html">${k.menuSklep || k.menu}</a></h3><ul>${podkategorie(k)}</ul></div>`).join('')}<div class="mega-promo"><b>Nie wiesz, od czego zacząć?</b><span>Kilka pytań o cel i rytm dnia — dobierzemy zestaw w subskrypcji.</span><a ${ankieta}>Dobierz zestaw</a></div></div></div>`;
  const pozycje = [
    `<li class="menu-pozycja menu-pozycja--mega"><a class="menu-link" href="./sklep.html"${kat === 'sklep' ? cur : ''}>Sklep${strzalka}</a>${mega}</li>`,
    ...KATEGORIE.filter((k) => k.naGorze).map((k) => `<li class="menu-pozycja"><a class="menu-link" href="./${k.slug}.html"${k.slug === kat ? cur : ''}>${k.menu}${strzalka}</a><div class="menu-panel"><ul><li><a class="menu-wszystko" href="./${k.slug}.html">Cały dział: ${k.menuSklep || k.menu}</a></li>${podkategorie(k)}</ul></div></li>`),
    ...KATEGORIE.filter((k) => !k.naGorze).map((k) => `<li class="menu-pozycja menu-pozycja--mobilna"><a class="menu-link" href="./${k.slug}.html">${k.menuSklep || k.menu}</a></li>`),
    `<li class="menu-pozycja"><a class="menu-link menu-link--wyprzedaz" href="./wyprzedaz.html"${kat === 'wyprzedaz' ? cur : ''}>Wyprzedaż</a></li>`,
    `<li class="menu-pozycja menu-pozycja--wiedza"><a class="menu-link" href="./strefa-wiedzy.html"${kat === 'wiedza' ? cur : ''}>Strefa Wiedzy${strzalka}</a><div class="menu-panel"><ul><li><a class="menu-wszystko" href="./strefa-wiedzy.html">Cała Strefa Wiedzy</a></li>${ARTYKULY.map((a) => `<li><a href="./${a.slug}.html"${strona === `./${a.slug}.html` ? cur : ''}>${a.menu}</a></li>`).join('')}</ul></div></li>`,
    `<li class="menu-pozycja menu-pozycja--mobilna"><a class="menu-link" ${ankieta}>Dobierz zestaw</a></li>`,
  ];
  const nav = `<nav class="menu" id="menu" aria-label="Menu sklepu"><ul class="menu-lista">${pozycje.join('')}</ul></nav>`;
  const cel = `<a class="naglowek-cel" href="./ankieta.html"${kat === 'ankieta' ? cur : ''}>Dobierz zestaw</a>`;
  const ikony = produkt
    ? `<button class="ikona ikona--szukaj" type="button" aria-label="Szukaj" data-modal="szukaj">${IKONY.szukaj}</button>
          <button class="ikona" type="button" aria-label="Moje konto" data-modal="konto">${IKONY.konto}</button>
          <button class="ikona koszyk-ikona" type="button" id="otworz-koszyk" aria-label="Koszyk, 0 produktów">${IKONY.koszyk}<span class="licznik" id="licznik" hidden>0</span></button>`
    : `<a class="ikona ikona--szukaj" href="./produkt.html#szukaj" aria-label="Szukaj">${IKONY.szukaj}</a>
          <a class="ikona" href="./produkt.html#konto" aria-label="Moje konto">${IKONY.konto}</a>
          <a class="ikona" href="./produkt.html#koszyk" aria-label="Koszyk">${IKONY.koszyk}</a>`;
  const jezyk = `<div class="jezyk">
            <button class="jezyk-przycisk" type="button" aria-expanded="false" aria-label="Język strony: polski">${IKONY.jezyk}<span>PL</span>${strzalka.replace('menu-strzalka', 'menu-strzalka jezyk-strzalka')}</button>
            <div class="jezyk-panel" hidden>
              <button type="button" data-jezyk="pl" aria-pressed="true">Polski</button>
              <button type="button" data-jezyk="en" aria-pressed="false" lang="en">English</button>
              <p class="jezyk-info" role="status" hidden>Wersja angielska jest w przygotowaniu — to sklep pokazowy, więc zostajemy przy polskim.</p>
            </div>
          </div>`;
  return `<header class="naglowek" id="naglowek">
      <div class="naglowek-w">
        ${logo()}
        ${nav}
        ${cel}
        <div class="naglowek-akcje">
          ${ikony}
          ${jezyk}
          <button class="ikona przelacz-menu" type="button" id="przelacz-menu" aria-expanded="false" aria-controls="menu" aria-label="Menu">${IKONY.menu}</button>
        </div>
      </div>
    </header>`;
}

// ------------------------------------------------------------------ obrazki opakowań (SVG, kolor z CSS działu)
function opakowanie(ksztalt, etykieta) {
  const t = (y, rozmiar = 15) => `<text class="k-tekst" x="60" y="${y}" text-anchor="middle" font-size="${etykieta.length > 6 ? rozmiar - 3 : rozmiar}">${etykieta}</text>`;
  const ksztalty = {
    puszka: `<rect class="k-wieczko" x="22" y="14" width="76" height="18" rx="6"/><rect class="k-korpus" x="16" y="28" width="88" height="120" rx="14"/><rect class="k-etykieta" x="24" y="60" width="72" height="56" rx="8"/>${t(93)}`,
    butelka: `<rect class="k-wieczko" x="38" y="10" width="44" height="22" rx="5"/><rect class="k-korpus" x="24" y="30" width="72" height="120" rx="18"/><rect class="k-etykieta" x="30" y="64" width="60" height="52" rx="8"/>${t(95)}`,
    torba: `<rect class="k-wieczko" x="26" y="16" width="68" height="14" rx="3"/><path class="k-korpus" d="M26 28h68l10 120H16z"/><rect class="k-etykieta" x="28" y="66" width="64" height="50" rx="8"/>${t(96)}`,
    baton: `<g transform="rotate(-14 60 80)"><rect class="k-korpus" x="4" y="56" width="112" height="46" rx="10"/><rect class="k-etykieta" x="28" y="64" width="64" height="30" rx="6"/>${t(84, 14)}</g>`,
    pudelko: `<path class="k-wieczko" d="M10 54l14-26h72l14 26z"/><rect class="k-korpus" x="10" y="52" width="100" height="92" rx="10"/><rect class="k-etykieta" x="20" y="76" width="80" height="44" rx="8"/>${t(103, 14)}`,
  };
  return `<svg viewBox="0 0 120 160" aria-hidden="true">${ksztalty[ksztalt]}</svg>`;
}

function kafel(k, p, { zKotwica = true } = {}) {
  // przecena: cena po obniżce, przekreślona regularna i najniższa cena z 30 dni przed obniżką (dyrektywa Omnibus)
  const cena = p.wyprzedaz
    ? `<b class="cena-wyp">${zl(p.cena * (1 - p.wyprzedaz / 100))}</b> <s>${zl(p.cena)}</s><span class="omnibus">Najniższa cena z 30 dni przed obniżką: ${zl(p.cena)}</span>`
    : p.bezSubskrypcji
      ? `<b>${zl(p.cena)}</b> <span>jednorazowo</span>`
      : `<b>${zl(p.cena)}</b> <span>· ${zl(p.cena * 0.85)} w subskrypcji</span>`;
  const tytul = p.link ? `<a href="${p.link}">${p.nazwa}</a>` : p.nazwa;
  const status = p.link?.includes('produkt.html')
    ? '<p class="kafel-status kafel-status--gotowe">Zobacz kartę produktu →</p>'
    : p.link
      ? `<p class="kafel-status kafel-status--gotowe">Zobacz w dziale ${k.menuSklep || k.menu} →</p>`
      : '<p class="kafel-status">Karta produktu w przygotowaniu (sklep pokazowy)</p>';
  const c = CECHY[p.id] || { cele: [], forma: '', dieta: [] };
  const cenaEf = p.wyprzedaz ? p.cena * (1 - p.wyprzedaz / 100) : p.cena;
  const dane = ` data-cele="${c.cele.join(' ')}" data-forma="${c.forma}" data-dieta="${c.dieta.join(' ')}" data-cena="${cenaEf.toFixed(2)}" data-wyprzedaz="${p.wyprzedaz || 0}" data-nazwa="${atrybut(p.nazwa)}"`;
  return `<li class="kafel" data-kat="${k.slug}"${zKotwica ? ` id="${p.id}"` : ''}${dane}>
          <div class="kafel-obraz">${p.wyprzedaz ? `<span class="znaczek-wyp">−${p.wyprzedaz}%</span>` : ''}${opakowanie(p.ksztalt, p.etykieta)}</div>
          <div class="kafel-tresc">
            <h3>${tytul}</h3>
            <p class="kafel-opis">${p.opis}</p>
            <p class="kafel-cena">${cena}</p>
            ${status}
          </div>
        </li>`;
}

function kafelZOdnosnikiem(ref) {
  const [slug, id] = ref.split('#');
  const k = kategoria(slug);
  const p = k.produkty.find((x) => x.id === id);
  // w „polecanych” cały kafel prowadzi do działu (albo do karty produktu, jeśli istnieje)
  return kafel(k, { ...p, link: p.link || `./${k.slug}.html#${p.id}` }, { zKotwica: false });
}

// ------------------------------------------------------------------ pytania (GEO) i dane strukturalne
function pytaniaHTML(pytania, tytul) {
  if (!pytania.length) return '';
  return `<section class="pytania" aria-labelledby="pytania-tytul">
        <h2 id="pytania-tytul">${tytul}</h2>
        <div class="pytania-lista">
          ${pytania.map((p) => `<div class="pytanie"><h3>${p.q}</h3><p>${p.a}</p>${p.ctx ? `<p>${p.ctx}</p>` : ''}</div>`).join('\n          ')}
        </div>
      </section>`;
}

function jsonLd(obiekty) {
  return obiekty.map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n    ');
}
const okruszkiLd = (lista) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: lista.map(([nazwa, url], i) => ({ '@type': 'ListItem', position: i + 1, name: nazwa, item: ADRES + url.replace('./', '') })),
});
const faqLd = (pytania) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: pytania.map((p) => ({ '@type': 'Question', name: p.q, acceptedAnswer: { '@type': 'Answer', text: bezTagow(`${p.a} ${p.ctx || ''}`) } })),
});

// ------------------------------------------------------------------ szkielet strony
const stopka = `<footer class="stopka">
      <div class="stopka-w">
        <div>
          ${logoStopka}
          <p>Bio &amp; Health sp. z o.o. (firma fikcyjna)<br />ul. Przykładowa 1, 00-000 Warszawa<br />NIP 000-000-00-00<br />kontakt@bio-health.example</p>
        </div>
        <div><h2>Sklep</h2><ul><li><a href="./sklep.html">Wszystkie produkty</a></li>${KATEGORIE.filter((k) => k.naGorze).map((k) => `<li><a href="./${k.slug}.html">${k.menu}</a></li>`).join('')}<li><a href="./zestawy.html">Zestawy w subskrypcji</a></li><li><a href="./wyprzedaz.html">Wyprzedaż</a></li></ul></div>
        <div><h2>Strefa Wiedzy</h2><ul>${ARTYKULY.map((a) => `<li><a href="./${a.slug}.html">${a.krotki}</a></li>`).join('')}<li><a href="./strefa-wiedzy.html">Cała Strefa Wiedzy</a></li></ul></div>
        <div><h2>Dokumenty</h2><ul><li><a href="./informacje.html">Informacje o projekcie</a></li><li><button type="button" class="link-cookies" data-cookies>Ustawienia cookies</button></li><li><a href="./produkt.html">Przykładowa karta produktu</a></li></ul></div>
      </div>
      <div class="stopka-dol">
        <span>Projekt studencki: praktyki „Psychologia w e-commerce”, SWPS, 2026.</span>
        <span>Przygotowano z pomocą AI (Claude Code).</span>
      </div>
    </footer>`;

function strona({ title, desc, kat, menuKat = kat, strona: biezaca, ld, tresc }) {
  return `<!doctype html>
<html lang="pl">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <meta name="description" content="${atrybut(desc)}" />
    <!-- Demo nie powinno trafiać do wyszukiwarek jako „prawdziwy sklep”. W prawdziwym sklepie usuwamy noindex. -->
    <meta name="robots" content="noindex" />
    <meta name="referrer" content="strict-origin-when-cross-origin" />
    <meta name="color-scheme" content="light" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="stylesheet" href="/src/sklep.css" />
    <script type="module" src="/src/sklep.js"></script>
    ${ld}
  </head>
  <body data-kat="${kat}">
    <!-- Plik wygenerowany: node narzedzia/generuj-strony.mjs (zmiany wprowadzaj w narzedzia/dane-sklepu.mjs) -->
    <a class="pomin" href="#tresc">Przejdź do treści</a>

    <p class="pasek-demo" role="note">
      <strong>Sklep pokazowy — projekt studencki.</strong>
      Niczego tu nie kupisz i nie zbieramy żadnych danych.
      <a href="./informacje.html">Dowiedz się więcej</a>
    </p>

    ${pasekKorzysci()}
    ${naglowek({ kat: menuKat, strona: biezaca })}

    <main id="tresc">
      ${tresc}
    </main>

    ${stopka}
  </body>
</html>
`;
}

const okruszkiHTML = (lista) => `<nav class="okruszki" aria-label="Jesteś tutaj"><ol>${lista
  .map(([nazwa, url], i) => (i === lista.length - 1 ? `<li aria-current="page">${nazwa}</li>` : `<li><a href="${url}">${nazwa}</a></li>`))
  .join('')}</ol></nav>`;

function kartyPorad(slugi) {
  return `<ul class="karty-porad">${slugi
    .map((s) => {
      const a = artykul(s);
      return `<li class="karta-porady" data-kat="${a.kat}"><span class="etykieta">Strefa Wiedzy · ${a.czas} czytania</span><p class="karta-liczba"><b>${a.liczby[0].w}</b> ${a.liczby[0].o}</p><h3><a href="./${a.slug}.html">${a.h1}</a></h3><p>${a.zajawka}</p><ul class="slowa" aria-label="Słowa kluczowe">${a.slowa.map((w) => `<li>${w}</li>`).join('')}</ul></li>`;
    })
    .join('')}</ul>`;
}

// ------------------------------------------------------------------ strony działów
const zapisane = [];
function zapisz(plik, html) {
  writeFileSync(resolve(KATALOG, plik), html);
  zapisane.push(plik);
}

// ------------------------------------------------------------------ filtry w działach (lewa kolumna)
// Filtrujemy i sortujemy w przeglądarce, bez nowych adresów (np. ?forma=kapsulki): Google nie dostaje wtedy
// dziesiątek prawie takich samych stron (duplikaty treści). Adres działu zostaje jeden.
const NAZWY_CECH = {
  cele: { tytul: 'Cel', wartosci: { redukcja: 'Redukcja', masa: 'Budowa masy', trening: 'Trening', codziennie: 'Na co dzień', rodzina: 'Dla rodziny' } },
  forma: { tytul: 'Forma', wartosci: { proszek: 'Proszek', kapsulki: 'Kapsułki', tabletki: 'Tabletki', plyn: 'Płyn', zelki: 'Żelki', baton: 'Baton', platki: 'Płatki', saszetki: 'Saszetki', zestaw: 'Zestaw' } },
  dieta: { tytul: 'Dieta', wartosci: { weganskie: 'Wegańskie', 'bez-laktozy': 'Bez laktozy' } },
};
const PRZEDZIALY = [['0-30', 'do 30 zł'], ['30-70', '30–70 zł'], ['70-', 'powyżej 70 zł']];
const IKONA_FILTRY = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M7 12h10M10 18h4"/></svg>';
const odmianaProdukt = (n) => (n === 1 ? 'produkt' : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14) ? 'produkty' : 'produktów');

function filtryHTML(k) {
  const cechy = k.produkty.map((p) => ({ p, c: CECHY[p.id] || { cele: [], forma: '', dieta: [] } }));
  const grupy = Object.entries(NAZWY_CECH).map(([pole, { tytul, wartosci }]) => {
    const liczby = {};
    cechy.forEach(({ c }) => [].concat(c[pole]).filter(Boolean).forEach((w) => { liczby[w] = (liczby[w] || 0) + 1; }));
    const klucze = Object.keys(wartosci).filter((w) => liczby[w]);
    if (pole !== 'dieta' && klucze.length < 2) return '';
    if (!klucze.length) return '';
    return `<fieldset class="filtr"><legend>${tytul}</legend>${klucze.map((w) => `<label><input type="checkbox" name="${pole}" value="${w}" /> <span>${wartosci[w]}</span> <small>${liczby[w]}</small></label>`).join('')}</fieldset>`;
  }).join('');
  const ceny = cechy.map(({ p }) => (p.wyprzedaz ? p.cena * (1 - p.wyprzedaz / 100) : p.cena));
  const wPrzedziale = ([od, d]) => ceny.filter((c) => c >= Number(od) && (d === '' || c < Number(d))).length;
  const przedzialy = PRZEDZIALY.map(([w, n]) => [w, n, wPrzedziale(w.split('-'))]).filter(([, , ile]) => ile);
  const cena = przedzialy.length > 1
    ? `<fieldset class="filtr"><legend>Cena</legend><label><input type="radio" name="cena" value="" checked /> <span>Dowolna</span></label>${przedzialy.map(([w, n, ile]) => `<label><input type="radio" name="cena" value="${w}" /> <span>${n}</span> <small>${ile}</small></label>`).join('')}</fieldset>`
    : '';
  const ileWyp = k.produkty.filter((p) => p.wyprzedaz).length;
  const wyprzedaz = ileWyp ? `<fieldset class="filtr"><legend>Oferta</legend><label><input type="checkbox" name="wyprzedaz" value="1" /> <span>Tylko przecenione</span> <small>${ileWyp}</small></label></fieldset>` : '';
  return `<aside class="filtry" id="filtry" aria-label="Filtry produktów">
            <div class="filtry-glowa"><p class="filtry-tytul">Filtry</p><button type="button" class="link-przycisk" data-wyczysc>Wyczyść</button><button type="button" class="ikona filtry-zamknij" aria-label="Zamknij filtry"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>
            <form class="filtry-formularz">${grupy}${cena}${wyprzedaz}</form>
            <button type="button" class="pigulka pigulka--glowna filtry-pokaz">Pokaż produkty</button>
          </aside>`;
}

for (const k of KATEGORIE) {
  const sciezka = [['Strona główna', './'], [k.menu, `./${k.slug}.html`]];
  const tresc = `<section class="dzial-glowa">
        <div class="w">
          ${okruszkiHTML(sciezka)}
          <h1>${k.h1}</h1>
          <p class="lead">${k.lead}</p>
          <ul class="chipy" aria-label="Podkategorie">${k.produkty.map((p) => `<li><a href="#${p.id}">${p.menu}</a></li>`).join('')}</ul>
        </div>
      </section>

      <section class="w produkty" aria-labelledby="produkty-tytul">
        <h2 id="produkty-tytul" class="ukryte">Produkty w dziale ${k.menu}</h2>
        <div class="dzial-uklad" data-filtrowanie>
          ${filtryHTML(k)}
          <div class="dzial-lista">
            <div class="lista-pasek">
              <button class="filtry-otworz" type="button" aria-controls="filtry" aria-expanded="false">${IKONA_FILTRY}Filtry <span class="filtry-licznik" hidden></span></button>
              <p class="lista-liczba" aria-live="polite"><b>${k.produkty.length}</b> ${odmianaProdukt(k.produkty.length)}</p>
              <label class="sortuj">Sortuj
                <select name="sortuj">
                  <option value="polecane">Polecane</option>
                  <option value="cena-rosnaco">Cena: od najniższej</option>
                  <option value="cena-malejaco">Cena: od najwyższej</option>
                  <option value="nazwa">Nazwa: A–Z</option>
                </select>
              </label>
            </div>
            <ul class="siatka">
            ${k.produkty.map((p) => kafel(k, p)).join('\n            ')}
            </ul>
            <p class="lista-pusto" hidden>Żaden produkt nie pasuje do wybranych filtrów. <button type="button" class="link-przycisk" data-wyczysc>Wyczyść filtry</button></p>
            ${k.przypis ? `<p class="przypis">${k.przypis}</p>` : ''}
          </div>
        </div>
      </section>

      ${k.pytania.length ? `<div class="w">${pytaniaHTML(k.pytania, `Najczęstsze pytania: ${k.menu.toLowerCase()}`)}</div>` : ''}

      ${k.porady.length ? `<section class="w poradnik" aria-labelledby="poradnik-tytul"><h2 id="poradnik-tytul">Ze Strefy Wiedzy</h2>${kartyPorad(k.porady)}</section>` : ''}`;
  const ld = jsonLd([okruszkiLd(sciezka), ...(k.pytania.length ? [faqLd(k.pytania)] : [])]);
  zapisz(`${k.slug}.html`, strona({ title: k.title, desc: k.desc, kat: k.slug, strona: `./${k.slug}.html`, ld, tresc }));
}

// ------------------------------------------------------------------ Sklep (wszystkie produkty) i Wyprzedaż
{
  const sciezka = [['Strona główna', './'], ['Sklep', './sklep.html']];
  const tresc = `<section class="dzial-glowa">
        <div class="w">
          ${okruszkiHTML(sciezka)}
          <h1>Suplementy i odżywki</h1>
          <p class="lead">Wszystkie produkty Bio &amp; Health w jednym miejscu: białko, suplementy, witaminy i minerały, przekąski i napoje oraz zestawy w subskrypcji z dostawą co 2–8 tygodni.</p>
          <ul class="chipy" aria-label="Działy">${KATEGORIE.map((k) => `<li><a href="#dzial-${k.slug}">${k.menuSklep || k.menu}</a></li>`).join('')}<li><a href="./wyprzedaz.html">Wyprzedaż</a></li></ul>
        </div>
      </section>
      ${KATEGORIE.map((k) => `<section class="w sklep-dzial" id="dzial-${k.slug}" aria-labelledby="tytul-${k.slug}">
        <div class="sklep-dzial-glowa"><h2 id="tytul-${k.slug}"><a href="./${k.slug}.html">${k.menuSklep || k.menu}</a></h2><a class="cichy-link" href="./${k.slug}.html">Cały dział →</a></div>
        <ul class="siatka">
        ${k.produkty.map((p) => kafel(k, { ...p, link: p.link || `./${k.slug}.html#${p.id}` }, { zKotwica: false })).join('\n        ')}
        </ul>
      </section>`).join('\n      ')}`;
  zapisz('sklep.html', strona({
    title: 'Sklep: suplementy i odżywki w subskrypcji — Bio & Health (sklep pokazowy)',
    desc: 'Wszystkie produkty Bio & Health: białko, kreatyna i inne suplementy, witaminy i minerały, przekąski i zestawy w subskrypcji. Sklep pokazowy, projekt studencki.',
    kat: 'sklep', strona: './sklep.html', ld: jsonLd([okruszkiLd(sciezka)]), tresc,
  }));
}
{
  const sciezka = [['Strona główna', './'], ['Wyprzedaż', './wyprzedaz.html']];
  const przecenione = KATEGORIE.flatMap((k) => k.produkty.filter((p) => p.wyprzedaz).map((p) => kafel(k, { ...p, link: p.link || `./${k.slug}.html#${p.id}` }, { zKotwica: false })));
  const tresc = `<section class="dzial-glowa">
        <div class="w">
          ${okruszkiHTML(sciezka)}
          <h1>Wyprzedaż</h1>
          <p class="lead">Przecenione suplementy i przekąski. Przy każdej obniżce podajemy najniższą cenę z 30 dni przed obniżką — tak, jak wymaga prawo.</p>
        </div>
      </section>
      <section class="w produkty" aria-label="Przecenione produkty">
        <ul class="siatka">
        ${przecenione.join('\n        ')}
        </ul>
        <p class="przypis">Ceny przykładowe (sklep pokazowy). Obniżka dotyczy zakupu jednorazowego; w subskrypcji obowiązuje stały rabat 15%.</p>
      </section>`;
  zapisz('wyprzedaz.html', strona({
    title: 'Wyprzedaż: przecenione suplementy i przekąski — Bio & Health (sklep pokazowy)',
    desc: 'Wyprzedaż Bio & Health: przecenione suplementy i przekąski z podaną najniższą ceną z 30 dni przed obniżką. Sklep pokazowy, projekt studencki.',
    kat: 'wyprzedaz', strona: './wyprzedaz.html', ld: jsonLd([okruszkiLd(sciezka)]), tresc,
  }));
}

// ------------------------------------------------------------------ Dobierz zestaw (strona ankiety — w przygotowaniu)
// Pytań nie wymyślamy: opracowujemy je razem z grupą (CLAUDE.md, zasada 2). Tematy z ZGODNOSC-Z-PRAWEM.md, punkt 10.
{
  const sciezka = [['Strona główna', './'], ['Dobierz zestaw', './ankieta.html']];
  const TEMATY = [
    ['Twój cel', 'redukcja, budowa masy albo regularny trening'],
    ['Rytm dnia', 'jak często trenujesz i ile masz czasu na posiłki'],
    ['Forma i smak', 'proszek czy kapsułki, ulubione smaki'],
    ['Czego unikasz', 'np. laktozy albo glutenu — bez pytania o powód'],
    ['Budżet', 'ile chcesz wydawać na jedną dostawę'],
  ];
  const tresc = `<section class="dzial-glowa">
        <div class="w">
          ${okruszkiHTML(sciezka)}
          <h1>Dobierz zestaw</h1>
          <p class="lead">Kilka krótkich pytań, a my dobierzemy zestaw suplementów w subskrypcji do Twojego celu — z wyjaśnieniem, dlaczego właśnie taki.</p>
        </div>
      </section>
      <section class="w ankieta" aria-labelledby="ankieta-status">
        <div class="ankieta-status" role="status">
          <span class="ankieta-znaczek">W przygotowaniu</span>
          <h2 id="ankieta-status">Ankiety jeszcze nie ma</h2>
          <p>Pytania i sposób doboru opracowujemy razem z zespołem projektu. Do tego czasu zobacz gotowe zestawy albo zajrzyj do Strefy Wiedzy.</p>
          <div class="ankieta-przyciski"><a class="pigulka pigulka--glowna" href="./zestawy.html">Zobacz gotowe zestawy</a><a class="pigulka pigulka--obrys" href="./strefa-wiedzy.html">Strefa Wiedzy</a></div>
        </div>
        <h2 class="ankieta-tytul">O co zapyta ankieta</h2>
        <ol class="ankieta-tematy">${TEMATY.map(([t, o]) => `<li><b>${t}</b><span>${o}</span></li>`).join('')}</ol>
        <p class="przypis"><b>Nie zapytamy o zdrowie, choroby ani leki.</b> Rekomendacja będzie miała charakter informacyjny i nie jest poradą medyczną. W ciąży, w trakcie leczenia albo przyjmując leki skonsultuj suplementację z lekarzem.</p>
      </section>`;
  zapisz('ankieta.html', strona({
    title: 'Dobierz zestaw suplementów do celu — ankieta — Bio & Health (sklep pokazowy)',
    desc: 'Ankieta Bio & Health dobierze zestaw suplementów w subskrypcji do Twojego celu: redukcji, budowy masy albo regularnego treningu. Sklep pokazowy, projekt studencki.',
    kat: 'ankieta', strona: './ankieta.html', ld: jsonLd([okruszkiLd(sciezka)]), tresc,
  }));
}

// ------------------------------------------------------------------ strefa wiedzy: elementy wizualne
const ikony = {
  kurczak: '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M38 8c9 0 17 7 17 17 0 9-6 15-14 17l-9 2-10 10a5 5 0 1 1-7-1 5 5 0 1 1-1-7l10-10 2-9C28 15 30 8 38 8z"/></svg>',
  skyr: '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M14 20h36l-4 34a4 4 0 0 1-4 4H22a4 4 0 0 1-4-4z"/><rect x="11" y="10" width="42" height="9" rx="3"/></svg>',
  jajka: '<svg viewBox="0 0 64 64" aria-hidden="true"><ellipse cx="23" cy="36" rx="13" ry="17"/><ellipse cx="42" cy="39" rx="12" ry="15"/></svg>',
  tofu: '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M8 24 32 13l24 11v20L32 55 8 44z"/><path class="ik-linia" d="M8 24l24 11 24-11M32 35v20"/></svg>',
  shake: '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M19 21h26l-3 35H22z"/><rect x="17" y="11" width="30" height="10" rx="3"/><rect x="29" y="4" width="6" height="8" rx="2"/></svg>',
  slonce: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="5"/><path class="ik-linia" d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3M4.6 4.6l2.1 2.1M17.3 17.3l2.1 2.1M4.6 19.4l2.1-2.1M17.3 6.7l2.1-2.1"/></svg>',
  kapsula: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="8" width="18" height="8" rx="4" transform="rotate(-35 12 12)"/><path class="ik-linia" d="M9.7 8.7l4.6 6.6" /></svg>',
};

const ZRODLA_BIALKA = [
  ['kurczak', '150 g surowej piersi z kurczaka', 'ok. 30–35 g'],
  ['skyr', '250 g skyru', 'ok. 25 g'],
  ['jajka', '3 jajka i 2 plastry chudej szynki', 'ok. 25 g'],
  ['tofu', '200 g tofu', 'ok. 25–30 g'],
  ['shake', 'miarka białka WPC 80 (30 g) z wodą', '22,5 g', './produkt.html'],
];
const zrodlaBialka = () => `<ul class="zrodla-bialka">${ZRODLA_BIALKA.map(([ik, opis, g, link]) => `<li class="zb${link ? ' zb--link' : ''}" data-kat="bialko">${ikony[ik]}<b>${g}</b><span>${link ? `<a href="${link}">${opis}</a>` : opis}</span>${link ? '<small aria-hidden="true">Zobacz produkt →</small>' : ''}</li>`).join('')}</ul>`;

// kalkulator białka — w HTML od razu wynik dla 70 kg i redukcji (strona czytelna bez JavaScriptu), przeliczanie: src/sklep.js
const kalkulator = () => `<section class="kalkulator" id="kalkulator" aria-labelledby="kalk-tytul" data-kat="bialko">
  <h3 id="kalk-tytul">Policz swoje białko</h3>
  <form class="kalk-formularz" id="kalk-formularz" novalidate>
    <label class="kalk-etykieta" for="kalk-masa">Masa ciała: <output id="kalk-masa-wynik" for="kalk-masa">70 kg</output></label>
    <input type="range" id="kalk-masa" name="masa" min="40" max="140" step="1" value="70" />
    <fieldset class="kalk-cele">
      <legend class="kalk-etykieta">Twoja sytuacja</legend>
      <label><input type="radio" name="cel" value="0.83" /> <span>Nie trenuję</span></label>
      <label><input type="radio" name="cel" value="1.4-2.0" /> <span>Trenuję</span></label>
      <label><input type="radio" name="cel" value="2.0" checked /> <span>Trenuję i jestem na redukcji</span></label>
    </fieldset>
  </form>
  <div class="kalk-wynik" aria-live="polite">
    <p class="kalk-liczba"><b id="kalk-gramy">140 g</b> białka dziennie</p>
    <p id="kalk-opis">To np. 5 posiłków po ok. 30 g. Jedna miarka WPC 80 to 22,5 g białka.</p>
    <a class="pigulka pigulka--glowna" href="./produkt.html">Zobacz białko WPC 80</a>
  </div>
  <p class="kalk-zrodlo">Wyliczenie: EFSA 2012 (0,83 g/kg), ISSN 2017 (trenujący 1,4–2,0 g/kg; na redukcji liczymy górną granicę 2,0 g/kg). Kalkulator liczy w przeglądarce — niczego nie wysyłamy.</p>
</section>`;

function wykresNasycenie() {
  const x = (d) => 70 + d * (530 / 30);
  const dni = [0, 7, 14, 21, 28];
  return `<figure class="wykres" data-kat="kreatyna">
  <svg viewBox="0 0 640 330" role="img" aria-labelledby="wykres-nas-tytul">
    <title id="wykres-nas-tytul">Wykres: pełne nasycenie mięśni kreatyną po ok. 6 dniach z fazą nasycenia albo po ok. 28 dniach przy 3 g dziennie</title>
    <line class="w-siatka" x1="70" y1="70" x2="600" y2="70"/><line class="w-siatka" x1="70" y1="250" x2="600" y2="250"/>
    <text class="w-opis" x="70" y="58">pełne nasycenie (ok. +20% kreatyny w mięśniach)</text>
    <text class="w-opis" x="70" y="272">poziom wyjściowy</text>
    ${dni.map((d) => `<text class="w-os" x="${x(d)}" y="304" text-anchor="middle">${d === 0 ? 'start' : `${d}. dzień`}</text>`).join('')}
    <path class="w-linia w-linia--b" d="M70 250 C 260 160, 430 82, ${x(28)} 70 L 600 70"/>
    <path class="w-linia w-linia--a" d="M70 250 C 100 120, 125 76, ${x(6)} 70 L 600 70"/>
    <circle class="w-kropka w-kropka--a" cx="${x(6)}" cy="70" r="7"/><text class="w-etykieta w-etykieta--a" x="${x(6)}" y="104" text-anchor="middle">ok. 6 dni</text>
    <circle class="w-kropka w-kropka--b" cx="${x(28)}" cy="70" r="7"/><text class="w-etykieta w-etykieta--b" x="${x(28)}" y="104" text-anchor="middle">ok. 28 dni</text>
  </svg>
  <figcaption><span class="legendy"><span class="leg leg--a">ok. 20 g dziennie przez 6 dni, potem 3–5 g</span><span class="leg leg--b">3 g dziennie od pierwszego dnia</span></span>Schemat uproszczony na podstawie: Hultman i in. (1996). Oba sposoby kończą się tym samym nasyceniem mięśni.</figcaption>
</figure>`;
}

function wykresMiesiace() {
  const m = ['sty', 'lut', 'mar', 'kwi', 'maj', 'cze', 'lip', 'sie', 'wrz', 'paź', 'lis', 'gru'];
  return `<figure class="miesiace" data-kat="witaminy">
  <ol aria-label="Miesiące roku">${m.map((n, i) => {
    const lato = i >= 4 && i <= 8;
    return `<li class="${lato ? 'm-slonce' : 'm-kapsula'}"><span class="m-ikona">${lato ? ikony.slonce : ikony.kapsula}</span><span class="m-nazwa">${n}</span><span class="ukryte">${lato ? ': słońce może wystarczyć' : ': witamina D3 z suplementu'}</span></li>`;
  }).join('')}</ol>
  <figcaption><span class="legendy"><span class="leg leg--slonce">słońce może wystarczyć*</span><span class="leg leg--kapsula">witamina D3 z suplementu</span></span>* Od maja do września tylko przy 30–45 min na słońcu dziennie (10:00–15:00, odsłonięte przedramiona i nogi, bez filtra). Jeśli tak nie jest — suplementuj przez cały rok (wytyczne 2023).</figcaption>
</figure>`;
}

function produktWTekscie(ref) {
  const [slug, id] = ref.split('#');
  const k = kategoria(slug);
  const p = k.produkty.find((x) => x.id === id);
  const href = hrefProduktu(k, p);
  return `<aside class="produkt-wtekscie" data-kat="${k.slug}" aria-label="Produkt z artykułu">
  <div class="pw-obraz">${opakowanie(p.ksztalt, p.etykieta)}</div>
  <div class="pw-tresc"><span class="pw-etykieta">Z tego artykułu</span><p class="pw-nazwa">${p.nazwa}</p><p class="pw-opis">${p.opis}</p><p class="pw-cena"><b>${zl(p.cena)}</b> · ${zl(p.cena * 0.85)} w subskrypcji</p></div>
  <a class="pigulka pigulka--glowna" href="${href}">${p.link ? 'Zobacz produkt' : `Zobacz w dziale ${k.menu}`}</a>
</aside>`;
}

function miniProdukt(ref) {
  const [slug, id] = ref.split('#');
  const k = kategoria(slug);
  const p = k.produkty.find((x) => x.id === id);
  return `<li><a href="${hrefProduktu(k, p)}" data-kat="${k.slug}"><span class="mini-obraz">${opakowanie(p.ksztalt, p.etykieta)}</span><span class="mini-tekst"><b>${p.nazwa}</b><small>${zl(p.cena)} · subskrypcja ${zl(p.cena * 0.85)}</small></span></a></li>`;
}

const liczbyHTML = (liczby) => `<ul class="liczby">${liczby.map((l) => `<li><b>${l.w}</b><span>${l.o}</span></li>`).join('')}</ul>`;

const naId = (t) => bezTagow(t).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ł/g, 'l').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
// nagłówki-pytania dostają id, żeby spis treści mógł do nich prowadzić
const zIdNaglowkow = (html) => html.replace(/<h2>([\s\S]*?)<\/h2>/g, (_, t) => `<h2 id="${naId(t)}">${t}</h2>`);
const naglowkiArtykulu = (a) => [...a.tresc.matchAll(/<h2>([\s\S]*?)<\/h2>/g)].map((m) => [naId(m[1]), bezTagow(m[1])])
  .concat(a.pytania.length ? [['pytania-tytul', 'Pytania i odpowiedzi']] : [], [['zrodla-tytul', 'Źródła']]);
function spisTresci(a) {
  const lista = `<ol>${naglowkiArtykulu(a).map(([id, t]) => `<li><a href="#${id}">${t}</a></li>`).join('')}</ol>`;
  const inne = ARTYKULY.filter((x) => x.slug !== a.slug);
  return {
    boczny: `<nav class="spis" aria-label="Spis treści i inne artykuły">
          <p class="spis-tytul">W tym artykule</p>
          ${lista}
          <p class="spis-tytul">Inne artykuły</p>
          <ul class="spis-inne">${inne.map((x) => `<li><a href="./${x.slug}.html">${x.menu}</a></li>`).join('')}<li><a href="./strefa-wiedzy.html">Cała Strefa Wiedzy →</a></li></ul>
        </nav>`,
    mobilny: `<details class="spis-mobilny"><summary>Spis treści</summary>${lista}</details>`,
  };
}

const wypelnij = (html) =>
  html
    .replace('<!--KALKULATOR-->', kalkulator())
    .replace('<!--ZRODLA_BIALKA-->', zrodlaBialka())
    .replace('<!--WYKRES:nasycenie-->', wykresNasycenie())
    .replace('<!--WYKRES:miesiace-->', wykresMiesiace())
    .replace(/<!--PRODUKT:([a-z0-9-]+#[a-z0-9-]+)-->/g, (_, ref) => produktWTekscie(ref));

// ------------------------------------------------------------------ strefa wiedzy: lista
{
  const sciezka = [['Strona główna', './'], ['Strefa Wiedzy', './strefa-wiedzy.html']];
  const tresc = `<section class="dzial-glowa">
        <div class="w">
          ${okruszkiHTML(sciezka)}
          <h1>Strefa Wiedzy</h1>
          <p class="lead">Prosto i z liczbami: ile białka jeść, jak brać kreatynę, ile witaminy D3 zimą. Każdy artykuł ma źródła, a podkreślone słowa prowadzą prosto do produktu, o którym czytasz.</p>
        </div>
      </section>
      <section class="w porady-lista" aria-label="Artykuły">${kartyPorad(ARTYKULY.map((a) => a.slug))}</section>`;
  zapisz(
    'strefa-wiedzy.html',
    strona({
      title: 'Strefa Wiedzy: białko, kreatyna, witamina D3 — Bio & Health (sklep pokazowy)',
      desc: 'Strefa Wiedzy Bio & Health: ile białka na redukcji, jak brać kreatynę, ile witaminy D3 zimą. Kalkulator, liczby i źródła. Sklep pokazowy, projekt studencki.',
      kat: 'wiedza',
      strona: './strefa-wiedzy.html',
      ld: jsonLd([okruszkiLd(sciezka)]),
      tresc,
    }),
  );
}

// ------------------------------------------------------------------ strefa wiedzy: artykuły
for (const a of ARTYKULY) {
  const sciezka = [['Strona główna', './'], ['Strefa Wiedzy', './strefa-wiedzy.html'], [a.krotki, `./${a.slug}.html`]];
  const spis = spisTresci(a);
  const tresc = `<section class="artykul-glowa" data-kat="${a.kat}">
        <div class="w">
          ${okruszkiHTML(sciezka)}
          <h1>${a.h1}</h1>
          <p class="artykul-meta">Strefa Wiedzy · aktualizacja 26 listopada 2026 · ${a.czas} czytania</p>
        </div>
      </section>

      <div class="artykul-uklad">
        ${spis.boczny}
        <article class="artykul" aria-labelledby="artykul-tytul">
          <h2 id="artykul-tytul" class="ukryte">${a.h1}</h2>
          <div class="w-skrocie" role="note"><h2>W skrócie</h2><p>${a.skrot}</p>${liczbyHTML(a.liczby)}</div>
          ${spis.mobilny}
          ${wypelnij(zIdNaglowkow(a.tresc.trim()))}
          ${pytaniaHTML(a.pytania, 'Pytania i odpowiedzi')}
          <section class="zrodla" aria-labelledby="zrodla-tytul">
            <h2 id="zrodla-tytul">Źródła</h2>
            <ol>${a.zrodla.map((z) => `<li>${z}</li>`).join('')}</ol>
          </section>
          <p class="autor">Opracowanie: zespół Bio &amp; Health (projekt studencki) na podstawie źródeł powyżej. Tekst przygotowany z pomocą AI (Claude Code). Artykuł nie zastępuje porady lekarza ani dietetyka.</p>
        </article>
        <aside class="boczny" aria-label="Produkty z artykułu">
          <p class="boczny-tytul">Produkty z artykułu</p>
          <ul>${a.polecane.map(miniProdukt).join('')}</ul>
          <a class="boczny-link" href="./strefa-wiedzy.html">← Cała Strefa Wiedzy</a>
        </aside>
      </div>

      <section class="w polecane polecane--dol" aria-labelledby="polecane-tytul">
        <h2 id="polecane-tytul">Produkty z artykułu</h2>
        <ul class="siatka">
        ${a.polecane.map(kafelZOdnosnikiem).join('\n        ')}
        </ul>
      </section>`;
  const ld = jsonLd([
    okruszkiLd(sciezka),
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: a.h1,
      description: a.desc,
      dateModified: '2026-11-26',
      inLanguage: 'pl',
      author: { '@type': 'Organization', name: 'Bio & Health (projekt studencki)' },
    },
    faqLd(a.pytania),
  ]);
  zapisz(`${a.slug}.html`, strona({ title: a.title, desc: a.desc, kat: a.kat, menuKat: 'wiedza', strona: `./${a.slug}.html`, ld, tresc }));
}

// ------------------------------------------------------------------ nagłówek w istniejących stronach
for (const [plik, opcje] of [['index.html', {}], ['informacje.html', {}], ['produkt.html', { kat: 'bialko', strona: './produkt.html', produkt: true }]]) {
  const sciezka = resolve(KATALOG, plik);
  const html = readFileSync(sciezka, 'utf8');
  const wzor = /<!-- NAGLOWEK:START -->[\s\S]*?<!-- NAGLOWEK:END -->/;
  if (!wzor.test(html)) {
    console.warn(`Pominięto ${plik}: brak znaczników <!-- NAGLOWEK:START --> / <!-- NAGLOWEK:END -->`);
    continue;
  }
  writeFileSync(sciezka, html.replace(wzor, `<!-- NAGLOWEK:START -->\n    ${pasekKorzysci(opcje)}\n    ${naglowek(opcje)}\n    <!-- NAGLOWEK:END -->`));
  zapisane.push(`${plik} (nagłówek)`);
}

// ------------------------------------------------------------------ dane strukturalne karty produktu (ścieżka + pytania z sekcji „Pytania i odpowiedzi”)
{
  const sciezka = resolve(KATALOG, 'produkt.html');
  const html = readFileSync(sciezka, 'utf8');
  const sekcja = html.match(/<section class="sekcja pytania"[\s\S]*?<\/section>/)?.[0] || '';
  const pytania = [...sekcja.matchAll(/<summary>([\s\S]*?)<\/summary><p>([\s\S]*?)<\/p>/g)].map((m) => ({ q: bezTagow(m[1]), a: bezTagow(m[2]) }));
  const ld = jsonLd([okruszkiLd([['Strona główna', './'], ['Białko', './bialko.html'], ['Białko serwatkowe WPC 80', './produkt.html']]), faqLd(pytania)]);
  writeFileSync(sciezka, html.replace(/<!-- LD:START -->[\s\S]*?<!-- LD:END -->/, `<!-- LD:START -->${ld}<!-- LD:END -->`));
  zapisane.push(`produkt.html (dane strukturalne: ${pytania.length} pytań)`);
}

console.log('Zapisano:\n  ' + zapisane.join('\n  '));
