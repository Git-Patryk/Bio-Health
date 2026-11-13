# Zgodność z prawem: co zawiera strona i dlaczego tak

**Sklep pokazowy „Bio & Health”: suplementy i odżywki w subskrypcji**
Projekt studencki, praktyki „Psychologia w e-commerce” (SWPS, zima 2026)
Stan prawny na **30 października 2026 r.** · To zestawienie do celów projektu, nie porada prawna.

---

## Jak czytać ten dokument

Strona jest **sklepem pokazowym** prezentowanym na zajęciach. Wygląda i działa jak prawdziwy sklep zgodny z prawem: ma wszystkie formularze, zgody, informacje i dokumenty, których wymagają przepisy. Od prawdziwego sklepu różni się tylko tym, że **nic nie jest wysyłane ani zapisywane na serwerze**. Wpisane dane zostają w przeglądarce, a hasła nie są zapisywane nigdzie.

Każdy element jest opisany tak samo:

- **Na stronie:** co widzi użytkownik.
- **Dlaczego tak:** uzasadnienie (prawo, bezpieczeństwo, dobra praktyka).
- **Podstawa:** przepisy i źródła. Numery w nawiasach, np. [S2], odsyłają do listy na końcu.
- **W demo:** jak działa wersja pokazowa.

Dane sprzedawcy w demo są **fikcyjne i oczywiście nieprawdziwe**, żeby nie podszywać się pod żadną istniejącą firmę: *Bio & Health sp. z o.o. (firma fikcyjna), ul. Przykładowa 1, 00-000 Warszawa, NIP 000-000-00-00, kontakt@bio-health.example*. Domena `.example` jest zarezerwowana do przykładów, więc taki adres nie może należeć do nikogo.

## Spis elementów

**I. Na każdej stronie:** 1. Pasek „Strona pokazowa” · 2. Stopka z danymi sprzedawcy · 3. Baner cookies · 4. Dostępność i animacje 3D · 5. Oznaczenie treści z AI
**II. Oferta:** 6. Ceny · 7. Karta produktu · 8. Oświadczenia zdrowotne · 9. Opinie klientów · 10. Ankieta „Dobierz zestaw”
**III. Konto:** 11. Rejestracja · 12. Logowanie i reset hasła · 13. Panel konta
**IV. Zakup i subskrypcja:** 14. Koszyk · 15. Dane do zamówienia · 16. Podsumowanie i przycisk zamówienia · 17. Płatność · 18. Subskrypcja · 19. Potwierdzenie zamówienia
**V. Po zakupie:** 20. Odstąpienie od umowy · 21. Reklamacje · 22. Newsletter
**VI. Dokumenty:** 23. Regulamin · 24. Polityka prywatności · 25. Polityka cookies · 26. Kontakt
**VII. Technika:** 27. Bezpieczeństwo strony

---

## I. Na każdej stronie

### 1. Pasek „Strona pokazowa”
- **Na stronie:** wąski pasek na górze każdej podstrony: „Sklep pokazowy — projekt studencki. Niczego tu nie kupisz i nie zbieramy żadnych danych”.
- **Dlaczego tak:** realistyczny sklep z cenami i formularzami mógłby kogoś wprowadzić w błąd co do tego, że naprawdę coś sprzedaje. Wprowadzanie w błąd co do charakteru oferty jest nieuczciwą praktyką rynkową.
- **Podstawa:** ustawa o przeciwdziałaniu nieuczciwym praktykom rynkowym, art. 5 (praktyki wprowadzające w błąd) [S6].
- **W demo:** ✅ już jest w szkielecie.

### 2. Stopka z danymi sprzedawcy i linkami do dokumentów
- **Na stronie:** pełna nazwa firmy, adres, NIP, KRS, e-mail i telefon; linki: Regulamin, Polityka prywatności, Polityka cookies, Ustawienia cookies, Zwroty i reklamacje, Kontakt.
- **Dlaczego tak:** klient musi wiedzieć, z kim zawiera umowę i jak się z nim skontaktować, zanim cokolwiek kupi. Dokumenty muszą być dostępne z każdego miejsca.
- **Podstawa:** UŚUDE, art. 5 (dane usługodawcy) [S3]; ustawa o prawach konsumenta, art. 12 ust. 1 pkt 2–4 (tożsamość i dane kontaktowe przedsiębiorcy) [S2].
- **W demo:** dane fikcyjne według wzoru powyżej.

