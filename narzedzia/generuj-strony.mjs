// Generuje działy sklepu, poradnik i wspólne menu z jednego zestawu danych (narzedzia/dane-sklepu.mjs).
// Uruchom z katalogu projektu:  node narzedzia/generuj-strony.mjs
// Strony są zwykłym HTML (bez JavaScriptu do treści), żeby czytały je wyszukiwarki i asystenci AI.
// Menu wstawiamy też do index.html i produkt.html — między znaczniki <!-- MENU:START --> i <!-- MENU:END -->.

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { ADRES, KATEGORIE, ARTYKULY } from './dane-sklepu.mjs';

const KATALOG = resolve(import.meta.dirname, '..');
const zl = (n) => n.toFixed(2).replace('.', ',') + ' zł';
const bezTagow = (s) => s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const atrybut = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
const kategoria = (slug) => KATEGORIE.find((k) => k.slug === slug);
const artykul = (slug) => ARTYKULY.find((a) => a.slug === slug);
const hrefProduktu = (k, p) => p.link || `./${k.slug}.html#${p.id}`;

// ------------------------------------------------------------------ menu
const strzalka = '<svg class="menu-strzalka" viewBox="0 0 12 12" aria-hidden="true"><path d="m3 4.5 3 3 3-3"/></svg>';

function menu({ kat = null, strona = null } = {}) {
  const pozycje = KATEGORIE.map((k) => {
    const biezacy = k.slug === kat ? ' aria-current="page"' : '';
    const linki = [
      `<li><a class="menu-wszystko" href="./${k.slug}.html">${k.slug === 'zestawy' ? 'Wszystkie zestawy' : `Cały dział: ${k.menu}`}</a></li>`,
      ...k.produkty
        .filter((p, i, t) => t.findIndex((x) => hrefProduktu(k, x) === hrefProduktu(k, p)) === i)
        .map((p) => `<li><a href="${hrefProduktu(k, p)}"${strona && hrefProduktu(k, p) === strona ? ' aria-current="page"' : ''}>${p.menu}</a></li>`),
    ];
    return `<li class="menu-pozycja"><a class="menu-link" href="./${k.slug}.html"${biezacy}>${k.menu}${strzalka}</a><div class="menu-panel"><ul>${linki.join('')}</ul></div></li>`;
  });
  const porady = [
    `<li><a class="menu-wszystko" href="./strefa-wiedzy.html">Cała Strefa wiedzy</a></li>`,
    ...ARTYKULY.map((a) => `<li><a href="./${a.slug}.html"${strona === `./${a.slug}.html` ? ' aria-current="page"' : ''}>${a.menu}</a></li>`),
  ];
  pozycje.push(`<li class="menu-pozycja"><a class="menu-link" href="./strefa-wiedzy.html"${kat === 'wiedza' ? ' aria-current="page"' : ''}>Strefa wiedzy${strzalka}</a><div class="menu-panel"><ul>${porady.join('')}</ul></div></li>`);
  return `<nav class="menu" id="menu" aria-label="Kategorie sklepu"><ul class="menu-lista">${pozycje.join('')}</ul></nav>`;
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
  const cena = p.bezSubskrypcji
    ? `<b>${zl(p.cena)}</b> <span>jednorazowo</span>`
    : `<b>${zl(p.cena)}</b> <span>· ${zl(p.cena * 0.85)} w subskrypcji</span>`;
  const tytul = p.link ? `<a href="${p.link}">${p.nazwa}</a>` : p.nazwa;
  const status = p.link
    ? '<p class="kafel-status kafel-status--gotowe">Zobacz kartę produktu →</p>'
    : '<p class="kafel-status">Karta produktu w przygotowaniu (sklep pokazowy)</p>';
  return `<li class="kafel" data-kat="${k.slug}"${zKotwica ? ` id="${p.id}"` : ''}>
          <div class="kafel-obraz">${opakowanie(p.ksztalt, p.etykieta)}</div>
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
          <p class="logo logo--stopka">Bio<span>&amp;</span>Health</p>
          <p>Bio &amp; Health sp. z o.o. (firma fikcyjna)<br />ul. Przykładowa 1, 00-000 Warszawa<br />NIP 000-000-00-00<br />kontakt@bio-health.example</p>
        </div>
        <div><h2>Sklep</h2><ul>${KATEGORIE.slice(0, 4).map((k) => `<li><a href="./${k.slug}.html">${k.menu}</a></li>`).join('')}<li><a href="./zestawy.html">Zestawy w subskrypcji</a></li></ul></div>
        <div><h2>Strefa wiedzy</h2><ul>${ARTYKULY.map((a) => `<li><a href="./${a.slug}.html">${a.krotki}</a></li>`).join('')}<li><a href="./strefa-wiedzy.html">Cała Strefa wiedzy</a></li></ul></div>
        <div><h2>Dokumenty</h2><ul><li><a href="./informacje.html">Informacje o projekcie</a></li><li><a href="./produkt.html">Przykładowa karta produktu</a></li></ul></div>
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

    <header class="naglowek" id="naglowek">
      <div class="naglowek-w">
        <a class="logo" href="./" aria-label="Bio &amp; Health — strona główna">Bio<span>&amp;</span>Health</a>
        <!-- MENU:START -->${menu({ kat: menuKat, strona: biezaca })}<!-- MENU:END -->
        <div class="naglowek-akcje">
          <a class="pigulka pigulka--obrys naglowek-pigulka" href="./zestawy.html">Dobierz zestaw</a>
          <button class="ikona przelacz-menu" type="button" id="przelacz-menu" aria-expanded="false" aria-controls="menu" aria-label="Menu">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h16M4 16h16"/></svg>
          </button>
        </div>
      </div>
    </header>

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
      return `<li class="karta-porady" data-kat="${a.kat}"><span class="etykieta">Strefa wiedzy · ${a.czas} czytania</span><p class="karta-liczba"><b>${a.liczby[0].w}</b> ${a.liczby[0].o}</p><h3><a href="./${a.slug}.html">${a.h1}</a></h3><p>${a.zajawka}</p><ul class="slowa" aria-label="Słowa kluczowe">${a.slowa.map((w) => `<li>${w}</li>`).join('')}</ul></li>`;
    })
    .join('')}</ul>`;
}

