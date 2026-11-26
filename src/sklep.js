// Działy sklepu i Strefa wiedzy: treść jest w HTML (czytają ją wyszukiwarki i asystenci AI).
// Tu tylko menu i kalkulator białka w artykule „Białko na redukcji”.
import './menu.js';

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