### 3. Baner cookies i link „Ustawienia cookies”
- **Na stronie:** przy pierwszej wizycie baner z trzema równorzędnymi przyciskami: **Akceptuj wszystkie**, **Odrzuć wszystkie** i **Ustawienia**. W ustawieniach są osobne przełączniki: niezbędne (zawsze włączone), analityczne i marketingowe. Stałego linku „Ustawienia cookies” w stopce można użyć, żeby zmienić lub cofnąć zgodę.
- **Dlaczego tak:** zapisanie czegokolwiek na urządzeniu użytkownika wymaga jego wcześniejszej, świadomej zgody. Wyjątek dotyczy rzeczy niezbędnych do usługi, o którą prosi (koszyk, logowanie). „Odrzuć” musi być tak samo łatwe jak „Akceptuj”. Zgody nie można wymuszać zaznaczonymi z góry polami ani ukrywać odmowy w drugim oknie. Cofnięcie zgody ma być tak łatwe jak jej wyrażenie.
- **Podstawa:** Prawo komunikacji elektronicznej, art. 399 ust. 1 (zgoda) i ust. 3 (wyjątek dla niezbędnych), art. 400 (zgoda według zasad RODO) [S4]; RODO art. 7 ust. 3 (cofnięcie zgody) [S1]; raport EROD (EDPB) o banerach cookies [S15]; wyrok TSUE Planet49, C-673/17 (zaznaczone z góry pole to nie zgoda) [S16].
- **W demo:** baner działa, a wybór zapisuje się w przeglądarce. To zapis niezbędny, bo zapamiętuje decyzję użytkownika. Strona i tak nie ładuje żadnych narzędzi analitycznych ani marketingowych, a baner pokazuje, jak to wyglądałoby w prawdziwym sklepie.

### 4. Dostępność i animacje 3D
- **Na stronie:** czytelny kontrast, obsługa całej strony klawiaturą (widoczny fokus), opisy alternatywne obrazków, poprawne etykiety pól formularzy, link „Przejdź do treści”. Animacje 3D wyłączają się, gdy użytkownik ma w systemie ustawione „ogranicz ruch”. Bez obsługi 3D zostaje statyczna grafika. Cały tekst jest w HTML, nie w grafice 3D.
- **Dlaczego tak:** sklepy internetowe objęto obowiązkiem dostępności. Mikroprzedsiębiorcy są z niego zwolnieni, ale standard i tak jest dobrą praktyką i znakiem jakości. Animacje mogą wywoływać zawroty głowy u osób z zaburzeniami przedsionkowymi.
- **Podstawa:** ustawa o zapewnianiu spełniania wymagań dostępności niektórych produktów i usług (od 28.06.2025) [S12]; WCAG 2.1, poziom AA, a ponadto kryterium 2.3.3 „Animacje z interakcji” z poziomu AAA (robimy więcej, niż wymaga standard) [S12].
- **W demo:** ✅ ograniczanie ruchu, zapas bez 3D i „Przejdź do treści” już działają w szkielecie.

### 5. Oznaczenie treści z AI
- **Na stronie:** w stopce „Przygotowano z pomocą AI (Claude Code)”. Pod realistycznymi grafikami z AI podpis „Grafika wygenerowana przez AI”. Ewentualny czat-doradca przedstawia się jako AI w pierwszej wiadomości.
- **Dlaczego tak:** użytkownik ma wiedzieć, kiedy ma do czynienia z AI i kiedy realistyczny obraz nie jest prawdziwym zdjęciem. Oznaczania treści z AI wymagają też zasady praktyk.
- **Podstawa:** AI Act, art. 50, obowiązuje od 2.08.2026 [S13].
- **W demo:** ✅ stopka już jest.

---

## II. Oferta

### 6. Ceny
- **Na stronie:** cena brutto w złotych (z VAT) i **cena jednostkowa** (np. „129 zł · 172 zł/kg”). Przy promocji obok przekreślonej ceny: „Najniższa cena z 30 dni przed obniżką: … zł”. Koszt dostawy widoczny już w koszyku.
- **Dlaczego tak:** cena musi być jednoznaczna i pozwalać porównać oferty. Najniższa cena z 30 dni przed obniżką chroni przed fikcyjnymi promocjami („podnieś cenę, potem obniż”).
- **Podstawa:** ustawa o informowaniu o cenach towarów i usług, art. 4 ust. 1 (cena i cena jednostkowa) i ust. 2 (najniższa cena z 30 dni) [S5]; ustawa o prawach konsumenta, art. 12 ust. 1 pkt 5 (łączna cena z podatkami i kosztami dostawy) [S2].
- **W demo:** ✅ `produkt.html` (13.11.2026): cena brutto zmienia się z wariantem, cena za kg, przy promocji 900 g przekreślona cena i „Najniższa cena z 30 dni przed obniżką”. Ceny przykładowe.

### 7. Karta produktu: pełna informacja o suplemencie
- **Na stronie:** nazwa z określeniem „suplement diety”, pełny skład z ilościami składników w porcji i % referencyjnej wartości spożycia, **alergeny wyróżnione** w składzie, zalecana porcja dzienna, ilość netto, warunki przechowywania, dane podmiotu odpowiedzialnego. Do tego obowiązkowe ostrzeżenia:
  - „Nie przekraczać zalecanej porcji do spożycia w ciągu dnia”;
  - „Suplement diety nie może być stosowany jako substytut (zamiennik) zróżnicowanej diety”;
  - „Przechowywać w sposób niedostępny dla małych dzieci”.
