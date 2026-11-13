# 02. Prawo i zgodność: RODO, cookies, prawa konsumenta, suplementy

*Stan na 30.10.2026. To zestawienie z researchu, **nie porada prawna**. Przed uruchomieniem prawdziwego sklepu trzeba to przejść z prawnikiem i księgową.*

> **Wersja zbiorcza:** [`ZGODNOSC-Z-PRAWEM.md`](../ZGODNOSC-Z-PRAWEM.md) opisuje element po elemencie, co zawiera strona i dlaczego to legalne. Ten plik to szerszy research w tle.

## Najważniejsze rozróżnienie: demo czy prawdziwy sklep

Większość obowiązków zależy od tego, czy strona **naprawdę sprzedaje** i **zbiera dane**.

| Obowiązek | Wersja A: sklep pokazowy (praktyki) | Wersja B: prawdziwy sklep |
|---|---|---|
| Wyraźna informacja „to nie jest sklep” | ✅ **tak** (pasek na każdej stronie) | — |
| RODO: administrator, klauzule, rejestr | Nie, jeśli **nie zbieramy danych** | ✅ pełne |
| Baner cookies | Nie, jeśli **nie ma cookies ani zewnętrznych skryptów** | ✅ jeśli są analityka lub marketing |
| Regulamin, prawo odstąpienia, reklamacje | Nie | ✅ |
| Sanepid, powiadomienie GIS, etykiety | Nie | ✅ |
| Oświadczenia zdrowotne tylko z listy UE | ✅ **tak, również w demo** (to publiczna treść i dobra praktyka) | ✅ |
| Dostępność (WCAG) | Dobra praktyka | ✅ (z wyjątkiem dla mikrofirm, zob. niżej) |
| Oznaczenie treści z AI | ✅ wymóg praktyk + AI Act | ✅ |
| Licencje zdjęć, fontów, modeli 3D | ✅ | ✅ |
| Nazwa marki niekolidująca z cudzą | ✅ sprawdzić | ✅ zgłosić znak |

Dalej najpierw to, co dotyczy demo, a potem pełny zakres dla prawdziwego sklepu.

---

## A. Sklep pokazowy: co musi być

