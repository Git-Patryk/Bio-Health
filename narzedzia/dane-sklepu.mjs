// Dane działów sklepu i poradnika (BC6: SEO / GEO).
// Nazwy działów i podkategorii = słowa kluczowe wybrane na podstawie Google Trends
// (Polska, ostatnie 12 mies., odczyt 26.11.2026). Szczegóły: folder „Business Case 6 – Content SEO i GEO”.
// Produkty i ceny są przykładowe (sklep pokazowy). Oświadczenia zdrowotne tylko z unijnego wykazu
// (rozp. 1924/2006 i 432/2012).

export const ADRES = 'https://git-patryk.github.io/Bio-Health/';

export const KATEGORIE = [
  {
    slug: 'bialko',
    menu: 'Białko',
    h1: 'Białko',
    title: 'Białko (protein) w proszku: WPC 80, WPI 90, roślinne — Bio & Health (sklep pokazowy)',
    desc: 'Białko w proszku w subskrypcji: koncentrat WPC 80, izolat WPI 90, białko roślinne i gainer. Dostawa co 2–8 tygodni. Sklep pokazowy, projekt studencki.',
    lead: 'Białko w proszku (po angielsku <i>protein</i>) to najprostszy sposób, żeby dobić do dziennej porcji białka: miarka, woda, trzydzieści sekund. Do wyboru koncentrat WPC 80, izolat WPI 90, białko roślinne i gainer — każde także w subskrypcji.',
    produkty: [
      { id: 'bialko-wpc-80', menu: 'Białko WPC 80', nazwa: 'Białko serwatkowe WPC 80, 900 g', opis: '22,5 g białka w porcji, 6 smaków. Najczęściej wybierane.', cena: 109, etykieta: 'WPC 80', ksztalt: 'puszka', link: './produkt.html' },
      { id: 'bialko-wpi-90', menu: 'Białko WPI 90 (izolat)', nazwa: 'Izolat białka WPI 90, 700 g', opis: 'Co najmniej 90% białka, mniej laktozy niż w koncentracie.', cena: 129, etykieta: 'WPI 90', ksztalt: 'puszka' },
      { id: 'bialko-roslinne', menu: 'Białko roślinne', nazwa: 'Białko roślinne z grochu i ryżu, 750 g', opis: 'Bez nabiału. Smak kakao albo naturalny.', cena: 99, etykieta: 'VEGE', ksztalt: 'puszka' },
      { id: 'gainer', menu: 'Gainer', nazwa: 'Gainer węglowodanowo-białkowy, 1500 g', opis: 'Dla osób, którym trudno zjeść tyle, ile potrzebują przy budowie masy.', cena: 89, etykieta: 'GAINER', ksztalt: 'puszka' },
    ],
    pytania: [
      {
        q: 'Które białko wybrać: WPC czy WPI?',
        a: 'Na co dzień wystarczy WPC 80 — koncentrat z ok. 80% białka, tańszy i smaczniejszy. Izolat WPI 90 ma co najmniej 90% białka i mniej laktozy, więc wybierz go, jeśli laktoza Ci nie służy.',
        ctx: 'Białko roślinne (groch + ryż) jest dla osób, które nie jedzą nabiału.',
      },
      {
        q: 'Ile białka dziennie potrzebuje osoba trenująca?',
        a: 'Według Międzynarodowego Towarzystwa Żywienia Sportowego (ISSN, 2017) większości trenujących wystarcza 1,4–2,0 g białka na kilogram masy ciała dziennie.',
        ctx: 'Ogólne zalecenie dla dorosłych to 0,83 g/kg (EFSA, 2012). Policz swoje w kalkulatorze: <a class="slowo" href="./bialko-na-redukcji.html#kalkulator">Białko na redukcji</a>.',
      },
    ],
    przypis: 'Białko przyczynia się do wzrostu masy mięśniowej i do utrzymania masy mięśniowej (oświadczenie zdrowotne z wykazu UE). Suplement diety nie zastąpi zróżnicowanej diety.',
    porady: ['bialko-na-redukcji', 'kreatyna-jak-brac'],
  },
  {
    slug: 'kreatyna',
    menu: 'Kreatyna',
    h1: 'Kreatyna i odżywki treningowe',
    title: 'Kreatyna monohydrat, przedtreningówka, BCAA, elektrolity — Bio & Health (sklep pokazowy)',
    desc: 'Kreatyna monohydrat w proszku i kapsułkach, przedtreningówka, BCAA i elektrolity. Także w subskrypcji. Sklep pokazowy, projekt studencki.',
    lead: '<b>Kreatyna monohydrat</b> to najlepiej przebadany suplement dla osób trenujących. Kreatyna zwiększa wydolność fizyczną podczas kolejnych krótkotrwałych serii bardzo intensywnych ćwiczeń; korzystne działanie występuje przy spożyciu 3 g dziennie. Obok niej: przedtreningówka, BCAA i elektrolity na długi trening.',
    produkty: [
      { id: 'kreatyna-monohydrat', menu: 'Kreatyna monohydrat', nazwa: 'Kreatyna monohydrat, 500 g', opis: 'Czysty monohydrat, bez smaku. 166 porcji po 3 g.', cena: 59, etykieta: 'KREATYNA', ksztalt: 'puszka' },
      { id: 'kreatyna-kapsulki', menu: 'Kreatyna w kapsułkach', nazwa: 'Kreatyna monohydrat w kapsułkach, 240 kaps.', opis: 'Ta sama kreatyna, wygodniej w podróży.', cena: 64, etykieta: 'KREATYNA', ksztalt: 'butelka' },
      { id: 'przedtreningowka', menu: 'Przedtreningówka', nazwa: 'Przedtreningówka z kofeiną, 300 g', opis: 'Zawiera kofeinę. Nie dla dzieci i kobiet w ciąży.', cena: 79, etykieta: 'PRE', ksztalt: 'puszka' },
      { id: 'bcaa', menu: 'BCAA', nazwa: 'BCAA 2:1:1, 400 g', opis: 'Aminokwasy rozgałęzione, smak cytrynowy.', cena: 69, etykieta: 'BCAA', ksztalt: 'puszka' },
      { id: 'elektrolity', menu: 'Elektrolity (izotonik)', nazwa: 'Elektrolity — izotonik w proszku, 20 saszetek', opis: 'Sód, potas i magnez do picia przy długim treningu.', cena: 39, etykieta: 'ELEKTRO', ksztalt: 'pudelko' },
    ],
    pytania: [
      {
        q: 'Ile kreatyny dziennie?',
        a: '3–5 g dziennie, codziennie — także w dni bez treningu (ISSN, 2017). Faza nasycenia nie jest konieczna.',
        ctx: 'Więcej w poradniku <a class="slowo" href="./kreatyna-jak-brac.html">Kreatyna: jak ją brać</a>.',
      },
      {
        q: 'Proszek czy kapsułki?',
        a: 'Działają tak samo, bo to ta sama kreatyna monohydrat. Proszek jest tańszy w przeliczeniu na porcję, kapsułki wygodniejsze poza domem.',
        ctx: '',
      },
    ],
    przypis: 'Kreatyna zwiększa wydolność fizyczną podczas kolejnych krótkotrwałych serii bardzo intensywnych ćwiczeń. Korzystne działanie występuje przy spożyciu 3 g kreatyny dziennie (oświadczenie dla dorosłych wykonujących intensywne ćwiczenia).',
    porady: ['kreatyna-jak-brac'],
  },
  {
    slug: 'witaminy',
    menu: 'Witaminy',
    h1: 'Witaminy',
    title: 'Witaminy: witamina D3, C, B12, kwas foliowy, witaminy dla dzieci — Bio & Health (sklep pokazowy)',
    desc: 'Witamina D3 na jesień i zimę, witamina C, witamina B12, kwas foliowy i witaminy dla dzieci. Dostawa w subskrypcji. Sklep pokazowy, projekt studencki.',
    lead: 'Witaminy w dawkach zgodnych z polskimi zaleceniami: <b>witamina D3</b> na jesień i zimę, witamina C, witamina B12 (ważna zwłaszcza na diecie roślinnej), kwas foliowy dla osób planujących ciążę i witaminy dla dzieci do zestawu rodzinnego.',
    produkty: [
      { id: 'witamina-d3', menu: 'Witamina D3', nazwa: 'Witamina D3 2000 j.m., 120 kaps.', opis: 'Jedna kapsułka dziennie, na 4 miesiące.', cena: 29, etykieta: 'D3', ksztalt: 'butelka' },
      { id: 'witamina-c', menu: 'Witamina C', nazwa: 'Witamina C 1000 mg, 60 tabl.', opis: 'Pomaga w prawidłowym funkcjonowaniu układu odpornościowego.', cena: 22, etykieta: 'C', ksztalt: 'butelka' },
      { id: 'witamina-b12', menu: 'Witamina B12', nazwa: 'Witamina B12, 60 tabl.', opis: 'Pomaga w zmniejszeniu uczucia zmęczenia i znużenia.', cena: 24, etykieta: 'B12', ksztalt: 'butelka' },
      { id: 'kwas-foliowy', menu: 'Kwas foliowy', nazwa: 'Kwas foliowy 400 µg, 90 tabl.', opis: 'Dla kobiet planujących ciążę — zacznij przynajmniej miesiąc przed poczęciem.', cena: 16, etykieta: 'FOLIAN', ksztalt: 'butelka' },
      { id: 'witaminy-dla-dzieci', menu: 'Witaminy dla dzieci', nazwa: 'Witaminy dla dzieci od 4 lat, 60 żelek', opis: 'Do zestawu rodzinnego, w osobnym profilu dziecka.', cena: 32, etykieta: 'KIDS', ksztalt: 'butelka' },
    ],
    pytania: [
      {
        q: 'Ile witaminy D3 dziennie przyjmować zimą?',
        a: 'Zdrowi dorośli (19–65 lat), którzy latem mało przebywają na słońcu, powinni przyjmować 1000–2000 j.m. witaminy D3 dziennie przez cały rok (polskie wytyczne, 2023).',
        ctx: 'Więcej w poradniku <a class="slowo" href="./witamina-d3-zima.html">Witamina D3 zimą</a>.',
      },
    ],
    przypis: 'Suplementacja kwasem foliowym zwiększa poziom folianów u matki. Niski poziom folianów u matki jest czynnikiem ryzyka rozwoju wad cewy nerwowej u rozwijającego się płodu. Korzystne działanie występuje przy spożyciu 400 µg kwasu foliowego dziennie przez co najmniej miesiąc przed poczęciem i do trzech miesięcy po nim.',
    porady: ['witamina-d3-zima'],
  },
  {
    slug: 'mineraly',
    menu: 'Minerały',
    h1: 'Minerały: magnez, żelazo, cynk',
    title: 'Magnez, żelazo, cynk — minerały w subskrypcji — Bio & Health (sklep pokazowy)',
    desc: 'Magnez z witaminą B6, żelazo i cynk w dawkach mieszczących się w limitach EFSA. Dostawa w subskrypcji. Sklep pokazowy, projekt studencki.',
    lead: '<b>Magnez</b> pomaga w zmniejszeniu uczucia zmęczenia i znużenia oraz w utrzymaniu prawidłowego funkcjonowania mięśni. Dawki w naszych produktach mieszczą się w limicie EFSA dla magnezu z suplementów (250 mg dziennie). Żelazo warto suplementować po badaniu krwi — jego nadmiar też szkodzi.',
    produkty: [
      { id: 'magnez', menu: 'Magnez', nazwa: 'Magnez + B6, 120 tabl.', opis: '200 mg magnezu (cytrynian) w porcji.', cena: 34, etykieta: 'Mg', ksztalt: 'butelka' },
      { id: 'zelazo', menu: 'Żelazo', nazwa: 'Żelazo 14 mg z witaminą C, 60 kaps.', opis: 'Żelazo pomaga w zmniejszeniu uczucia zmęczenia i znużenia.', cena: 21, etykieta: 'Fe', ksztalt: 'butelka' },
      { id: 'cynk', menu: 'Cynk', nazwa: 'Cynk 15 mg, 90 tabl.', opis: 'Cynk pomaga w prawidłowym funkcjonowaniu układu odpornościowego.', cena: 18, etykieta: 'Zn', ksztalt: 'butelka' },
    ],
    pytania: [],
    przypis: 'Nie przekraczaj zalecanej porcji do spożycia w ciągu dnia. Suplement diety nie może być stosowany jako substytut zróżnicowanej diety.',
    porady: ['witamina-d3-zima'],
  },
  {
    slug: 'omega-3-kolagen',
    menu: 'Omega 3 i kolagen',
    h1: 'Omega 3 i kolagen',
    title: 'Omega 3 (EPA i DHA) i kolagen z witaminą C — Bio & Health (sklep pokazowy)',
    desc: 'Omega 3 z oleju rybiego w kapsułkach i w płynie oraz kolagen z witaminą C. Dostawa w subskrypcji. Sklep pokazowy, projekt studencki.',
    lead: '<b>Omega 3</b> z oleju rybiego: EPA i DHA przyczyniają się do prawidłowego funkcjonowania serca, a korzystne działanie występuje przy spożyciu 250 mg EPA i DHA dziennie. Kolagen łączymy z witaminą C, która pomaga w prawidłowym tworzeniu kolagenu.',
    produkty: [
      { id: 'omega-3', menu: 'Omega 3', nazwa: 'Omega 3 — 1000 mg oleju rybiego, 120 kaps.', opis: '600 mg EPA i DHA w porcji.', cena: 49, etykieta: 'Ω-3', ksztalt: 'butelka' },
      { id: 'omega-3-plyn', menu: 'Omega 3 w płynie', nazwa: 'Omega 3 w płynie, 250 ml', opis: 'Smak cytrynowy, wygodny dla całej rodziny.', cena: 55, etykieta: 'Ω-3', ksztalt: 'butelka' },
      { id: 'kolagen', menu: 'Kolagen', nazwa: 'Kolagen z witaminą C, 300 g', opis: 'Hydrolizat kolagenu do rozpuszczenia w wodzie lub kawie.', cena: 74, etykieta: 'KOLAGEN', ksztalt: 'puszka' },
    ],
    pytania: [],
    przypis: 'Witamina C pomaga w prawidłowym tworzeniu kolagenu, aby zapewnić prawidłowe funkcjonowanie skóry (oświadczenie dotyczy witaminy C, nie samego kolagenu).',
    porady: ['witamina-d3-zima'],
  },
  {
    slug: 'przekaski',
    menu: 'Przekąski',
    h1: 'Musli i batony proteinowe',
    title: 'Musli i baton proteinowy — przekąski do subskrypcji — Bio & Health (sklep pokazowy)',
    desc: 'Musli bez dodatku cukrów, musli proteinowe i baton proteinowy. Dorzuć do tej samej dostawy co suplementy. Sklep pokazowy, projekt studencki.',
    lead: 'Przekąski, które dorzucisz do tej samej dostawy co suplementy: <b>musli</b> bez dodatku cukrów, musli proteinowe i <b>baton proteinowy</b> na drogę.',
    produkty: [
      { id: 'musli', menu: 'Musli', nazwa: 'Musli bez dodatku cukrów, 500 g', opis: 'Płatki owsiane, orzechy, suszone owoce.', cena: 21, etykieta: 'MUSLI', ksztalt: 'torba' },
      { id: 'musli-proteinowe', menu: 'Musli proteinowe', nazwa: 'Musli proteinowe, 500 g', opis: 'Z dodatkiem białka serwatkowego, 15 g białka w porcji.', cena: 26, etykieta: 'MUSLI+', ksztalt: 'torba' },
      { id: 'baton-proteinowy', menu: 'Baton proteinowy', nazwa: 'Baton proteinowy, 12 × 50 g', opis: '20 g białka w batonie, smak kakao i orzech.', cena: 59, etykieta: 'BATON', ksztalt: 'baton' },
    ],
    pytania: [],
    przypis: '',
    porady: ['bialko-na-redukcji'],
  },
  {
    slug: 'zestawy',
    menu: 'Zestawy',
    h1: 'Zestawy suplementów w subskrypcji',
    title: 'Zestawy suplementów w subskrypcji: redukcja, masa, rodzina — Bio & Health (sklep pokazowy)',
    desc: 'Zestaw suplementów dobrany do celu: redukcja, masa, regularny trening albo cała rodzina. Dostawa co 2–8 tygodni, płatność przy wysyłce. Sklep pokazowy.',
    lead: 'Zestaw dobrany do celu — redukcji, budowy masy albo regularnego treningu — albo zestaw dla całej rodziny. Dostawa co 2, 4, 6 lub 8 tygodni, płatność dopiero przy wysyłce, pauza i rezygnacja jednym kliknięciem.',
    produkty: [
      { id: 'na-redukcje', menu: 'Zestaw na redukcję', nazwa: 'Zestaw na redukcję', opis: 'Białko WPC 80, elektrolity, witamina D3.', cena: 159, etykieta: 'REDUKCJA', ksztalt: 'pudelko' },
      { id: 'na-mase', menu: 'Zestaw na masę', nazwa: 'Zestaw na masę', opis: 'Gainer, kreatyna monohydrat, białko WPC 80.', cena: 239, etykieta: 'MASA', ksztalt: 'pudelko' },
      { id: 'trening', menu: 'Regularny trening', nazwa: 'Zestaw „regularny trening”', opis: 'Białko WPC 80 i kreatyna monohydrat.', cena: 159, etykieta: 'TRENING', ksztalt: 'pudelko' },
      { id: 'dla-rodziny', menu: 'Zestaw dla rodziny', nazwa: 'Zestaw dla rodziny', opis: 'Witamina D3, omega 3 w płynie, witaminy dla dzieci — osobne profile domowników.', cena: 109, etykieta: 'RODZINA', ksztalt: 'pudelko' },
      { id: 'zestaw-probny', menu: 'Zestaw próbny', nazwa: 'Zestaw próbny białka, 5 × 30 g', opis: 'Pięć smaków WPC 80 na spróbowanie, jednorazowo.', cena: 19, bezSubskrypcji: true, etykieta: 'PRÓBKI', ksztalt: 'pudelko', link: './produkt.html' },
    ],
    pytania: [],
    przypis: 'Składy zestawów są przykładowe. W docelowym sklepie skład dobiera ankieta „Dobierz zestaw” (pytania opracowujemy razem z grupą).',
    porady: ['bialko-na-redukcji', 'kreatyna-jak-brac', 'witamina-d3-zima'],
  },
];