- **Dlaczego tak:** suplement to żywność, nie lek. Przy sprzedaży przez internet wszystkie obowiązkowe informacje z etykiety muszą być dostępne **przed zakupem** (oprócz daty minimalnej trwałości). Nie wystarczy samo zdjęcie etykiety: tekst w HTML jest czytelny dla każdego, także dla czytników ekranu.
- **Podstawa:** rozporządzenie (UE) 1169/2011, art. 9 (informacje obowiązkowe) i art. 14 (sprzedaż na odległość) [S9]; rozporządzenie Ministra Zdrowia z 9.10.2007 w sprawie składu oraz oznakowania suplementów diety [S8]; ustawa o bezpieczeństwie żywności i żywienia [S7].
- **W demo:** ✅ `produkt.html` (białko WPC 80): tabela wartości odżywczych, składniki z pogrubionymi alergenami, sposób użycia, trzy obowiązkowe ostrzeżenia, masa netto, podmiot odpowiedzialny (fikcyjny). Produkty przykładowe z realistycznymi, ale nie skopiowanymi od nikogo składami. W prawdziwym sklepie dochodzi powiadomienie GIS o produkcie i wpis firmy do rejestru Sanepidu [S7, S23].

### 8. Oświadczenia zdrowotne w opisach
- **Na stronie:** tylko sformułowania z unijnego rejestru oświadczeń, np. „Białko przyczynia się do wzrostu masy mięśniowej”, „Witamina D pomaga w utrzymaniu prawidłowego funkcjonowania układu odpornościowego”. **Nigdy:** „leczy”, „zapobiega chorobom”, „chroni przed przeziębieniem”, „spala tłuszcz”.
- **Dlaczego tak:** żywności nie wolno przypisywać właściwości zapobiegania chorobom ani ich leczenia. Wolno używać wyłącznie oświadczeń zatwierdzonych przez UE, na określonych warunkach. Dotyczy to opisów, bloga, mediów społecznościowych i odpowiedzi czatu.
- **Podstawa:** rozporządzenie (WE) 1924/2006 [S10]; rozporządzenie (UE) 432/2012 + rejestr oświadczeń [S11]; rozporządzenie 1169/2011, art. 7 ust. 3 [S9].
- **W demo:** treści pisane od początku według tej zasady. To także dobry materiał do BC6 (content/SEO).

### 9. Opinie klientów
- **Na stronie:** przy opiniach widnieje informacja: „Opinie mogą wystawiać tylko osoby, które kupiły produkt — sprawdzamy to po numerze zamówienia”. Opinie negatywne nie są ukrywane. Przy każdej opinii jest przycisk „Zgłoś opinię”.
- **Dlaczego tak:** sklep, który publikuje opinie, musi powiedzieć, czy i jak sprawdza ich autentyczność. Fałszywe opinie są zakazane w każdych okolicznościach. Zgłaszanie nielegalnych treści to obowiązek serwisów z treściami użytkowników.
- **Podstawa:** ustawa o przeciwdziałaniu nieuczciwym praktykom rynkowym, art. 6 ust. 4 pkt 7 (informacja o weryfikacji) i art. 7 pkt 25–26 (zakaz fałszywych opinii) [S6]; DSA, art. 16 (zgłaszanie treści) [S24].
- **W demo:** ✅ `produkt.html`: opinie przykładowe (oznaczone), informacja o weryfikacji, filtr „Krytyczne”, odpowiedzi sklepu, przycisk „Zgłoś opinię” (okno pokazowe).

### 10. Ankieta „Dobierz zestaw” *(treść w przygotowaniu)*
- **Na stronie:** kilka kroków z paskiem postępu. Pytania o **cel** (redukcja, budowa masy, regularny trening), częstotliwość treningów, preferowaną formę (kapsułki, proszek), smak i budżet. Do tego opcja „Wyklucz składniki” (np. laktoza, gluten, soja) jako preferencja, bez pytania o przyczynę. Na końcu wynik z wyjaśnieniem, dlaczego taki zestaw, i dopisek: *„Rekomendacja ma charakter informacyjny i nie jest poradą medyczną. W ciąży, w trakcie leczenia lub przyjmując leki skonsultuj suplementację z lekarzem.”*
- **Dlaczego tak:** pytania o choroby, ciążę czy leki to **dane o zdrowiu**, czyli szczególna kategoria danych. Wymagają wyraźnej zgody i dodatkowych zabezpieczeń. Ankieta oparta na celu i preferencjach daje dobry dobór bez zbierania takich danych (zasada minimalizacji). Wyjaśnienie, skąd wynik, buduje zaufanie i spełnia wymóg przejrzystości.
- **Podstawa:** RODO art. 5 ust. 1 lit. c (minimalizacja), art. 9 (dane szczególne), art. 12–13 (przejrzystość) [S1]; zakaz przypisywania właściwości leczniczych [S9, S10].
- **W demo:** ankieta **działa** (liczy wynik w przeglądarce), a odpowiedzi nie są nigdzie wysyłane. Pytania i logikę doboru opracujemy osobno.

---

## III. Konto

