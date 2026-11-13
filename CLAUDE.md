# CLAUDE.md — strona-bio-health

Pokazowa strona sklepu z suplementami i odżywkami w subskrypcji, z animacjami 3D.
Projekt studencki (praktyki „Psychologia w e-commerce”, SWPS, zima 2026).
Strona jest prezentowana na zajęciach. Od 13.11.2026 kod jest w publicznym repo `Git-Patryk/Bio-Health`,
a wersja pokazowa na GitHub Pages (https://git-patryk.github.io/Bio-Health/). Ma wyglądać
i działać jak kompletny, zgodny z prawem prawdziwy sklep, ale **nie jest prawdziwym sklepem**.

**Specyfikacja zawartości: [`ZGODNOSC-Z-PRAWEM.md`](ZGODNOSC-Z-PRAWEM.md).** Opisuje element po elemencie,
co ma być na stronie, dlaczego i jak działa w demo.

## Twarde zasady

1. **Pełny, realistyczny sklep, bez wysyłania danych.** Wszystkie elementy z `ZGODNOSC-Z-PRAWEM.md` (rejestracja, logowanie, panel konta, koszyk, dane do zamówienia, podsumowanie z przyciskiem „Zamawiam z obowiązkiem zapłaty”, płatność pokazowa, subskrypcja, baner cookies, regulamin, polityka prywatności i cookies, zwroty, reklamacje, kontakt) muszą mieć komplet pól, zgód i informacji jak w prawdziwym sklepie. Formularze walidują dane, ale **niczego nie wysyłają** (brak `fetch`/XHR na zewnątrz, CSP ma `form-action 'none'`, obsługa przez JS). **Haseł nie zapisujemy nigdzie**, nawet w localStorage.
2. **Ankieta „Dobierz zestaw” ma działać** (logika w przeglądarce). Pytania i logikę doboru opracowujemy **razem z właścicielem**, więc nie wymyślaj ich sam. Ankieta pyta o cel i preferencje, **nie o zdrowie** (RODO art. 9).
3. **Dane sprzedawcy fikcyjne i oczywiście nieprawdziwe:** Bio & Health sp. z o.o. (firma fikcyjna), ul. Przykładowa 1, 00-000 Warszawa, NIP 000-000-00-00, `kontakt@bio-health.example`.
4. **Pasek „Sklep pokazowy”** na każdej podstronie. Dokumenty (regulamin itd.) z dopiskiem „dokument pokazowy”.
5. **Zero zewnętrznych zasobów** (skryptów, fontów, analityki, embedów). Biblioteki instalujemy przez npm, a fonty trzymamy lokalnie. Baner cookies jest pokazowy: strona nie ładuje żadnych trackerów.
6. **Treści o suplementach:** tylko oświadczenia z rejestru UE (rozp. 1924/2006, 432/2012), bez „leczy/zapobiega/chroni przed chorobą”. Karta produktu z pełną informacją o żywności i obowiązkowymi ostrzeżeniami. Produkty i ceny przykładowe, bez cudzych marek.
7. **Dostępność:** WCAG 2.1 AA, `prefers-reduced-motion`, tekst w HTML (nie w canvasie), zapas bez WebGL, obsługa klawiaturą, etykiety pól.
8. **Wydajność 3D:** DPR ≤ 2, pauza poza ekranem i w tle, three.js ładowany dynamicznie, modele i tekstury ≤ 1,5 MB.
9. **Oznaczanie AI:** stopka „Przygotowano z pomocą AI (Claude Code)”, podpis pod grafikami z AI.
10. **Żadnych sekretów w repo.** Nowe biblioteki tylko w wersjach mających co najmniej 2 tygodnie, przypięte dokładnie.
11. **Gdy element strony powstaje lub się zmienia, zaktualizuj jego punkt w `ZGODNOSC-Z-PRAWEM.md`** (zwłaszcza „W demo”).

## Stos i komendy

- Vite 8 + three.js + GSAP, czysty JavaScript (moduły ES), bez frameworka. Komentarze i nazwy po polsku.
- **three.js: korzystaj z MCP `threejsresources`.** Najpierw `threejs_search_guides`, potem `threejs_get_guide` lub `threejs_get_code_snippet`. Nie polegaj na pamięci, bo API three.js często się zmienia.
- `npm run dev`: serwer deweloperski. `npm run build && npm run preview`: wersja produkcyjna z CSP.
- Nowa podstrona HTML musi zostać dopisana do `build.rolldownOptions.input` w `vite.config.js`.
- CSP jest wstrzykiwana tylko przy budowaniu (`vite.config.js`). Po zmianach **zawsze** sprawdź wersję produkcyjną w przeglądarce i konsolę.
- `base: './'`: ścieżki względne.
- Publikacja na GitHub Pages: z gałęzi `gh-pages` = zawartość `dist/` (+ `.nojekyll`) po `npm run build`, wypychana osobno. Bez GitHub Actions: token bez zakresu `workflow` nie może wypchnąć plików z `.github/workflows/`. Repo jest publiczne, więc do commitów nie trafiają dane osobowe poza imieniem i nazwiskiem właściciela na slajdzie tytułowym (jego decyzja).

## Praca z właścicielem

- Wyjaśniaj zmiany prostym językiem, bez żargonu, po polsku.
- Zanim powiesz „działa”, sprawdź sam: build, podgląd w przeglądarce (także szerokość telefonu 375 px), konsola bez błędów.
- Nie dokładaj zakresu ani funkcji bez pytania. Zakres produktów zgodny z ustaleniami grupy.
- Przed pracą nad wyglądem: skill `frontend-design`, kierunek spisany w `docs/DESIGN.md` (do utworzenia).
- Research: `docs/` (stan na 30.10.2026; przepisy się zmieniają, więc sprawdzaj daty).
- `_robocze/` to prywatne notatki, poza gitem.
