# DESIGN.md — kierunek wizualny Bio & Health

Ustalone 13.11.2026 przy BC5 (makiety). Inspiracja: revolut.com — duża typografia, pełnoekranowe pola koloru i zdjęć, „pływające” karty interfejsu, pigułkowe przyciski. Odcinamy się od polskich sklepów z suplementami (KFD, Myprotein): u nich kolorowe banery, liczniki promocji i 50 smaków na liście.

## Jedna odważna rzecz: kolor smaku prowadzi stronę
Wybór smaku przebarwia całe pole produktu (tło + opakowanie). Kupujący widzi swój wybór, zanim przeczyta etykietę. Reszta strony jest spokojna: biel, granat, dużo powietrza.

## Kolory
| Nazwa | Hex | Rola |
|---|---|---|
| biel | `#FFFFFF` | tło |
| mgła | `#EEF0F4` | powierzchnie, pola formularzy |
| granat | `#161A33` | tekst, przyciski, ciemne sekcje |
| granat-2 | `#4E5470` | tekst drugorzędny (kontrast 7:1 na bieli) |
| linia | `#D9DCE5` | obramowania |
| sygnał | `#3D5AFE` | fokus klawiatury, linki w tekście |

Smaki (pole / opakowanie): czekolada `#E9DCD3`/`#5B3A2A`, wanilia `#F3E8C9`/`#D9B65E`, karmel `#F1DCC2`/`#C27A36`, truskawka `#F7D9DD`/`#D2475D`, bez smaku `#E6E9EF`/`#8E97AB`, kawa `#E3DAD3`/`#3E2C24`.

## Typografia
Jedna rodzina: **Onest Variable** (lokalnie z npm, pełne polskie znaki). Nagłówek produktu 56 px / 1,02, waga 650, światło −0,03 em. Zdania-hasła sekcji 64–88 px. Tekst 17 px / 1,55, maks. 65 znaków w linii. Bez wersalików i bez etykiet nad każdym nagłówkiem.

## Kształty
Promień według hierarchii: panele 28 px, zdjęcia 24 px, pola 14 px, przyciski i wybory = pigułki. Cienie tylko pod elementami „pływającymi” nad kolorem.

## Układ (komputer)
```
[pasek pokazowy]
[nagłówek przezroczysty → biały po przewinięciu]
┌──────────── pole koloru smaku (pełna szerokość) ────────────┐
│  ścieżka + opakowanie i karty      │  biały panel zakupu    │
│  (węższa kolumna)                  │  (szerszy, do przycisku)│
└─────────────────────────────────────────────────────────────┘
Na laptopie (ok. 1440 × 800) wszystko od góry do „Dodaj do koszyka” mieści się bez przewijania.
[podmenu sekcji + mini pasek zakupu — przykleja się]
[zdjęcie pełnej szerokości: ankieta „Dobierz zestaw”]
[hasło dużą czcionką + 4 liczby]  [skład i etykieta]
[ciemna sekcja: rytm dostaw — 3 karty najbliższych dostaw (data, dzień tygodnia, kwota) + kalendarz 4 miesięcy, pauza na styczeń]
[często kupowane razem] [opinie: 4 karty + „Pokaż wszystkie”] [pytania] [newsletter] [stopka]
```
Każda sekcja mieści się na jednym ekranie laptopa (odstępy i hasła zależne od wysokości okna).
Tekst wyrównany do lewej. Na telefonie pole koloru nad panelem zakupu, a przycisk w przyklejonym pasku na dole.

## Ruch
Jedno wejście strony (opakowanie i karty). Poza tym ruch tylko w odpowiedzi na działanie: zmiana smaku, rytmu dostaw, dodanie do koszyka.
Przewijanie zwykłe, przeglądarkowe (bez bibliotek „wygładzających” — Lenis usunięty, bo opóźniał każdy ruch kółka). Bez automatycznego przyciągania do sekcji (było, Patryk zrezygnował — wystarczyło szybkie przewijanie). Płynny ruch tylko przy linkach do sekcji i „do góry”. `prefers-reduced-motion` wyłącza animacje.

## Język
Prosto, w drugiej osobie, bez obietnic zdrowotnych spoza rejestru UE. Liczby i daty zamiast przymiotników („Następna dostawa: 11 grudnia”).