### 11. Rejestracja
- **Na stronie:** formularz z polami:
  - **E-mail*** (login i adres do potwierdzeń);
  - **Hasło*** (min. 15 znaków, przycisk „pokaż hasło”, wskaźnik siły). Alternatywnie „Utwórz konto z kluczem dostępu (passkey)”;
  - **Imię** (opcjonalne, do zwracania się w wiadomościach);
  - ☐ **Akceptuję Regulamin i oświadczam, że mam ukończone 18 lat*** (link do Regulaminu);
  - ☐ **Chcę otrzymywać newsletter** (opcjonalne, **domyślnie niezaznaczone**);
  - pod przyciskiem skrócona informacja: „Administratorem Twoich danych jest Bio & Health sp. z o.o. Przetwarzamy je, aby prowadzić Twoje konto. Szczegóły i Twoje prawa: Polityka prywatności”.

  Po wysłaniu pojawia się komunikat „Sprawdź skrzynkę — wysłaliśmy link aktywacyjny”.
- **Dlaczego tak:**
  - zbieramy **tylko to, co potrzebne**: bez daty urodzenia, płci i telefonu na etapie rejestracji;
  - zgoda na newsletter jest osobna i niezaznaczona, bo zgoda musi być dobrowolna i aktywna;
  - informacja o administratorze pojawia się w chwili zbierania danych;
  - link aktywacyjny potwierdza, że adres należy do użytkownika;
  - długie hasło bez wymogu „wielka litera i cyfra” jest według aktualnych standardów bezpieczniejsze i łatwiejsze dla ludzi;
  - sklep jest dla pełnoletnich, bo subskrypcja nie jest drobną sprawą życia codziennego, którą może zawrzeć niepełnoletni.
- **Podstawa:** RODO art. 5 ust. 1 lit. c, art. 6 ust. 1 lit. b (umowa) i lit. a (zgoda), art. 7, art. 13 [S1]; TSUE Planet49 [S16]; NIST SP 800-63B-4 (długość hasła, brak reguł złożoności) [S19]; Kodeks cywilny, art. 11 i 20 [S14]; UŚUDE, art. 8 (regulamin przed zawarciem umowy) [S3].
- **W demo:** formularz sprawdza poprawność pól, ale **niczego nie wysyła, a hasło nie jest nigdzie zapisywane**. Nad formularzem dopisek „Wpisz przykładowe dane — to formularz pokazowy”.

### 12. Logowanie i reset hasła
- **Na stronie:** e-mail + hasło albo „Zaloguj się kluczem dostępu”. Link „Nie pamiętasz hasła?”. Przy błędzie zawsze ten sam komunikat: „Nieprawidłowy e-mail lub hasło”. Po kilku nieudanych próbach chwilowa blokada.
- **Dlaczego tak:** jednakowy komunikat nie zdradza, czy konto istnieje. Limit prób chroni przed zgadywaniem haseł. Reset działa jednorazowym linkiem ważnym krótko. Hasła w prawdziwym sklepie przechowuje się wyłącznie jako skrót Argon2id lub bcrypt i robi to dostawca logowania, nie kod sklepu. Ciasteczko sesji (`HttpOnly`, `Secure`, `SameSite`) jest niezbędne, więc nie wymaga zgody.
- **Podstawa:** OWASP Password Storage Cheat Sheet [S18]; NIST SP 800-63B-4 [S19]; RODO art. 32 (bezpieczeństwo przetwarzania) [S1]; PKE art. 399 ust. 3 (wyjątek dla niezbędnych) [S4].
- **W demo:** logowanie symulowane w przeglądarce. Dowolne przykładowe dane „logują” do konta pokazowego.

### 13. Panel konta
- **Na stronie:** zakładki:
  - **Moje dane:** edycja;
  - **Adresy;**
  - **Zamówienia:** historia, faktury;
  - **Subskrypcja:** zestaw, częstotliwość, data następnej dostawy i płatności, przyciski **Zmień**, **Wstrzymaj** i **Zrezygnuj**;
  - **Zgody:** newsletter i cookies, każdą można włączyć i wyłączyć;
  - **Prywatność:** „Pobierz moje dane” (plik) i „Usuń konto”.
- **Dlaczego tak:** użytkownik ma prawo dostępu do danych, ich poprawiania, usunięcia, przeniesienia i cofnięcia zgody, a sklep powinien to ułatwiać, a nie utrudniać. Przy usunięciu konta zostają tylko dokumenty, których przechowywania wymaga prawo podatkowe (faktury), i ten wyjątek wyjaśniamy.
- **Podstawa:** RODO art. 7 ust. 3, art. 15–17, art. 20 [S1]; dobre praktyki UOKiK dotyczące subskrypcji [S17].
- **W demo:** panel z przykładowymi danymi. Przyciski działają pokazowo, np. „Pobierz moje dane” pobiera przykładowy plik.

---

## IV. Zakup i subskrypcja

### 14. Koszyk
- **Na stronie:** lista produktów z ilością i ceną, przy subskrypcji także częstotliwość (np. „co 4 tygodnie”). Koszt dostawy i łączna kwota widoczne od razu. Brak produktów lub usług dodanych automatycznie i brak zaznaczonych z góry płatnych opcji (np. „ekspresowa dostawa”, „ubezpieczenie paczki”).
- **Dlaczego tak:** każda dodatkowa płatność wymaga **wyraźnej** zgody klienta. Zaznaczona z góry opcja nie jest zgodą i klient może żądać zwrotu takiej kwoty. Automatyczne dodawanie do koszyka to „dark pattern” piętnowany przez UOKiK.
- **Podstawa:** ustawa o prawach konsumenta, art. 10 [S2]; UOKiK o dark patterns [S17].
- **W demo:** ✅ `produkt.html`: wysuwany koszyk w pamięci strony (bez zapisu w przeglądarce), częstotliwość przy subskrypcji, pasek do darmowej dostawy, jedna propozycja do ręcznego dodania; nic nie dodaje się samo. Kasa jeszcze nie istnieje (okno informacyjne).