1. **Pasek „Sklep pokazowy — projekt studencki”** na każdej stronie. Bez niego realistyczny sklep z cenami może kogoś wprowadzić w błąd. Jest w szkielecie.
2. **Zero zbierania danych.** Żadnych formularzy, które coś wysyłają, prawdziwych kont ani płatności. Funkcje pokazowe (koszyk, „logowanie”, ankieta) działają tylko w przeglądarce. GitHub Pages i tak zabrania przesyłania haseł i numerów kart (zob. [03](03-platnosci.md)).
3. **Zero cookies i zewnętrznych skryptów = brak baneru.** Nie wklejamy Google Analytics, pikseli Mety, czatów, map ani fontów z Google. Wszystko trzymamy lokalnie w repo. (Sąd w Monachium w 2022 r. uznał, że fonty Google ładowane z serwera Google bez zgody przekazują Google adres IP, czyli dane osobowe).
4. **localStorage** (np. koszyk pokazowy) to też zapisywanie informacji na urządzeniu użytkownika. Jest jednak zwolnione ze zgody, jeśli jest **niezbędne do funkcji, o którą prosi użytkownik**. Opisujemy to na stronie „Informacje i prywatność”.
5. **Strona „Informacje i prywatność”:** czym jest strona, że nie zbieramy danych, że GitHub loguje adresy IP odwiedzających w celach bezpieczeństwa (według jego dokumentacji), oznaczenie AI. Jest w szkielecie (`informacje.html`).
6. **Treści o suplementach zgodne z prawem także w demo.** Tylko dozwolone oświadczenia zdrowotne (zob. sekcję D), bez obietnic typu „leczy” czy „wzmacnia odporność w 3 dni”. Produkty i ceny opisane jako przykładowe.
7. **Bez cudzych marek.** Żadnych prawdziwych logo ani nazw produktów konkurencji. Nazwę roboczą przed szerszym użyciem sprawdzić w bazach znaków towarowych: [UPRP](https://ewyszukiwarka.pue.uprp.gov.pl/) i [TMview (EUIPO)](https://www.tmdn.org/tmview/).
8. **Licencje materiałów.** Zdjęcia z Pexels/Unsplash (licencja pozwala), fonty na licencji OFL, modele 3D na CC0/CC-BY (przy CC-BY podpisać autora). W `README` prowadzimy listę źródeł.
9. **Oznaczenie AI.** Praktyki wymagają oznaczania treści z AI, a AI Act (art. 50) od 2.08.2026 wymaga m.in. ujawniania, że rozmawia się z chatbotem, i oznaczania realistycznych grafik/wideo z AI. W stopce: „Przygotowano z pomocą AI”, a pod grafikami AI podpis.
10. **`noindex`.** Demo nie powinno trafiać do Google jako „sklep”. Do zmiany, jeśli na potrzeby BC6 (SEO) zechcemy pokazać indeksowanie.

---

## B. RODO (prawdziwy sklep)

**Administrator danych (ADO)** to firma prowadząca sklep: nazwa, adres, NIP i kontakt muszą być w polityce prywatności. Szczegółowa mapa danych, ról i logowania jest w [04](04-logowanie-i-dane.md).

Podstawowe obowiązki:

- **Obowiązek informacyjny (art. 13)** przy zbieraniu danych: kto jest administratorem, w jakich celach i na jakiej podstawie przetwarza dane, kto jest odbiorcą, czy dane trafiają poza EOG, jak długo są przechowywane, jakie prawa ma użytkownik, prawo skargi do Prezesa UODO, czy podanie danych jest dobrowolne.
- **Podstawy prawne według celu:** umowa (art. 6 ust. 1 lit. b): realizacja zamówienia i subskrypcji. Obowiązek prawny (lit. c): księgowość i podatki. Prawnie uzasadniony interes (lit. f): dochodzenie roszczeń, bezpieczeństwo, marketing własnych produktów do klientów. Zgoda (lit. a): newsletter, cookies marketingowe.
- **⚠️ Dane o zdrowiu (art. 9).** Ankieta „dobierz suplementy” może łatwo zebrać dane szczególnej kategorii: choroby, ciążę, leki, alergie. To wymaga **wyraźnej zgody**, oceny skutków (DPIA), a przy dużej skali może wymagać inspektora ochrony danych (IOD). **Zalecenie:** ankieta pyta tylko o cel (redukcja, masa, trening) i preferencje (smak, forma), bez pytań o stan zdrowia.
- **Dzieci:** w Polsce zgodę na usługi online samodzielnie wyraża osoba od 16 lat (art. 8). Sklep z suplementami najlepiej kierować do pełnoletnich.
- **Umowy powierzenia (art. 28)** z każdym, kto przetwarza dane w naszym imieniu: hosting, dostawca logowania, mailing, biuro rachunkowe, helpdesk.
- **Transfer poza EOG.** Usługi z USA działają na podstawie EU-US Data Privacy Framework (DPF). Sąd UE utrzymał DPF we wrześniu 2025 r., ale odwołanie (sprawa C-703/25 P) czeka na wyrok TSUE. **Zalecenie:** wybierać regiony w UE (np. Frankfurt) i dostawców ze standardowymi klauzulami umownymi jako planem B.
- **Rejestr czynności przetwarzania (art. 30).** Sklep go potrzebuje, bo przetwarza dane stale, a nie sporadycznie. Wyjątek dla firm poniżej 250 osób tu nie działa.
- **Naruszenia:** zgłoszenie do UODO w ciągu 72 godzin (art. 33). Potrzebna prosta procedura „co robimy, gdy wyciekną dane”.
- **Privacy by design (art. 25):** zbieramy minimum danych, bez pól „na wszelki wypadek”.

---

## C. Cookies i podobne technologie

- **Podstawa prawna:** Prawo komunikacji elektronicznej (PKE), art. 399–400, obowiązuje od 10.11.2024 r. i zastąpiło art. 173 Prawa telekomunikacyjnego.
- **Zasada:** na zapisanie czegokolwiek na urządzeniu użytkownika (cookies, localStorage, piksele, fingerprinting) potrzebna jest **wcześniejsza zgoda**. Wyjątek to rzeczy **niezbędne** do usługi, o którą prosi użytkownik: koszyk, sesja logowania, bezpieczeństwo, zapamiętanie wyboru zgody.
- **Dobry baner:** nic nie ładuje się przed zgodą. Przyciski „Odrzuć” i „Akceptuj” są równie łatwe w użyciu. Zgody są osobne dla analityki i marketingu. Zgodę da się cofnąć linkiem w stopce. Narzędzia Google wymagają Consent Mode v2.
- **Kto pilnuje:** w literaturze jest spór, czy właściwy jest Prezes UKE (PKE), czy Prezes UODO (gdy w grę wchodzą dane osobowe). W praktyce trzeba spełnić wymagania obu.
- **Najprostsze rozwiązanie:** brak cookies poza niezbędnymi oznacza, że baner nie jest potrzebny. Jeśli kiedyś będzie potrzebna analityka, można rozważyć narzędzia bez cookies (np. Plausible, Umami), ale to nadal przetwarzanie IP, które trzeba opisać w polityce prywatności.

---

## D. Suplementy diety i odżywki

**Suplement diety jest środkiem spożywczym, nie lekiem.** Obowiązuje go prawo żywnościowe: ustawa o bezpieczeństwie żywności i żywienia (UBŻŻ) i przepisy UE.

| Temat | Co mówi prawo | Co to znaczy dla sklepu |
|---|---|---|
| **Rejestracja w Sanepidzie** | Działalność w zakresie żywności, także sprzedaż przez internet, wymaga wpisu do rejestru zakładów PIS. Przy sprzedaży na odległość **bez magazynowania** zatwierdzenie nie jest wymagane, wystarczy wpis | Wniosek do powiatowej stacji sanepidu **przed** startem sprzedaży |
| **Powiadomienie GIS** | Pierwsze wprowadzenie suplementu na rynek w Polsce wymaga powiadomienia Głównego Inspektora Sanitarnego (art. 29 UBŻŻ). GIS niczego nie zatwierdza, tylko odnotowuje zgłoszenie | Przy **marce własnej** obowiązek jest nasz. Przy odsprzedaży cudzych produktów sprawdzamy, czy są w rejestrze produktów GIS. Trwa nowelizacja: zgłoszenia mają przejść przez e-Sanepid |
| **Oznakowanie** | Rozporządzenie MZ z 9.10.2007 r. o składzie i oznakowaniu suplementów. Obowiązkowe m.in.: „suplement diety”, zalecana porcja, „nie przekraczać zalecanej porcji do spożycia w ciągu dnia”, „suplement diety nie może być stosowany jako substytut zróżnicowanej diety”, „przechowywać w sposób niedostępny dla małych dzieci” | Te same informacje na karcie produktu w sklepie |
| **Sprzedaż na odległość** | Art. 14 rozp. (UE) 1169/2011: **wszystkie obowiązkowe informacje o żywności** (skład, alergeny, ilość netto, warunki przechowywania, dane podmiotu itd.) muszą być dostępne **przed zakupem**. Wyjątkiem jest data minimalnej trwałości | Karta produktu = pełna etykieta w HTML, nie tylko zdjęcie etykiety |
| **Oświadczenia zdrowotne** | Wolno używać tylko oświadczeń z rejestru UE (rozp. 1924/2006 i 432/2012), na warunkach tam określonych. **Nie wolno** przypisywać żywności właściwości zapobiegania chorobom ani ich leczenia (art. 7 ust. 3 rozp. 1169/2011) | Dotyczy opisów, bloga, social mediów, influencerów **i odpowiedzi chatbota**. Np. dozwolone: „Białko przyczynia się do wzrostu masy mięśniowej” (przy spełnieniu warunków). Niedozwolone: „leczy”, „chroni przed przeziębieniem” |
| **Reklama** | Brak osobnej ustawy. Projekt z 2025 r. (m.in. zakaz wizerunku lekarzy) **porzucono**. Ministerstwo zapowiada „kolejną nowelizację” bez szczegółów (prawo.pl, 6.07.2026). Od końca 2025 r. sanepid monitoruje strony sprzedające suplementy | Ogólne zasady: nie wprowadzać w błąd, nie sugerować, że dieta nie wystarcza, bez fałszywych autorytetów |
| **Odżywki (np. białko)** | Zwykle żywność ogólnego spożycia albo suplement. Te same zasady oświadczeń | Jak wyżej |

**Dla treści na praktyki (BC6, content/SEO):** pisząc opisy produktów, korzystamy z [rejestru oświadczeń UE](https://ec.europa.eu/food/food-feed-portal/screen/health-claims/eu-register). To wygląda profesjonalnie i chroni przed wpadką.

---

## E. Prawa konsumenta (prawdziwy sklep)

- **Regulamin** dostępny przed zawarciem umowy (ustawa o świadczeniu usług drogą elektroniczną, art. 8), bezpłatny, możliwy do pobrania.
- **Informacje przed zakupem** (ustawa o prawach konsumenta, art. 12): dane firmy, cechy produktu, cena z podatkami i kosztami dostawy, płatność, prawo odstąpienia, reklamacje.
- **Przycisk zamówienia** z napisem „Zamówienie z obowiązkiem zapłaty” lub równoważnym (art. 17). Potwierdzenie umowy na trwałym nośniku (e-mail).
- **14 dni na odstąpienie od umowy** bez podania przyczyny. **Ważny wyjątek dla suplementów** (art. 38 pkt 5): rzecz dostarczona w zapieczętowanym opakowaniu, której po otwarciu nie można zwrócić ze względów zdrowotnych lub higienicznych, traci prawo zwrotu **po otwarciu**. Trzeba o tym jasno poinformować przed zakupem. Nieotwarte produkty można zwrócić. Zwrot pieniędzy następuje w ciągu 14 dni.
- **Niezgodność towaru z umową** (dawniej rękojmia): 2 lata, procedura reklamacji w regulaminie.
- **Ceny (Omnibus):** przy każdej obniżce trzeba podać najniższą cenę z 30 dni przed obniżką. Przy opiniach trzeba napisać, czy i jak sprawdzamy, że pochodzą od kupujących. Fałszywe opinie są zakazane.
- **Platforma ODR** została zamknięta 20.07.2025. Linku do niej **już nie zamieszczamy**, a stare wzory regulaminów trzeba poprawić.
- **„Przycisk odstąpienia od umowy”** (dyrektywa 2023/2673): UE przewidziała stosowanie od 19.06.2026. **Polska nie wdrożyła jeszcze dyrektywy**, a projekt wycofano w maju 2026 r. (prawo.pl, 9.06.2026), więc obowiązek jeszcze nie działa. Warto jednak od razu projektować sklep z funkcją „Odstąp od umowy tutaj” i potwierdzeniem.
- **Subskrypcja: zasady UOKiK przeciw dark patterns:**
  - cena za okres, częstotliwość i termin kolejnego obciążenia widoczne przed zakupem;
  - rezygnacja tak łatwa jak zapis (w koncie, bez dzwonienia);
  - przypomnienie e-mailem przed odnowieniem (dobra praktyka);
  - darmowy okres próbny nie zamienia się „po cichu” w płatny;
  - żadnych produktów dodawanych do koszyka automatycznie.
  - Na listopad 2026 Komisja Europejska zapowiada projekt **Digital Fairness Act**. Ma on uregulować m.in. subskrypcje i manipulacyjny design.

---

## F. Dostępność (European Accessibility Act)

- **Polski Akt o Dostępności** (ustawa z 26.04.2024, Dz.U. 2024 poz. 731) obowiązuje od **28.06.2025**. Obejmuje usługi handlu elektronicznego, czyli sklepy internetowe.
- **Mikroprzedsiębiorcy** (poniżej 10 osób i do 2 mln euro obrotu) świadczący usługi są **wyłączeni**. Według opinii RPO z lutego 2026 projekt rozporządzenia może jednak wymagać od nich „dostępu alternatywnego”. Do obserwowania.
- **Standard techniczny:** WCAG 2.1 AA (norma EN 301 549). Robimy to niezależnie od wyłączenia. To dobra praktyka i duża część oceny jakości.
- **Przy stronie 3D to szczególnie ważne:** `prefers-reduced-motion`, obsługa klawiaturą, kontrast, tekst w HTML, alternatywa dla treści z animacji (zob. [01](01-narzedzia-3d.md)).

---

## G. Pozostałe przepisy

- **AI Act, art. 50 (od 2.08.2026):** chatbot „doradca suplementów” musi się przedstawić jako AI. Realistyczne obrazy i wideo z AI trzeba oznaczyć. Pakiet „Digital Omnibus” (rozp. 2026/1744) przesunął obowiązki dla systemów wysokiego ryzyka, **ale nie art. 50**.
- **Newsletter:** wysyłka informacji handlowych e-mailem i SMS-em wymaga wcześniejszej zgody (PKE art. 398 + RODO). Dobra praktyka to potwierdzenie zapisu linkiem (double opt-in) i link „wypisz się” w każdej wiadomości.
- **DSA:** jeśli użytkownicy mogą publikować opinie lub komentarze, potrzebny jest mechanizm zgłaszania nielegalnych treści i punkt kontaktowy. Mikro i małe firmy są zwolnione z części obowiązków.
- **GPSR** (ogólne bezpieczeństwo produktów, od 13.12.2024) **nie dotyczy żywności**, ale dotyczy np. shakerów i gadżetów. Przy takich produktach podajemy dane producenta, identyfikację produktu i ostrzeżenia.
- **Formalności firmowe:** forma działalności, kasa fiskalna (zwolnienie przy sprzedaży wysyłkowej z płatnością na rachunek, pod warunkami), faktury B2B przez KSeF (obowiązkowy od 2026 r.). To temat dla księgowej.

## Źródła

- RODO: [tekst rozporządzenia (EUR-Lex)](https://eur-lex.europa.eu/legal-content/PL/TXT/?uri=CELEX:32016R0679)
- Cookies / PKE: [art. 398–400 PKE (opracowanie)](https://edlaw.eduverse.com/docs/jurisdiction/nat/pl/pke) · [prawo.pl o organie właściwym](https://www.prawo.pl/biznes/zgoda-na-cookies-udzielona-przez-ustawienie-przegladarki,512328.html)
- Google Fonts: [LG München, 20.01.2022 (omówienie)](https://www.theregister.com/2022/01/31/website_fine_google_fonts_gdpr/)
- DPF: [WilmerHale: TSUE rozpatrzy odwołanie](https://www.wilmerhale.com/insights/blogs/wilmerhale-privacy-and-cybersecurity-law/20251201-european-court-of-justice-to-review-challenge-to-eu-us-data-privacy-framework) · [tracker DPF](https://streamlex.eu/resources/dpf-developments-tracker/)
- Suplementy: [prawo.pl, 6.07.2026: czy będą nowe regulacje](https://www.prawo.pl/zdrowie/czy-beda-nowe-regulacje-w-sprawie-suplementow-diety,1547821.html) · [WSSE Warszawa: suplementy diety](https://www.gov.pl/web/wsse-warszawa/obzzik-suplementy-diety) · [Rejestr oświadczeń zdrowotnych UE](https://ec.europa.eu/food/food-feed-portal/screen/health-claims/eu-register) · [rpms.pl: zgłoszenie do GIS](https://rpms.pl/jak-zgodnie-z-prawem-zglosic-suplement-diety-do-gis/)
- Przycisk odstąpienia: [prawo.pl, 9.06.2026: rząd wycofał projekt](https://www.prawo.pl/biznes/zwrot-jednym-kliknieciem-kto-i-kiedy-musi-wdrozyc,1546214.html)
- ODR: [UOKiK przez prawo.pl: e-sklepy muszą zmienić zapisy](https://www.prawo.pl/biznes/uokik-e-sklepy-musza-zmienic-zapisy-o-platformie-odr,531199.html)
- Dark patterns: [UOKiK: tag dark patterns](https://uokik.gov.pl/en/tag/dark-patterns) · [Digital Fairness Act: prognoza na listopad 2026](https://www.privacylaws.com/news/eu-proposal-on-digital-fairness-act-expected-by-the-end-of-2026/)
- Dostępność: [Shoper: Polski Akt o Dostępności a sklepy](https://www.shoper.pl/learn/artykul/polski-akt-o-dostepnosci-wplynie-na-sklepy-internetowe) · [opinia RPO, luty 2026](https://bip.brpo.gov.pl/sites/default/files/2026-02/Do_MC_ozn_rozporzadzenie_projekt_komunikacja_elektroniczna_2_02_2026.pdf)
- AI Act: [art. 50 obowiązuje od 2.08.2026](https://www.praxikon.com/en/posts/article-50-transparency-deadline-2-august-2026) · [Gibson Dunn: Digital Omnibus](https://www.gibsondunn.com/eu-ai-act-omnibus-agreement-postponed-high-risk-deadlines-and-other-key-changes/)
