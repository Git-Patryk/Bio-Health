// Działy sklepu i Strefa wiedzy: treść jest w HTML (czytają ją wyszukiwarki i asystenci AI).
// Tu tylko menu i kalkulator białka w artykule „Białko na redukcji”.
import './wspolne.js';

const formularz = document.getElementById('kalk-formularz');
if (formularz) {
  const masa = document.getElementById('kalk-masa');
  const masaWynik = document.getElementById('kalk-masa-wynik');
  const gramy = document.getElementById('kalk-gramy');
  const opis = document.getElementById('kalk-opis');
  const g = (n) => Math.round(n);
  const posilki = (n) => Math.max(2, Math.round(n / 30));
  // odmiana: 2–4 posiłki, 5 posiłków (ale 12–14 posiłków)
  const slowo = (n) => (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14) ? 'posiłki' : 'posiłków');

  function przelicz() {
    const kg = Number(masa.value);
    const cel = formularz.querySelector('input[name="cel"]:checked').value;
    masaWynik.textContent = `${kg} kg`;
    if (cel.includes('-')) {
      // zakres ISSN dla trenujących
      const [od, doo] = cel.split('-').map(Number);
      gramy.textContent = `${g(kg * od)}–${g(kg * doo)} g`;
      opis.textContent = `To np. ${posilki(kg * od)}–${posilki(kg * doo)} ${slowo(posilki(kg * doo))} po ok. 30 g. Jedna miarka WPC 80 to 22,5 g białka.`;
    } else {
      const wynik = kg * Number(cel);
      gramy.textContent = `${g(wynik)} g`;
      opis.textContent = `To np. ${posilki(wynik)} ${slowo(posilki(wynik))} po ok. 30 g. Jedna miarka WPC 80 to 22,5 g białka.`;
    }
  }
  formularz.addEventListener('input', przelicz);
  formularz.addEventListener('submit', (e) => e.preventDefault());
  przelicz();
}

/* ---------------------------------------------------------------- filtry i sortowanie w działach */
// Filtrujemy w przeglądarce, bez zmiany adresu strony (brak duplikatów treści dla wyszukiwarek).
const uklad = document.querySelector('[data-filtrowanie]');
if (uklad) {
  const panel = uklad.querySelector('.filtry');
  const formularz = uklad.querySelector('.filtry-formularz');
  const lista = uklad.querySelector('.siatka');
  const kafle = [...lista.children];
  const liczba = uklad.querySelector('.lista-liczba');
  const pusto = uklad.querySelector('.lista-pusto');
  const sortuj = uklad.querySelector('select[name="sortuj"]');
  const otworz = uklad.querySelector('.filtry-otworz');
  const licznikFiltrow = uklad.querySelector('.filtry-licznik');
  const odmiana = (n) => (n === 1 ? 'produkt' : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14) ? 'produkty' : 'produktów');
  const zaznaczone = (pole) => [...formularz.querySelectorAll(`input[name="${pole}"]:checked`)].map((i) => i.value).filter(Boolean);

  function zastosuj() {
    const cele = zaznaczone('cele');
    const formy = zaznaczone('forma');
    const diety = zaznaczone('dieta');
    const [cOd, cDo] = (zaznaczone('cena')[0] || '-').split('-');
    const tylkoWyp = zaznaczone('wyprzedaz').length > 0;
    let widoczne = 0;
    kafle.forEach((k) => {
      const d = k.dataset;
      const cena = Number(d.cena);
      // w obrębie jednej grupy wystarczy dowolna zaznaczona opcja, między grupami muszą być spełnione wszystkie
      const ok = (!cele.length || cele.some((c) => d.cele.split(' ').includes(c)))
        && (!formy.length || formy.includes(d.forma))
        && (!diety.length || diety.every((x) => d.dieta.split(' ').includes(x)))
        && (cOd === '' || cena >= Number(cOd)) && (!cDo || cena < Number(cDo))
        && (!tylkoWyp || Number(d.wyprzedaz) > 0);
      k.hidden = !ok;
      if (ok) widoczne += 1;
    });
    liczba.innerHTML = `<b>${widoczne}</b> ${odmiana(widoczne)}`;
    pusto.hidden = widoczne > 0;
    const ile = cele.length + formy.length + diety.length + (cOd !== '' ? 1 : 0) + (tylkoWyp ? 1 : 0);
    licznikFiltrow.hidden = ile === 0;
    licznikFiltrow.textContent = ile;
    const pokaz = panel.querySelector('.filtry-pokaz');
    if (pokaz) pokaz.textContent = `Pokaż ${widoczne} ${odmiana(widoczne)}`;
  }

  function posortuj() {
    const tryb = sortuj.value;
    const kolejnosc = [...kafle].sort((a, b) => {
      if (tryb === 'cena-rosnaco') return a.dataset.cena - b.dataset.cena;
      if (tryb === 'cena-malejaco') return b.dataset.cena - a.dataset.cena;
      if (tryb === 'nazwa') return a.dataset.nazwa.localeCompare(b.dataset.nazwa, 'pl');
      return kafle.indexOf(a) - kafle.indexOf(b);
    });
    lista.append(...kolejnosc);
  }

  const zamknijPanel = () => {
    panel.classList.remove('otwarte');
    document.body.classList.remove('filtry-otwarte');
    otworz.setAttribute('aria-expanded', 'false');
  };
  formularz.addEventListener('change', zastosuj);
  sortuj.addEventListener('change', posortuj);
  uklad.querySelectorAll('[data-wyczysc]').forEach((b) => b.addEventListener('click', () => {
    formularz.reset();
    zastosuj();
  }));
  otworz.addEventListener('click', () => {
    panel.classList.add('otwarte');
    document.body.classList.add('filtry-otwarte');
    otworz.setAttribute('aria-expanded', 'true');
    panel.querySelector('input')?.focus();
  });
  panel.querySelector('.filtry-zamknij').addEventListener('click', () => { zamknijPanel(); otworz.focus(); });
  panel.querySelector('.filtry-pokaz').addEventListener('click', () => { zamknijPanel(); lista.scrollIntoView({ block: 'start' }); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && panel.classList.contains('otwarte')) { zamknijPanel(); otworz.focus(); } });
  document.addEventListener('click', (e) => {
    if (panel.classList.contains('otwarte') && !panel.contains(e.target) && !otworz.contains(e.target)) zamknijPanel();
  });
  zastosuj();
}

/* ---------------------------------------------------------------- spis treści w artykułach */
// podświetla w lewym spisie sekcję, którą właśnie czytasz
const spis = document.querySelector('.spis');
if (spis) {
  const linki = [...spis.querySelectorAll('ol a')];
  const sekcje = linki.map((a) => document.getElementById(a.getAttribute('href').slice(1))).filter(Boolean);
  const zaznacz = (id) => linki.forEach((a) => {
    const t = a.getAttribute('href') === `#${id}`;
    a.classList.toggle('aktywny', t);
    if (t) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
  });
  const obserwator = new IntersectionObserver((wpisy) => {
    wpisy.filter((w) => w.isIntersecting).forEach((w) => zaznacz(w.target.id));
  }, { rootMargin: '-15% 0px -70% 0px' });
  sekcje.forEach((s) => obserwator.observe(s));
}