### 15. Dane do zamówienia
- **Na stronie:** wybór **„Kup bez zakładania konta”** albo „Zaloguj się” (subskrypcja wymaga konta, żeby można nią było zarządzać). Pola:
  - **E-mail*** (potwierdzenie zamówienia);
  - **Imię i nazwisko*;**
  - **Ulica i numer*, Kod pocztowy*, Miejscowość*;**
  - **Telefon** (wymagany tylko przy dostawie do paczkomatu lub kurierem, z dopiskiem „przekażemy go wyłącznie przewoźnikowi”);
  - **Sposób dostawy** z ceną i terminem;
  - ☐ **Chcę fakturę na firmę** → pola Nazwa firmy i NIP.
- **Dlaczego tak:** każde pole ma konkretny cel (wysyłka, kontakt przewoźnika, faktura), a pól „na wszelki wypadek” nie ma. Zakup bez konta zmniejsza ilość przechowywanych danych i jest wygodniejszy. Przewoźnik otrzymuje tylko dane potrzebne do doręczenia.
- **Podstawa:** RODO art. 5 ust. 1 lit. b–c (cel i minimalizacja), art. 6 ust. 1 lit. b (umowa), art. 6 ust. 1 lit. c (faktura, obowiązek podatkowy) [S1].
- **W demo:** pola i walidacja działają (np. format kodu pocztowego 00-000), ale dane nie są wysyłane.

### 16. Podsumowanie i przycisk zamówienia
- **Na stronie:**
  - ostatni ekran przed zamówieniem: produkty, łączna cena brutto z dostawą, sposób płatności i dostawy, przewidywany termin;
  - przy subskrypcji: kwota za każdą dostawę, częstotliwość, data następnego obciążenia, jak zrezygnować;
  - informacja o prawie odstąpienia **i jego wyjątku dla otwartych suplementów** (pkt 20);
  - ☐ **Akceptuję Regulamin*;**
  - przycisk **„Zamawiam z obowiązkiem zapłaty”**.
- **Dlaczego tak:** bezpośrednio przed zamówieniem klient musi jasno zobaczyć najważniejsze informacje, a przycisk musi jednoznacznie mówić, że zamówienie oznacza płacenie. Bez tego klient nie jest związany umową. Przy umowie odnawianej automatycznie trzeba podać czas jej trwania i zasady wypowiedzenia.
- **Podstawa:** ustawa o prawach konsumenta, art. 17 ust. 1–3 (informacje i przycisk) oraz art. 12 ust. 1 pkt 5, 9 i 16 (cena, prawo odstąpienia, umowa automatycznie przedłużana) [S2].
- **W demo:** przycisk prowadzi do ekranu płatności pokazowej (pkt 17).

### 17. Płatność
- **Na stronie:** wybór: **BLIK**, karta płatnicza, szybki przelew, Apple Pay / Google Pay. Sama płatność odbywa się **na stronie operatora płatności** (np. Stripe, PayU, Przelewy24), a nie w formularzu sklepu. Bank klienta może poprosić o dodatkowe potwierdzenie (np. w aplikacji).
- **Dlaczego tak:** sklep **nigdy nie widzi danych karty**, więc nie może ich stracić. Odpowiada za nie licencjonowany operator, a sklep spełnia najprostszy wariant standardu bezpieczeństwa kart (PCI DSS SAQ A). Dodatkowe potwierdzenie (silne uwierzytelnienie) wymagają przepisy o usługach płatniczych i obsługuje je operator. Subskrypcję z BLIK-iem można od 2026 r. obsłużyć przez Stripe (maks. 2000 zł na jedno obciążenie).
- **Podstawa:** PCI DSS v4.0.1, kryteria SAQ A [S20]; dokumentacja Stripe: cykliczny BLIK [S21]; RODO art. 28 i 32 [S1].
- **W demo:** ekran „Płatność pokazowa — żadne pieniądze nie zostały pobrane”, z wyborem metody, ale bez pól na numer karty.