// ------------------------------------------------------------------ strony działów
const zapisane = [];
function zapisz(plik, html) {
  writeFileSync(resolve(KATALOG, plik), html);
  zapisane.push(plik);
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
        <ul class="siatka">
        ${k.produkty.map((p) => kafel(k, p)).join('\n        ')}
        </ul>
        ${k.przypis ? `<p class="przypis">${k.przypis}</p>` : ''}
      </section>

      ${k.pytania.length ? `<div class="w">${pytaniaHTML(k.pytania, `Najczęstsze pytania: ${k.menu.toLowerCase()}`)}</div>` : ''}

      ${k.porady.length ? `<section class="w poradnik" aria-labelledby="poradnik-tytul"><h2 id="poradnik-tytul">Ze Strefy wiedzy</h2>${kartyPorad(k.porady)}</section>` : ''}`;
  const ld = jsonLd([okruszkiLd(sciezka), ...(k.pytania.length ? [faqLd(k.pytania)] : [])]);
  zapisz(`${k.slug}.html`, strona({ title: k.title, desc: k.desc, kat: k.slug, strona: `./${k.slug}.html`, ld, tresc }));
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

const wypelnij = (html) =>
  html
    .replace('<!--KALKULATOR-->', kalkulator())
    .replace('<!--ZRODLA_BIALKA-->', zrodlaBialka())
    .replace('<!--WYKRES:nasycenie-->', wykresNasycenie())
    .replace('<!--WYKRES:miesiace-->', wykresMiesiace())
    .replace(/<!--PRODUKT:([a-z0-9-]+#[a-z0-9-]+)-->/g, (_, ref) => produktWTekscie(ref));

// ------------------------------------------------------------------ strefa wiedzy: lista
{
  const sciezka = [['Strona główna', './'], ['Strefa wiedzy', './strefa-wiedzy.html']];
  const tresc = `<section class="dzial-glowa">
        <div class="w">
          ${okruszkiHTML(sciezka)}
          <h1>Strefa wiedzy</h1>
          <p class="lead">Prosto i z liczbami: ile białka jeść, jak brać kreatynę, ile witaminy D3 zimą. Każdy artykuł ma źródła, a podkreślone słowa prowadzą prosto do produktu, o którym czytasz.</p>
        </div>
      </section>
      <section class="w porady-lista" aria-label="Artykuły">${kartyPorad(ARTYKULY.map((a) => a.slug))}</section>`;
  zapisz(
    'strefa-wiedzy.html',
    strona({
      title: 'Strefa wiedzy: białko, kreatyna, witamina D3 — Bio & Health (sklep pokazowy)',
      desc: 'Strefa wiedzy Bio & Health: ile białka na redukcji, jak brać kreatynę, ile witaminy D3 zimą. Kalkulator, liczby i źródła. Sklep pokazowy, projekt studencki.',
      kat: 'wiedza',
      strona: './strefa-wiedzy.html',
      ld: jsonLd([okruszkiLd(sciezka)]),
      tresc,
    }),
  );
}

// ------------------------------------------------------------------ strefa wiedzy: artykuły
for (const a of ARTYKULY) {
  const sciezka = [['Strona główna', './'], ['Strefa wiedzy', './strefa-wiedzy.html'], [a.krotki, `./${a.slug}.html`]];
  const tresc = `<section class="artykul-glowa" data-kat="${a.kat}">
        <div class="w">
          ${okruszkiHTML(sciezka)}
          <h1>${a.h1}</h1>
          <p class="artykul-meta">Strefa wiedzy · aktualizacja 26 listopada 2026 · ${a.czas} czytania</p>
        </div>
      </section>

      <div class="artykul-uklad">
        <article class="artykul" aria-labelledby="artykul-tytul">
          <h2 id="artykul-tytul" class="ukryte">${a.h1}</h2>
          <div class="w-skrocie" role="note"><h2>W skrócie</h2><p>${a.skrot}</p>${liczbyHTML(a.liczby)}</div>
          ${wypelnij(a.tresc.trim())}
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
          <a class="boczny-link" href="./strefa-wiedzy.html">← Cała Strefa wiedzy</a>
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

// ------------------------------------------------------------------ menu w istniejących stronach
for (const [plik, opcje] of [['index.html', {}], ['produkt.html', { kat: 'bialko', strona: './produkt.html' }]]) {
  const sciezka = resolve(KATALOG, plik);
  const html = readFileSync(sciezka, 'utf8');
  const wzor = /<!-- MENU:START -->[\s\S]*?<!-- MENU:END -->/;
  if (!wzor.test(html)) {
    console.warn(`Pominięto ${plik}: brak znaczników <!-- MENU:START --> / <!-- MENU:END -->`);
    continue;
  }
  writeFileSync(sciezka, html.replace(wzor, `<!-- MENU:START -->${menu(opcje)}<!-- MENU:END -->`));
  zapisane.push(`${plik} (menu)`);
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
