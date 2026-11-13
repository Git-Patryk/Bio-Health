# 05. Bezpieczeństwo techniczne

*Stan na 30.10.2026. Co już jest zrobione (✅), co zrobić przy publikacji (☐) i co dojdzie przy prawdziwym sklepie.*

## Konto GitHub i repozytorium

- ☐ **Weryfikacja dwuetapowa (2FA)** na koncie GitHub, najlepiej passkey albo aplikacja, nie SMS.
- ☐ Po utworzeniu repo: **Settings → Code security** → włączyć *Dependabot alerts*, *Secret scanning* i *Push protection* (blokuje wypchnięcie kodu z przypadkowo wklejonym kluczem).
- ✅ **Dependabot** (`.github/dependabot.yml`) co tydzień proponuje aktualizacje bibliotek. Wersje młodsze niż 14 dni są pomijane, co chroni przed świeżo zainfekowanymi paczkami.
- ✅ **Wersje bibliotek przypięte dokładnie** (`package.json` + `package-lock.json`). Budowanie na GitHubie używa `npm ci`, czyli dokładnie tych samych wersji.
- ✅ **`.gitignore`** wyklucza `.env`, `node_modules/`, `dist/` i prywatny folder `_robocze/`.
- ✅ `npm audit`: 0 podatności (30.10.2026).
- ☐ (opcjonalnie) Ochrona gałęzi `main`: zmiany przez pull request.

## Strona statyczna (wersja pokazowa)

- ✅ **CSP** (Content Security Policy) w `<meta>`, dodawana przy budowaniu (`vite.config.js`). Przeglądarka uruchomi tylko nasze skrypty, style i czcionki. GitHub Pages nie pozwala ustawiać nagłówków HTTP, więc to maksimum. Ograniczenie: w `<meta>` nie działa `frame-ancestors`, więc stronę da się osadzić w cudzej ramce. Przy stronie bez logowania to akceptowalne.
- ✅ **Zero zewnętrznych zasobów:** three.js i GSAP są w paczce, czcionki systemowe. Mniej danych dla firm trzecich i mniejsze ryzyko podmiany skryptu.
- ✅ `Referrer-Policy: strict-origin-when-cross-origin`, a linki zewnętrzne mają `rel="noopener noreferrer"`.
- ☐ **Settings → Pages → Enforce HTTPS** (zwykle włączone domyślnie dla `github.io`).
- Zasady na przyszłość:
  - nie wklejać skryptów „z internetu” (widgety, czaty, liczniki);
  - jeśli zewnętrzny plik jest naprawdę potrzebny: przypięta wersja + atrybut `integrity` (SRI) + wpis w CSP;
  - localStorage tylko na rzeczy niewrażliwe (koszyk pokazowy, ustawienia);
  - żadnych danych osobowych w adresach URL.

## Prawdziwy sklep: dodatkowo

| Obszar | Co zrobić |
|---|---|
| Nagłówki HTTP | HSTS, CSP z `frame-ancestors 'none'`, `X-Content-Type-Options: nosniff`, `Permissions-Policy` |
| Dane wejściowe | Walidacja **po stronie serwera** (przeglądarce nie ufamy), zapytania parametryzowane |
| Uprawnienia | Każde żądanie sprawdza, czy użytkownik ma prawo do danego zasobu. W Supabase: reguły RLS na **każdej** tabeli |
| Sekrety | Tylko w zmiennych środowiskowych hostingu. Rotacja po każdym podejrzeniu wycieku |
| Środowiska | Osobno test i produkcja (inne klucze, inna baza) |
| Kopie zapasowe | Automatyczne, z przetestowanym odtworzeniem |
| Monitoring | Logi błędów i logowań, alerty o nietypowym ruchu |
| Incydenty | Spisana procedura. Zgłoszenie do UODO w 72 h przy wycieku danych |
| Przed startem | Skan OWASP ZAP, przegląd zgodny z OWASP Top 10, test płatności w trybie testowym |
| Utrzymanie | Comiesięczne aktualizacje zależności. Ktoś musi być za to **odpowiedzialny** |

## Źródła

- [GitHub Pages — brak własnych nagłówków (dyskusja)](https://github.com/orgs/community/discussions/54257) · [ograniczenia CSP w meta (HTMHell)](https://htmhell.dev/adventcalendar/2023/7/)
- [GitHub Pages — logowanie IP odwiedzających](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)