### 18. Subskrypcja: zasady, zmiana, pauza, rezygnacja
- **Na stronie:** zanim klient zamówi, widzi wprost: „Płacisz X zł co N tygodni. Następna płatność: [data]. Możesz zmienić, wstrzymać lub zrezygnować w każdej chwili w panelu konta — bez opłat”. Na 3 dni przed odnowieniem przychodzi przypomnienie e-mailem. Rezygnacja zajmuje 1–2 kliknięcia w panelu (pkt 13), bez dzwonienia i bez „czy na pewno?” powtarzanego kilka razy.
- **Dlaczego tak:** UOKiK wymienia utrudnianie rezygnacji i ciche przechodzenie z darmowego okresu w płatny jako typowe manipulacje (dark patterns). Przy umowie przedłużanej automatycznie trzeba podać zasady jej trwania i wypowiedzenia. Unia przygotowuje Digital Fairness Act (projekt zapowiedziany na listopad 2026), który ma zaostrzyć zasady subskrypcji.
- **Podstawa:** ustawa o prawach konsumenta, art. 12 ust. 1 pkt 16 [S2]; ustawa o przeciwdziałaniu nieuczciwym praktykom rynkowym [S6]; UOKiK o dark patterns [S17].
- **W demo:** ✅ na `produkt.html` wybór rytmu (2/4/6/8 tyg.), data następnej dostawy, „bez przedpłaty, pauza jednym kliknięciem”, wybór dnia tygodnia dostawy (pn–pt) i plan dostaw: 3 najbliższe dostawy z datą, dniem tygodnia i kwotą plus kalendarz 4 miesięcy z zaznaczonymi dniami dostaw; pauza na styczeń przesuwa dostawę na pierwszy wybrany dzień lutego. Panel konta jeszcze nie istnieje.

### 19. Potwierdzenie zamówienia
- **Na stronie:** po zamówieniu ekran „Dziękujemy” z numerem zamówienia i informacją, że potwierdzenie zostało wysłane e-mailem. E-mail zawiera podsumowanie zamówienia, Regulamin (PDF), informacje o odstąpieniu i formularz odstąpienia.
- **Dlaczego tak:** potwierdzenie umowy musi trafić do klienta na trwałym nośniku (e-mail z załącznikami), najpóźniej przy dostawie towaru.
- **Podstawa:** ustawa o prawach konsumenta, art. 21 [S2].
- **W demo:** ekran „Dziękujemy” + podgląd przykładowego e-maila na stronie (bez wysyłki).

---

## V. Po zakupie

### 20. Odstąpienie od umowy i zwroty
- **Na stronie:** strona „Zwroty”: **14 dni na odstąpienie bez podania przyczyny**, formularz odstąpienia (do pobrania i online), zwrot pieniędzy w ciągu 14 dni tą samą metodą. Wyraźnie opisany wyjątek: **suplementy w zapieczętowanym opakowaniu po otwarciu nie podlegają zwrotowi** ze względów zdrowotnych i higienicznych, a nieotwarte można zwrócić. W panelu konta przycisk **„Odstąp od umowy tutaj”** z drugim krokiem „Potwierdź odstąpienie od umowy”.
- **Dlaczego tak:** 14-dniowe prawo odstąpienia to podstawowe prawo konsumenta przy zakupie na odległość. Wyjątek dla otwartych produktów higienicznych i spożywczych jest dozwolony, ale klient musi o nim wiedzieć **przed** zakupem. Przycisk odstąpienia wynika z dyrektywy UE, której Polska jeszcze nie wdrożyła (projekt wycofany w maju 2026), więc to wyprzedzenie przepisów i dobra praktyka.
- **Podstawa:** ustawa o prawach konsumenta, art. 27 (14 dni), art. 38 ust. 1 pkt 5 (wyjątek), załącznik nr 2 (wzór formularza) [S2]; dyrektywa (UE) 2023/2673 i jej stan wdrożenia [S22].
- **W demo:** strona „Zwroty” + formularz pokazowy.

### 21. Reklamacje
- **Na stronie:** strona „Reklamacje”: jak zgłosić niezgodność towaru z umową (formularz online lub e-mail). Termin odpowiedzi to **14 dni**, a brak odpowiedzi w tym czasie oznacza uznanie reklamacji. Odpowiedź przychodzi na trwałym nośniku (e-mail). Odpowiedzialność za niezgodność towaru z umową trwa 2 lata. **Bez** linku do unijnej platformy ODR, którą zamknięto 20.07.2025.
- **Dlaczego tak:** jasna procedura reklamacji to obowiązek i element zaufania. Nieaktualne informacje (ODR) świadczą o przestarzałym regulaminie.
- **Podstawa:** ustawa o prawach konsumenta, art. 7a (14 dni) i rozdział 5a (niezgodność towaru z umową) [S2]; UOKiK: likwidacja platformy ODR [S25].
- **W demo:** strona „Reklamacje” + formularz pokazowy.

### 22. Newsletter
- **Na stronie:** pole e-mail + osobna, **niezaznaczona** zgoda: „Chcę otrzymywać informacje o nowościach i promocjach Bio & Health e-mailem. Mogę w każdej chwili zrezygnować”. Po zapisie e-mail z linkiem potwierdzającym (double opt-in). W każdej wiadomości link „Wypisz się”.
- **Dlaczego tak:** wysyłanie informacji handlowych e-mailem wymaga wcześniejszej zgody, której nie można łączyć z akceptacją regulaminu. Potwierdzenie linkiem dowodzi, że zgodę dał właściciel adresu.
- **Podstawa:** Prawo komunikacji elektronicznej, art. 398 [S4]; RODO art. 6 ust. 1 lit. a, art. 7 [S1].
- **W demo:** formularz pokazowy, bez wysyłki.

---

## VI. Dokumenty

