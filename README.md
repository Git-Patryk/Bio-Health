# Bio & Health — sklep pokazowy (projekt studencki)

Pokazowa strona sklepu z **suplementami i odżywkami w subskrypcji**, z animacjami 3D.
Projekt na praktyki „Psychologia w e-commerce” (SWPS, zima 2026).
**To nie jest prawdziwy sklep:** nic tu nie można kupić, a strona nie zbiera żadnych danych.
Wersja pokazowa jest dostępna pod adresem **https://git-patryk.github.io/Bio-Health/** (GitHub Pages, bez indeksowania w wyszukiwarkach).
Ma wyglądać i działać jak kompletny, zgodny z prawem sklep: rejestracja, logowanie, zamówienie,
zgody, dokumenty i działająca ankieta. Formularze działają jednak tylko w przeglądarce i niczego nie wysyłają.

> Status (13.11.2026, koniec dnia): **strona produktu + prezentacja BC5.** Działa strona startowa z kapsułką 3D,
> „Informacje i prywatność”, klikalna strona produktu ([produkt.html](produkt.html)) i animowana prezentacja
> makiet ([prezentacja.html](prezentacja.html): teoria ze źródłami, analiza konkurencji, makieta lo-fi przechodząca w hi-fi). Kierunek wyglądu: [docs/DESIGN.md](docs/DESIGN.md).
> Co dokładnie ma zawierać strona i dlaczego to legalne: **[ZGODNOSC-Z-PRAWEM.md](ZGODNOSC-Z-PRAWEM.md)**.

## Najważniejsze wnioski z researchu

1. **Strona pokazuje pełny sklep, ale bez wysyłania danych.** Wszystkie formularze, zgody i dokumenty są na miejscu, a działają tylko w przeglądarce. Hasła nie są nigdzie zapisywane. Gdyby kiedyś trzeba było pokazać stronę z linku: GitHub Pages zabrania prawdziwych sklepów, ale wersja pokazowa jest w porządku.
2. **Bez cookies i zewnętrznych skryptów nie ma baneru zgody.** Fonty i biblioteki trzymamy lokalnie, bez Google Fonts i bez Google Analytics.
3. **Treści o suplementach:** tylko oświadczenia zdrowotne z rejestru UE, nigdy „leczy” ani „zapobiega”. Dotyczy to także demo.
4. **Ankieta „dobierz zestaw”** pyta o cel (redukcja, masa, trening), **nie o zdrowie**. Dane o zdrowiu to szczególna kategoria RODO.
5. **Prawdziwy sklep** (jeśli kiedyś): platforma SaaS (np. Shoper, Shopify) + operator płatności. Bez własnego kodu do logowania i płatności.
6. **Płatności zawsze na stronie operatora** (Stripe, PayU, Przelewy24). Subskrypcja z BLIK-iem jest od 2026 r. możliwa przez Stripe.
7. **3D, które nie wygląda generycznie:** jedna idea wizualna, własne kolory i fonty, 3D oszczędnie, `prefers-reduced-motion` i wersja zapasowa bez WebGL.

Szczegóły i źródła w folderze [`docs/`](docs/):

| Plik | Temat |
|---|---|
| **[ZGODNOSC-Z-PRAWEM.md](ZGODNOSC-Z-PRAWEM.md)** | **Element po elemencie: co zawiera strona, dlaczego to legalne, źródła** |
| [01-narzedzia-3d.md](docs/01-narzedzia-3d.md) | Connectory i skille do animacji 3D w Claude Code, przepis na niegeneryczny wygląd |
| [02-prawo-i-zgodnosc.md](docs/02-prawo-i-zgodnosc.md) | RODO, cookies (PKE), prawa konsumenta, suplementy, dostępność, AI Act |
| [03-platnosci.md](docs/03-platnosci.md) | Płatności pokazowe i prawdziwe, PCI DSS, subskrypcje |
| [04-logowanie-i-dane.md](docs/04-logowanie-i-dane.md) | Jak działa logowanie, jakie dane, kto jest administratorem |
| [05-bezpieczenstwo.md](docs/05-bezpieczenstwo.md) | Zabezpieczenia repo i strony |
| [06-architektura-i-plan.md](docs/06-architektura-i-plan.md) | Etapy projektu, stos technologiczny, mapa strony, następne kroki |
| [checklista-przed-publikacja.md](docs/checklista-przed-publikacja.md) | Co sprawdzić przed pokazaniem strony |

## Struktura folderu

```
strona-bio-health/
├── index.html            strona główna
├── informacje.html       informacje i prywatność
├── produkt.html          przykładowa strona produktu (BC5)
├── prezentacja.html      prezentacja makiet BC5 (strzałki / klik / spacja; ?druk&s=N&k=K do PDF)
├── src/                  style i skrypty (scena 3D: src/scena-3d.js)
├── public/               pliki kopiowane bez zmian (favicon, zdjęcia, obrazy do prezentacji)
├── ZGODNOSC-Z-PRAWEM.md  co zawiera strona i dlaczego to legalne
├── docs/                 research i plan
├── .github/              Dependabot
├── CLAUDE.md             instrukcje dla Claude Code
└── _robocze/             prywatne notatki (NIE trafiają na GitHub)
```

## Podgląd na komputerze

Wymaga Node.js 22.12 lub nowszego.

```bash
npm install
```

```bash
npm run dev
```

Wersja produkcyjna (z zabezpieczeniami CSP), dokładnie taka jak na GitHubie:

```bash
npm run build && npm run preview
```

## Repozytorium i publikacja

Kod: **https://github.com/Git-Patryk/Bio-Health** (publiczne, bez licencji, czyli wolno oglądać, ale nie kopiować).

- Gałąź `main`: kod źródłowy.
- Gałąź `gh-pages`: gotowa, zbudowana strona (zawartość folderu `dist/` po `npm run build`).
  GitHub Pages publikuje ją pod adresem **https://git-patryk.github.io/Bio-Health/**
  (Settings → Pages → Source: „Deploy from a branch”, gałąź `gh-pages`, folder `/ (root)`).
- Po zmianach na stronie trzeba ją zbudować i wypchnąć na `gh-pages` (najprościej: poprosić o to Claude Code).

Warto włączyć: **Settings → Code security:** Dependabot alerts, Secret scanning i Push protection.

## Źródła materiałów i licencje

| Element | Źródło | Licencja |
|---|---|---|
| three.js | npm `three` | MIT |
| GSAP | npm `gsap` | GSAP Standard License (darmowa, także komercyjnie) |
| Kapsułka 3D, granulki | zbudowane w kodzie | własne |
| Czcionka Onest | npm `@fontsource-variable/onest`, trzymana lokalnie | SIL Open Font License 1.1 |
| Zdjęcia `public/img/` | Unsplash (Robert V. Ruggiero, Kelly Sikkema), podpisane na stronie | Unsplash License |
| Wycinki stron konkurencji `public/prezentacja/konkurencja/` | zrzuty myprotein.pl, sklep.kfd.pl, pl.huel.com z 13.11.2026 | cytat w celu analizy, podpisany w prezentacji |
| Opakowanie produktu (SVG), makiety | zbudowane w kodzie | własne |

*Przygotowano z pomocą AI (Claude Code).*