// ------------------------------------------------------------------ strefa wiedzy
// W treści artykułu można wstawić znaczniki, które generator zamienia na elementy wizualne:
// <!--KALKULATOR-->, <!--ZRODLA_BIALKA-->, <!--WYKRES:nasycenie-->, <!--WYKRES:miesiace-->,
// <!--PRODUKT:dzial#id--> (karta produktu w środku tekstu).
export const ARTYKULY = [
  {
    slug: 'bialko-na-redukcji',
    menu: 'Białko na redukcji',
    krotki: 'Białko na redukcji',
    kat: 'bialko',
    h1: 'Białko na redukcji: ile go jeść, żeby chudnąć i nie tracić mięśni?',
    title: 'Białko na redukcji: ile gramów dziennie? Kalkulator i fakty z badań — Bio & Health',
    desc: 'Ile białka jeść na redukcji, jak rozłożyć je na posiłki i skąd wziąć 30 g w jednym posiłku. Kalkulator białka i liczby z zaleceń ISSN i EFSA.',
    zajawka: 'Policz, ile białka potrzebujesz, i zobacz, skąd wziąć 30 g w jednym posiłku.',
    slowa: ['białko', 'odżywka białkowa', 'wpc', 'baton proteinowy'],
    czas: '5 min',
    liczby: [
      { w: '1,4–2,0 g', o: 'białka na kg masy ciała dziennie, gdy trenujesz' },
      { w: '20–40 g', o: 'białka w jednym posiłku' },
      { w: '3–5', o: 'posiłków z białkiem w ciągu dnia' },
    ],
    skrot: 'Na redukcji jedz więcej białka niż zwykle — osobom trenującym wystarcza zwykle <b>1,4–2,0 g na kilogram masy ciała dziennie</b>, rozłożone na kilka posiłków. Białko przyczynia się do utrzymania masy mięśniowej, więc razem z treningiem siłowym pomaga zachować mięśnie, kiedy chudniesz.',
    tresc: `
<h2>Dlaczego na redukcji białko jest ważniejsze niż zwykle?</h2>
<p>Kiedy jesz mniej kalorii, niż spalasz, organizm sięga po zapasy — nie tylko po tłuszcz, ale też po białko z mięśni. <b>Więcej białka w diecie i trening siłowy</b> to dwa sygnały, które pomagają mięśnie zachować. Ogólne zalecenie dla dorosłych to 0,83 g białka na kilogram masy ciała dziennie (EFSA, 2012), ale dotyczy ono osób, które nie trenują i nie są na deficycie.</p>

<h2>Ile białka dziennie na redukcji?</h2>
<p>Według Międzynarodowego Towarzystwa Żywienia Sportowego (ISSN, 2017) <b>większości trenujących wystarcza 1,4–2,0 g/kg dziennie</b>. U osób trenujących siłowo w okresie deficytu kalorii ochronę mięśni może zwiększyć nawet 2,3–3,1 g/kg. Policz swoją porcję:</p>
<!--KALKULATOR-->

<h2>Jak rozłożyć białko w ciągu dnia?</h2>
<p><b>Po 20–40 g w posiłku, co 3–4 godziny</b> (ISSN, 2017). Przykład: osoba ważąca 70 kg, która trenuje trzy razy w tygodniu i jest na redukcji, przy 1,8 g/kg potrzebuje ok. 125 g białka dziennie — to np. 4 posiłki po ok. 30 g.</p>

<h2>Skąd wziąć 30 g białka w jednym posiłku?</h2>
<p>Każdy z tych zestawów to mniej więcej jedna porcja:</p>
<!--ZRODLA_BIALKA-->
<p class="zrodlo-tab">Wartości są przybliżone — zawsze sprawdzaj etykietę konkretnego produktu.</p>

<h2>Czy odżywka białkowa jest potrzebna?</h2>
<p><b>Nie jest konieczna, ale bywa wygodna.</b> Jeśli dobijasz do dziennej porcji z jedzenia, <a class="slowo" href="./bialko.html">odżywka białkowa</a> nic nie doda. Przydaje się, kiedy brakuje czasu albo apetytu. Metaanaliza 49 badań (Morton i in., 2018) pokazała, że dodatkowe białko zwiększa przyrost beztłuszczowej masy ciała u osób trenujących siłowo, a korzyść przestaje rosnąć powyżej ok. 1,6 g/kg dziennie.</p>
<p>Najprostszy wybór to <a class="slowo" href="./bialko.html">białko</a> serwatkowe w proszku, np. koncentrat <a class="slowo" href="./produkt.html">WPC 80</a> — miarka, woda, trzydzieści sekund. Jeśli nie jesz nabiału, wybierz <a class="slowo" href="./bialko.html#bialko-roslinne">białko roślinne</a>.</p>
<!--PRODUKT:bialko#bialko-wpc-80-->

<h2>Czy białko pomaga mniej jeść?</h2>
<p>Badania pokazują, że posiłki bogatsze w białko dają większe uczucie sytości niż posiłki z tą samą liczbą kalorii z węglowodanów czy tłuszczu (Westerterp-Plantenga i in., 2009). Na redukcji to praktyczna przewaga: łatwiej wytrzymać do kolejnego posiłku. Między posiłkami sprawdzi się <a class="slowo" href="./przekaski.html#baton-proteinowy">baton proteinowy</a> albo <a class="slowo" href="./przekaski.html#musli-proteinowe">musli proteinowe</a>.</p>
<p>Jeśli nie chcesz pilnować, kiedy kończy się opakowanie, <a class="slowo" href="./zestawy.html#na-redukcje">zestaw na redukcję</a> przyjdzie co 2, 4, 6 albo 8 tygodni, z płatnością dopiero przy wysyłce.</p>
`,
    pytania: [
      { q: 'Czy dużo białka szkodzi nerkom?', a: 'U zdrowych osób w zakresie podawanym przez ISSN nie wykazano szkodliwości. Jeśli chorujesz na nerki — ilość białka ustal z lekarzem.', ctx: '' },
      { q: 'Czy trzeba liczyć białko z każdego produktu?', a: 'Na początek wystarczy zliczyć główne źródła: mięso, ryby, nabiał, jajka, strączki i odżywkę. Białko z pieczywa czy kaszy to „bonus”.', ctx: '' },
      { q: 'Ile białka przyswoi organizm z jednego posiłku?', a: 'Według ISSN dobrze sprawdza się 20–40 g na posiłek. Większa porcja nie „przepada”, ale lepiej rozłożyć białko na kilka posiłków.', ctx: '' },
    ],
    zrodla: [
      'Jäger R. i in. (2017). International Society of Sports Nutrition Position Stand: protein and exercise. <i>Journal of the International Society of Sports Nutrition</i>, 14, 20.',
      'Morton R. W. i in. (2018). A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength in healthy adults. <i>British Journal of Sports Medicine</i>, 52(6), 376–384.',
      'EFSA Panel on Dietetic Products, Nutrition and Allergies (2012). Scientific Opinion on Dietary Reference Values for protein. <i>EFSA Journal</i>, 10(2), 2557.',
      'Westerterp-Plantenga M. S. i in. (2009). Dietary protein, weight loss, and weight maintenance. <i>Annual Review of Nutrition</i>, 29, 21–41.',
      'Rozporządzenie Komisji (UE) nr 432/2012 — wykaz dopuszczonych oświadczeń zdrowotnych (białko: utrzymanie i wzrost masy mięśniowej).',
    ],
    polecane: ['bialko#bialko-wpc-80', 'bialko#bialko-roslinne', 'przekaski#baton-proteinowy', 'zestawy#na-redukcje'],
  },
  {
    slug: 'kreatyna-jak-brac',
    menu: 'Kreatyna: jak ją brać?',
    krotki: 'Kreatyna: jak ją brać',
    kat: 'kreatyna',
    h1: 'Kreatyna: jak ją brać, ile gramów dziennie i kiedy?',
    title: 'Kreatyna: jak brać, ile gramów dziennie i kiedy? Fakty z badań — Bio & Health',
    desc: 'Ile kreatyny dziennie, czy potrzebna jest faza nasycenia i czy pora ma znaczenie. Konkretne liczby z zaleceń ISSN i z unijnego wykazu oświadczeń zdrowotnych.',
    zajawka: 'Ile gramów, czy robić fazę nasycenia, rano czy po treningu — konkretne liczby z badań.',
    slowa: ['kreatyna', 'kreatyna monohydrat', 'białko', 'elektrolity'],
    czas: '4 min',
    liczby: [
      { w: '3–5 g', o: 'kreatyny dziennie, codziennie' },
      { w: '28 dni', o: 'do pełnego nasycenia mięśni przy 3 g dziennie' },
      { w: 'ok. 95%', o: 'kreatyny w organizmie jest w mięśniach' },
    ],
    skrot: 'Najprościej: <b>3–5 g kreatyny monohydrat dziennie</b>, codziennie, o dowolnej porze. Faza nasycenia (ok. 20 g przez 5–7 dni) tylko przyspiesza efekt — po ok. 4 tygodniach przyjmowania 3 g dziennie mięśnie są nasycone tak samo.',
    tresc: `
<h2>Czym jest kreatyna?</h2>
<p>Kreatyna to związek, który organizm wytwarza sam i który dostarczamy z jedzeniem, głównie z mięsem i rybami. Około 95% kreatyny w organizmie znajduje się w mięśniach szkieletowych. Pomaga tam szybko odtwarzać energię przy krótkim, bardzo intensywnym wysiłku — takim jak seria na siłowni albo sprint.</p>
<p>W unijnym wykazie oświadczeń zdrowotnych zapisano, że kreatyna zwiększa wydolność fizyczną podczas kolejnych krótkotrwałych serii bardzo intensywnych ćwiczeń. Korzystne działanie występuje przy spożyciu 3 g kreatyny dziennie.</p>

<h2>Ile kreatyny dziennie?</h2>
<p><b>3–5 g dziennie.</b> Taką dawkę podtrzymującą podaje stanowisko Międzynarodowego Towarzystwa Żywienia Sportowego (ISSN, 2017). Bierz ją codziennie, także w dni bez treningu — chodzi o to, żeby mięśnie były stale nasycone. Jedna płaska łyżeczka proszku to zwykle ok. 3 g, ale zawsze sprawdź miarkę na opakowaniu <a class="slowo" href="./kreatyna.html#kreatyna-monohydrat">kreatyny monohydrat</a>.</p>
<!--PRODUKT:kreatyna#kreatyna-monohydrat-->

<h2>Czy faza nasycenia jest potrzebna?</h2>
<p><b>Nie.</b> Faza nasycenia to ok. 0,3 g na kilogram masy ciała dziennie (dla osoby ważącej 70 kg — ok. 20 g, podzielone na 4 porcje) przez 5–7 dni, a potem 3–5 g dziennie. Daje pełne nasycenie mięśni po tygodniu.</p>
<p>Ten sam poziom osiągniesz, biorąc 3 g dziennie przez ok. 28 dni — po prostu wolniej (Hultman i in., 1996; ISSN, 2017). Jeśli nie startujesz w zawodach za tydzień, możesz fazę nasycenia pominąć.</p>
<!--WYKRES:nasycenie-->

<h2>Kiedy brać kreatynę: rano, przed czy po treningu?</h2>
<p><b>Najważniejsza jest regularność, nie pora.</b> Badania porównujące przyjmowanie przed i po treningu dają niejednoznaczne wyniki. Wybierz porę, o której nie zapomnisz — na przykład z posiłkiem albo razem z porcją <a class="slowo" href="./bialko.html">białka</a> po treningu (kreatynę możesz wsypać do shake’a z <a class="slowo" href="./produkt.html">białkiem WPC 80</a>).</p>

<h2>Monohydrat czy inne formy?</h2>
<p><b>Monohydrat.</b> Kreatyna monohydrat jest najlepiej przebadaną formą — na niej opiera się większość badań i zalecenia ISSN. Inne formy są zwykle droższe, a nie mają przewagi potwierdzonej w badaniach na podobną skalę. Jeśli nie lubisz proszku, weź <a class="slowo" href="./kreatyna.html#kreatyna-kapsulki">kreatynę w kapsułkach</a> — to ta sama substancja.</p>

<h2>Czy kreatyna zatrzymuje wodę?</h2>
<p>W pierwszym tygodniu, zwłaszcza przy fazie nasycenia, masa ciała często rośnie o ok. 1–2 kg. To głównie woda zgromadzona w mięśniach, a nie tkanka tłuszczowa (ISSN, 2017). Przy długim, intensywnym treningu pamiętaj o piciu — przy dużej potliwości przydadzą się <a class="slowo" href="./kreatyna.html#elektrolity">elektrolity</a>.</p>

<h2>Czy kreatyna jest bezpieczna?</h2>
<p>Według stanowiska ISSN (2017) kreatyna monohydrat przyjmowana przez zdrowe osoby w zalecanych dawkach nie powoduje szkodliwych skutków. To jeden z najlepiej przebadanych suplementów. Jeśli chorujesz na nerki, przyjmujesz leki albo jesteś w ciąży — zapytaj najpierw lekarza.</p>
`,
    pytania: [
      { q: 'Czy kreatynę trzeba brać w dni bez treningu?', a: 'Tak. Chodzi o utrzymanie stałego nasycenia mięśni, więc bierz 3–5 g codziennie, także w dni wolne.', ctx: '' },
      { q: 'Czy kreatyna jest dla kobiet?', a: 'Tak. Dawkowanie jest takie samo jak u mężczyzn: 3–5 g dziennie.', ctx: '' },
      { q: 'Z czym popijać kreatynę?', a: 'Z wodą, sokiem albo w koktajlu białkowym. Rozpuść porcję i wypij od razu.', ctx: '' },
    ],
    zrodla: [
      'Kreider R. B. i in. (2017). International Society of Sports Nutrition position stand: safety and efficacy of creatine supplementation in exercise, sport, and medicine. <i>Journal of the International Society of Sports Nutrition</i>, 14, 18.',
      'Hultman E. i in. (1996). Muscle creatine loading in men. <i>Journal of Applied Physiology</i>, 81(1), 232–237.',
      'Rozporządzenie Komisji (UE) nr 432/2012 z dnia 16 maja 2012 r. ustanawiające wykaz dopuszczonych oświadczeń zdrowotnych dotyczących żywności (z późn. zm.).',
    ],
    polecane: ['kreatyna#kreatyna-monohydrat', 'kreatyna#kreatyna-kapsulki', 'bialko#bialko-wpc-80', 'zestawy#na-mase'],
  },
  {
    slug: 'witamina-d3-zima',
    menu: 'Witamina D3 zimą',
    krotki: 'Witamina D3 zimą',
    kat: 'witaminy',
    h1: 'Witamina D3 zimą: kto powinien ją brać i w jakiej dawce?',
    title: 'Witamina D3: dawkowanie zimą i przez cały rok (wytyczne 2023) — Bio & Health',
    desc: 'Ile witaminy D3 dziennie dla dorosłych, seniorów i osób z otyłością, czym różni się witamina D od D3 i jaki jest górny limit. Na podstawie polskich wytycznych z 2023 r.',
    zajawka: 'Dawki z polskich wytycznych z 2023 r. w jednej tabeli: dorośli, seniorzy, osoby z otyłością.',
    slowa: ['witamina d3', 'witamina d', 'witaminy dla dzieci', 'omega 3', 'magnez'],
    czas: '4 min',
    liczby: [
      { w: '1000–2000 j.m.', o: 'witaminy D3 dziennie dla dorosłych 19–65 lat' },
      { w: '4000 j.m.', o: 'górny bezpieczny limit przy prawidłowej masie ciała' },
      { w: '× 2', o: 'tyle zwykle wyższa dawka przy otyłości' },
    ],
    skrot: 'Zdrowi dorośli (19–65 lat), którzy latem nie przebywają regularnie na słońcu, powinni przyjmować <b>1000–2000 j.m. (25–50 µg) witaminy D3 dziennie przez cały rok</b>. Dawkę dobiera się do masy ciała i diety. Górny bezpieczny limit dla dorosłych z prawidłową masą ciała to 4000 j.m. dziennie (polskie wytyczne, 2023).',
    tresc: `
<h2>Dlaczego zimą brakuje witaminy D?</h2>
<p>Witamina D powstaje głównie w skórze pod wpływem słońca. W Polsce wystarczająca synteza jest możliwa od maja do końca września — i to przy odsłoniętych przedramionach i nogach przez 30–45 minut dziennie, między 10:00 a 15:00, bez filtra (wytyczne 2023). Jesienią i zimą słońce stoi za nisko, więc organizm wytwarza jej za mało.</p>
<!--WYKRES:miesiace-->

<h2>Ile witaminy D3 dziennie?</h2>
<p>Dawki zapobiegające niedoborom według polskich wytycznych z 2023 r.:</p>
<table class="tabela">
  <thead><tr><th scope="col">Kto</th><th scope="col">Dawka dziennie</th><th scope="col">Kiedy</th></tr></thead>
  <tbody>
    <tr><td>Dorośli 19–65 lat</td><td>1000–2000 j.m. (25–50 µg)</td><td>cały rok, jeśli latem za mało słońca</td></tr>
    <tr><td>Seniorzy 65–75 lat</td><td>1000–2000 j.m. (25–50 µg)</td><td>cały rok</td></tr>
    <tr><td>Seniorzy powyżej 75 lat</td><td>2000–4000 j.m. (50–100 µg)</td><td>cały rok</td></tr>
    <tr><td>Osoby z otyłością (BMI powyżej 30)</td><td>zwykle dwa razy więcej niż rówieśnicy z prawidłową masą ciała</td><td>cały rok</td></tr>
  </tbody>
</table>
<p class="zrodlo-tab">Źródło: Płudowski i in. (2023). Dawki dla dzieci, kobiet w ciąży i osób z chorobami przewlekłymi ustala lekarz.</p>
<!--PRODUKT:witaminy#witamina-d3-->
<p>Dla dzieci w zestawie rodzinnym dobieramy produkt do wieku — zobacz <a class="slowo" href="./witaminy.html#witaminy-dla-dzieci">witaminy dla dzieci</a>.</p>

<h2>Czym różni się witamina D od D3?</h2>
<p><b>„Witamina D” to nazwa grupy związków.</b> W suplementach najczęściej spotkasz <a class="slowo" href="./witaminy.html#witamina-d3">witaminę D3</a> (cholekalcyferol) — to ją wytyczne wskazują jako pierwszy wybór w zapobieganiu niedoborom. Na etykiecie szukaj dawki w j.m. albo µg: 1 µg to 40 j.m.</p>

<h2>Co daje witamina D?</h2>
<p>Według unijnego wykazu oświadczeń zdrowotnych witamina D pomaga w prawidłowym funkcjonowaniu układu odpornościowego, pomaga w utrzymaniu zdrowych kości i pomaga w utrzymaniu prawidłowego funkcjonowania mięśni.</p>

<h2>Czy witaminę D można przedawkować?</h2>
<p><b>Tak</b>, dlatego trzymaj się dawki. Górny bezpieczny limit według wytycznych z 2023 r. to 4000 j.m. dziennie dla dorosłych z prawidłową masą ciała i 10 000 j.m. dla osób z nadwagą lub otyłością. Jeśli chcesz znać swój poziom, zbadaj we krwi stężenie 25(OH)D.</p>

<h2>Z czym przyjmować witaminę D3?</h2>
<p>Witamina D rozpuszcza się w tłuszczach, więc najlepiej brać ją z posiłkiem, który zawiera tłuszcz. Wiele osób zamawia ją razem z <a class="slowo" href="./omega-3-kolagen.html#omega-3">omega 3</a> albo <a class="slowo" href="./mineraly.html#magnez">magnezem</a> — to wygodne przy jednej dostawie, ale nie jest konieczne.</p>
`,
    pytania: [
      { q: 'Czy latem też trzeba brać witaminę D3?', a: 'Jeśli latem codziennie przebywasz na słońcu tak, jak zalecają wytyczne (30–45 min, odsłonięte ręce i nogi, 10:00–15:00), suplementacja nie jest konieczna. Jeśli nie — bierz ją przez cały rok.', ctx: 'Wytyczne uznają suplementację latem za bezpieczną także u osób, które przebywają na słońcu.' },
      { q: 'Krople czy kapsułki?', a: 'Liczy się dawka, nie forma. Kapsułki są wygodne dla dorosłych, krople i żelki — dla dzieci.', ctx: '' },
    ],
    zrodla: [
      'Płudowski P. i in. (2023). Guidelines for Preventing and Treating Vitamin D Deficiency: A 2023 Update in Poland. <i>Nutrients</i>, 15(3), 695.',
      'Rozporządzenie Komisji (UE) nr 432/2012 z dnia 16 maja 2012 r. ustanawiające wykaz dopuszczonych oświadczeń zdrowotnych dotyczących żywności (z późn. zm.).',
    ],
    polecane: ['witaminy#witamina-d3', 'witaminy#witaminy-dla-dzieci', 'omega-3-kolagen#omega-3', 'zestawy#dla-rodziny'],
  },
];
