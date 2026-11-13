# 03. Płatności

*Stan na 30.10.2026.*

## W skrócie

- **Złota zasada: dane karty nigdy nie dotykają naszej strony.** Płatność odbywa się na stronie operatora (Stripe, PayU, Przelewy24) albo w jego okienku. Operator przejmuje bezpieczeństwo, 3-D Secure i zgodność z PCI DSS.
- **GitHub Pages zabrania prowadzenia sklepu** i przesyłania haseł oraz numerów kart. Na Pages robimy więc wyłącznie płatność **pokazową**.
- **Subskrypcja w Polsce jest wykonalna:** Stripe Billing obsługuje od 2026 r. cykliczny BLIK (limit 2000 zł na jedno obciążenie, wymaga włączenia na koncie) i karty. Przelewy24 przez Stripe działa tylko jednorazowo.

## Co mówi regulamin GitHub Pages

Dokumentacja GitHuba wprost:
- Pages **nie jest** darmowym hostingiem dla biznesu online ani dla stron służących głównie transakcjom handlowym;
- strony na Pages **nie powinny** służyć do wrażliwych operacji, takich jak przesyłanie haseł czy numerów kart.

Wniosek: demo na Pages jest w porządku. Prawdziwy sklep musi stać gdzie indziej (zob. [06](06-architektura-i-plan.md)).

## Wersja pokazowa: dwie opcje

| Opcja | Jak działa | Plusy | Minusy |
|---|---|---|---|
| **A0. Płatność „na niby”** (zalecana na start) | Ekran checkoutu wygląda realistycznie, ale przycisk „Zapłać” pokazuje komunikat „To sklep pokazowy — płatność nie została wykonana”. Żadne pola nie zbierają danych karty | Zero kont, zero ryzyka, pełna kontrola nad UX (do BC4/BC5) | Nie widać prawdziwego okna operatora |
| **A1. Stripe w trybie testowym** | Przycisk prowadzi do **Payment Link** Stripe w trybie testowym. Płaci się kartą testową `4242 4242 4242 4242` na stronie stripe.com. Bez naszego serwera | Prawdziwy, profesjonalny flow płatności, łącznie z BLIK testowym | Potrzebne konto Stripe (zakłada je właściciel projektu). W trybie testowym nie da się przyjąć prawdziwych pieniędzy, więc to bezpieczne |

## Prawdziwy sklep: wybór operatora

| Operator | Metody | Subskrypcje | Uwagi |
|---|---|---|---|
| **Stripe** | Karty, BLIK, Przelewy24, Apple/Google Pay | ✅ Stripe Billing + gotowy **portal klienta** (zmiana planu, pauza, rezygnacja) | BLIK cykliczny od 2026: tylko PLN, maks. 2000 zł na obciążenie, wymaga włączenia na koncie. P24 tylko jednorazowo |
| **PayU** | Karty, BLIK, przelewy, raty, „PayU Płacę później” | ✅ płatności cykliczne kartą | Polski standard, rozpoznawalny dla klientów |
| **Przelewy24** | Przelewy, BLIK, karty | ✅ własne narzędzia cykliczne | Polski operator |
| **Tpay** | Przelewy, BLIK, karty | ✅ | Polski operator |

Prowizje się zmieniają. Przed decyzją porównać aktualne cenniki na stronach operatorów.

## Bezpieczeństwo płatności

1. **Strona płatności u operatora** (przekierowanie albo okienko operatora). Wtedy sklep wypełnia najprostszą ankietę PCI DSS: **SAQ A**.
2. **PCI DSS v4.0.1 (od 31.03.2025):** kwalifikacja do SAQ A wymaga potwierdzenia, że strona sklepu **nie jest podatna na ataki przez skrypty**, które mogą podmienić płatność. W praktyce: polityka CSP, brak przypadkowych skryptów zewnętrznych, kontrola zmian w kodzie strony.
3. **3-D Secure / silne uwierzytelnianie (PSD2)** obsługuje operator automatycznie.
4. **Cena liczona na serwerze**, nigdy z przeglądarki. Koszyk z przeglądarki to tylko lista ID produktów. Ceny bierzemy z katalogu po stronie serwera, bo inaczej ktoś może podmienić „199 zł” na „1 zł”.
5. **Zamówienie opłacone dopiero po webhooku** od operatora (wiadomości serwer–serwer z podpisem, który **weryfikujemy**). Przekierowanie „płatność udana” w przeglądarce niczego nie dowodzi.
6. **Klucze:** klucz publiczny (`pk_…`) może być w przeglądarce. Klucz tajny (`sk_…`) i sekret webhooka tylko w zmiennych środowiskowych serwera, **nigdy w repozytorium**.
7. **Idempotencja:** ten sam webhook może przyjść dwa razy. Zamówienie nie może się wtedy zdublować.
8. **Osobne konta testowe i produkcyjne** u operatora. Nie testujemy na prawdziwych kartach.

## Subskrypcja: przebieg

1. Klient wybiera zestaw i częstotliwość. Widzi cenę za dostawę, datę pierwszego i następnego obciążenia oraz zasady rezygnacji.
2. Przechodzi do Stripe Checkout (tryb subskrypcji) i płaci kartą albo BLIK-iem z autoryzacją cykliczną.
3. Webhook `checkout.session.completed`: tworzymy subskrypcję w sklepie i wysyłamy potwierdzenie e-mailem.
4. Przed każdym odnowieniem: e-mail z przypomnieniem (dobra praktyka, przyszły Digital Fairness Act).
5. Zmiana, pauza i rezygnacja przez **portal klienta Stripe**. Klient loguje się linkiem z e-maila, a my nie musimy budować tej części.
6. Nieudane obciążenie: Stripe ponawia próbę automatycznie, a my informujemy klienta.

## Faktury i paragony

- Faktury generuje operator (Stripe Invoicing) albo program księgowy (np. Fakturownia, inFakt) połączony z płatnościami.
- Faktury B2B przechodzą przez **KSeF** (obowiązkowy od 2026 r.). Konfigurację ustalić z księgową.

## Źródła

- [GitHub Pages — limity i zakazy](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)
- [Stripe: BLIK recurring payments](https://docs.stripe.com/payments/blik/recurring-payments) · [Stripe changelog: Billing + BLIK (22.04.2026)](https://docs.stripe.com/changelog/dahlia/2026-04-22/stripe-billing-blik-recurring-payments) · [Stripe: Przelewy24](https://stripe.com/ie/resources/more/przelewy24-an-in-depth-guide)
- [PCI DSS 4.0.1 SAQ A: FAQ (Report URI)](https://blog.report-uri.com/pci-dss-4-0-1-saq-a-and-client-side-security-a-plain-english-faq/) · [Adyen: SAQ A eligibility](https://docs.adyen.com/development-resources/pci-dss-compliance-guide/saq-a-eligibility)
- [Porównanie bramek płatności 2026 (Freenance)](https://freenance.io/przedsiebiorczosc/bramki-platnosci-2026-ranking-stripe-payu-przelewy24-tpay-bluemedia-porownanie/)