### 23. Regulamin
- **Na stronie:** osobna strona + PDF do pobrania. Zawiera: dane sprzedawcy, rodzaje usług (sklep, konto, subskrypcja, newsletter), wymagania techniczne, zasady zawierania umowy, ceny i płatności, dostawę, subskrypcję (trwanie, zmiana, wypowiedzenie), odstąpienie i jego wyjątki, reklamacje, zakaz treści bezprawnych w opiniach, zmiany regulaminu.
- **Dlaczego tak:** sklep internetowy musi udostępnić regulamin **przed** zawarciem umowy, bezpłatnie i w formie, którą można pobrać i zapisać. Zapisy niezgodne z ustawą o prawach konsumenta są nieważne, a UOKiK może uznać je za niedozwolone.
- **Podstawa:** UŚUDE, art. 8 [S3]; ustawa o prawach konsumenta [S2].
- **W demo:** pełny wzorcowy regulamin z dopiskiem „Wzór — dokument pokazowy”.

### 24. Polityka prywatności
- **Na stronie:** osobna strona, prostym językiem, z tabelą „jakie dane, po co, na jakiej podstawie, jak długo”. Zawiera: administratora i kontakt, cele i podstawy prawne, odbiorców (hosting, operator płatności, przewoźnik, biuro rachunkowe, dostawca e-maili), informację o przekazywaniu danych poza EOG i jego podstawie, okresy przechowywania (np. faktury 5 lat), prawa użytkownika i prawo skargi do Prezesa UODO.
- **Dlaczego tak:** to obowiązek informacyjny RODO. Musi być zwięzły, przejrzysty i zrozumiały, więc najlepiej sprawdza się układ tabeli i prosty język.
- **Podstawa:** RODO art. 12–14 [S1].
- **W demo:** pełny wzór polityki z fikcyjnym administratorem i dopiskiem „dokument pokazowy”. Osobno strona „Informacje i prywatność” o tym, że demo nie zbiera danych (✅ już jest).

### 25. Polityka cookies
- **Na stronie:** tabela: nazwa, dostawca, cel, czas przechowywania, kategoria (niezbędne, analityczne, marketingowe). Link do „Ustawień cookies”.
- **Dlaczego tak:** użytkownik musi zostać poinformowany o celu przechowywania informacji na swoim urządzeniu w sposób jednoznaczny, łatwy i zrozumiały.
- **Podstawa:** Prawo komunikacji elektronicznej, art. 399 ust. 1 pkt 1 [S4]; raport EROD o banerach [S15].
- **W demo:** tabela opisuje, co używałby prawdziwy sklep, z adnotacją, że demo zapisuje tylko wybór z baneru i koszyk.

### 26. Kontakt
- **Na stronie:** e-mail, telefon z godzinami pracy i formularz kontaktowy (imię, e-mail, wiadomość, link do polityki prywatności).
- **Dlaczego tak:** klient musi mieć możliwość szybkiego i bezpośredniego kontaktu ze sprzedawcą. Formularz zbiera tylko to, co potrzebne do odpowiedzi.
- **Podstawa:** UŚUDE, art. 5 [S3]; ustawa o prawach konsumenta, art. 12 ust. 1 pkt 3 [S2]; RODO art. 13 [S1].
- **W demo:** dane fikcyjne, formularz pokazowy.

---

## VII. Technika

### 27. Bezpieczeństwo strony
- **Na stronie:** to element niewidoczny, ale obecny wszędzie:
  - polityka bezpieczeństwa treści (CSP): przeglądarka uruchamia tylko pliki sklepu;
  - brak zewnętrznych skryptów i czcionek (np. Google Fonts, które według wyroku sądu w Monachium przekazują Google adres IP bez zgody);
  - biblioteki w przypiętych, sprawdzonych wersjach z automatycznymi alertami o lukach;
  - w prawdziwym sklepie dodatkowo HTTPS, kopie zapasowe, MFA dla administratorów i procedura zgłoszenia wycieku danych do UODO w 72 godziny.
- **Dlaczego tak:** RODO wymaga zabezpieczeń odpowiednich do ryzyka. Mniej zewnętrznego kodu to mniej miejsc, przez które można zaatakować stronę lub wyprowadzić dane, i mniej danych przekazywanych innym firmom.
- **Podstawa:** RODO art. 25 (ochrona danych w fazie projektowania), art. 32 (bezpieczeństwo), art. 33 (zgłoszenie naruszenia) [S1]; PCI DSS v4.0.1, ochrona przed złośliwymi skryptami [S20]; wyrok LG München [S26].
- **W demo:** ✅ CSP, brak zewnętrznych zasobów i przypięte wersje już działają w szkielecie.

---

## Źródła

**Polskie ustawy i rozporządzenia** (ISAP, Internetowy System Aktów Prawnych)
- **[S2]** [Ustawa z 30 maja 2014 r. o prawach konsumenta](https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20140000827) (tekst jednolity: Dz.U. 2026 poz. 1244)
- **[S3]** [Ustawa z 18 lipca 2002 r. o świadczeniu usług drogą elektroniczną (UŚUDE)](https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20021441204)
- **[S4]** [Ustawa z 12 lipca 2024 r. — Prawo komunikacji elektronicznej (PKE)](https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20240001221)
- **[S5]** [Ustawa z 9 maja 2014 r. o informowaniu o cenach towarów i usług](https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20140000915) (tekst jednolity: Dz.U. 2023 poz. 168)
- **[S6]** [Ustawa z 23 sierpnia 2007 r. o przeciwdziałaniu nieuczciwym praktykom rynkowym](https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20071711206) (tekst jednolity: Dz.U. 2023 poz. 845)
- **[S7]** [Ustawa z 25 sierpnia 2006 r. o bezpieczeństwie żywności i żywienia](https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20061711225)
- **[S8]** [Rozporządzenie Ministra Zdrowia z 9 października 2007 r. w sprawie składu oraz oznakowania suplementów diety](https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20071961425)
- **[S12]** [Ustawa z 26 kwietnia 2024 r. o zapewnianiu spełniania wymagań dostępności niektórych produktów i usług przez podmioty gospodarcze](https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20240000731) · [WCAG 2.1 (W3C)](https://www.w3.org/TR/WCAG21/)
- **[S14]** [Kodeks cywilny](https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19640160093) (art. 11, 20)

**Prawo UE** (EUR-Lex)
- **[S1]** [Rozporządzenie (UE) 2016/679 (RODO)](https://eur-lex.europa.eu/legal-content/PL/TXT/?uri=CELEX:32016R0679)
- **[S9]** [Rozporządzenie (UE) nr 1169/2011 w sprawie przekazywania konsumentom informacji na temat żywności](https://eur-lex.europa.eu/legal-content/PL/TXT/?uri=CELEX:32011R1169)
- **[S10]** [Rozporządzenie (WE) nr 1924/2006 w sprawie oświadczeń żywieniowych i zdrowotnych](https://eur-lex.europa.eu/legal-content/PL/TXT/?uri=CELEX:32006R1924)
- **[S11]** [Rozporządzenie (UE) nr 432/2012 (wykaz dozwolonych oświadczeń)](https://eur-lex.europa.eu/legal-content/PL/TXT/?uri=CELEX:32012R0432) · [Rejestr oświadczeń zdrowotnych UE](https://ec.europa.eu/food/food-feed-portal/screen/health-claims/eu-register)
- **[S13]** [Rozporządzenie (UE) 2024/1689 (AI Act)](https://eur-lex.europa.eu/legal-content/PL/TXT/?uri=CELEX:32024R1689), art. 50 · [omówienie: art. 50 obowiązuje od 2.08.2026](https://www.praxikon.com/en/posts/article-50-transparency-deadline-2-august-2026)
- **[S22]** [Dyrektywa (UE) 2023/2673](https://eur-lex.europa.eu/legal-content/PL/TXT/?uri=CELEX:32023L2673) · [prawo.pl, 9.06.2026: stan wdrożenia w Polsce](https://www.prawo.pl/biznes/zwrot-jednym-kliknieciem-kto-i-kiedy-musi-wdrozyc,1546214.html)
- **[S24]** [Rozporządzenie (UE) 2022/2065 (DSA)](https://eur-lex.europa.eu/legal-content/PL/TXT/?uri=CELEX:32022R2065)

**Orzecznictwo i wytyczne organów**
- **[S15]** [EROD (EDPB): raport grupy roboczej ds. banerów cookies (2023)](https://www.edpb.europa.eu/our-work-tools/our-documents/other/report-work-undertaken-cookie-banner-taskforce_en)
- **[S16]** [TSUE, wyrok z 1.10.2019, C-673/17 Planet49](https://curia.europa.eu/juris/liste.jsf?num=C-673/17)
- **[S17]** [UOKiK: dark patterns](https://uokik.gov.pl/en/tag/dark-patterns)
- **[S23]** [GIS: suplementy diety](https://www.gov.pl/web/gis/suplementy-diety) · [Rejestr produktów GIS](https://rejestrzp.gis.gov.pl/) · [prawo.pl, 6.07.2026: regulacje suplementów](https://www.prawo.pl/zdrowie/czy-beda-nowe-regulacje-w-sprawie-suplementow-diety,1547821.html)
- **[S25]** [prawo.pl: UOKiK o likwidacji platformy ODR](https://www.prawo.pl/biznes/uokik-e-sklepy-musza-zmienic-zapisy-o-platformie-odr,531199.html)
- **[S26]** [LG München, 20.01.2022: Google Fonts a RODO (omówienie)](https://www.theregister.com/2022/01/31/website_fine_google_fonts_gdpr/)

**Standardy bezpieczeństwa i płatności**
- **[S18]** [OWASP Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)
- **[S19]** [NIST SP 800-63B-4](https://pages.nist.gov/800-63-4/sp800-63b.html)
- **[S20]** [PCI DSS v4.0.1 i SAQ A: wyjaśnienie (Report URI)](https://blog.report-uri.com/pci-dss-4-0-1-saq-a-and-client-side-security-a-plain-english-faq/)
- **[S21]** [Stripe: cykliczne płatności BLIK](https://docs.stripe.com/payments/blik/recurring-payments)

Numery artykułów polskich ustaw sprawdzono 30.10.2026 w aktualnych tekstach z bazy Sejmu (api.sejm.gov.pl). Szerszy research z kontekstem jest w folderze [`docs/`](docs/).
