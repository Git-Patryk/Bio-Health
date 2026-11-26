// Wspólne dla wszystkich stron: menu (przycisk „Menu” na telefonie, Esc), przełącznik języka i baner cookies.
// Panele menu na komputerze otwiera sam CSS (najechanie / Tab) — od razu, bez opóźnienia.

/* ---------------------------------------------------------------- menu */
const menu = document.getElementById('menu');
const przycisk = document.getElementById('przelacz-menu');

export function zamknijMenu() {
  if (!menu) return;
  menu.classList.remove('otwarte');
  przycisk?.setAttribute('aria-expanded', 'false');
}

if (menu) {
  przycisk?.addEventListener('click', () => {
    const otwarte = menu.classList.toggle('otwarte');
    przycisk.setAttribute('aria-expanded', String(otwarte));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (menu.classList.contains('otwarte')) { zamknijMenu(); przycisk?.focus(); return; }
    if (menu.contains(document.activeElement)) {
      // Esc w rozwiniętym panelu: chowamy panel i wracamy do nazwy zakładki
      const pozycja = document.activeElement.closest('.menu-pozycja');
      pozycja?.classList.add('schowane');
      pozycja?.querySelector('.menu-link')?.focus();
    }
  });

  menu.querySelectorAll('.menu-pozycja').forEach((pozycja) => {
    pozycja.addEventListener('focusout', (e) => { if (!pozycja.contains(e.relatedTarget)) pozycja.classList.remove('schowane'); });
    // kursor zjechał z zakładki: panel ma zniknąć od razu, nawet jeśli coś w nim ma fokus po kliknięciu
    pozycja.addEventListener('mouseleave', () => {
      pozycja.classList.remove('schowane');
      if (window.matchMedia('(min-width: 1181px)').matches && pozycja.contains(document.activeElement)) document.activeElement.blur();
    });
  });

  menu.addEventListener('click', (e) => { if (e.target.closest('a')) zamknijMenu(); });
}

/* ---------------------------------------------------------------- język */
const jezyk = document.querySelector('.jezyk');
if (jezyk) {
  const btn = jezyk.querySelector('.jezyk-przycisk');
  const panel = jezyk.querySelector('.jezyk-panel');
  const info = jezyk.querySelector('.jezyk-info');
  const zamknij = () => { panel.hidden = true; btn.setAttribute('aria-expanded', 'false'); };
  btn.addEventListener('click', () => {
    const otworz = panel.hidden;
    panel.hidden = !otworz;
    btn.setAttribute('aria-expanded', String(otworz));
    if (otworz) info.hidden = true;
  });
  panel.addEventListener('click', (e) => {
    const opcja = e.target.closest('button[data-jezyk]');
    if (!opcja) return;
    if (opcja.dataset.jezyk === 'pl') { zamknij(); btn.focus(); return; }
    // wersji angielskiej jeszcze nie ma: zostajemy po polsku i mówimy o tym wprost
    info.hidden = false;
  });
  document.addEventListener('click', (e) => { if (!jezyk.contains(e.target)) zamknij(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !panel.hidden) { zamknij(); btn.focus(); } });
}

/* ---------------------------------------------------------------- cookies */
// Strona nie ładuje żadnych narzędzi analitycznych ani reklamowych. Baner pokazuje, jak wyglądałby w prawdziwym
// sklepie: „Akceptuję” i „Odrzucam” są tak samo łatwe, a wybór zapisujemy tylko w tej przeglądarce (to zapis niezbędny).
const KLUCZ = 'bh-cookies';
const zapisane = () => { try { return JSON.parse(localStorage.getItem(KLUCZ)); } catch { return null; } };
const zapisz = (analityczne, marketingowe) => {
  try { localStorage.setItem(KLUCZ, JSON.stringify({ analityczne, marketingowe, data: new Date().toISOString().slice(0, 10) })); } catch { /* tryb prywatny: trudno */ }
};

function banerCookies(odUstawien = false) {
  document.querySelector('.cookies')?.remove();
  const stan = zapisane() || { analityczne: false, marketingowe: false };
  const el = document.createElement('section');
  el.className = 'cookies';
  el.setAttribute('role', 'dialog');
  el.setAttribute('aria-labelledby', 'cookies-tytul');
  el.innerHTML = `
    <h2 id="cookies-tytul">Pliki cookies</h2>
    <p>Ten sklep jest pokazowy i nie używa narzędzi analitycznych ani reklamowych. W prawdziwym sklepie zapytalibyśmy tu o zgodę na statystyki odwiedzin i reklamy dopasowane do Ciebie. Twój wybór zapamiętamy tylko w tej przeglądarce. <a href="./informacje.html">Więcej informacji</a></p>
    <div class="cookies-ustawienia" hidden>
      <label><span><b>Niezbędne</b><small>Koszyk i zapamiętanie tego wyboru. Zawsze włączone.</small></span><input type="checkbox" checked disabled /></label>
      <label><span><b>Analityczne</b><small>Statystyki odwiedzin, żeby ulepszać sklep.</small></span><input type="checkbox" name="analityczne" ${stan.analityczne ? 'checked' : ''} /></label>
      <label><span><b>Marketingowe</b><small>Reklamy dopasowane do Ciebie w innych serwisach.</small></span><input type="checkbox" name="marketingowe" ${stan.marketingowe ? 'checked' : ''} /></label>
    </div>
    <div class="cookies-przyciski">
      <button type="button" data-cookies-akcja="akceptuj">Akceptuję wszystkie</button>
      <button type="button" data-cookies-akcja="odrzuc">Odrzucam wszystkie</button>
      <button type="button" class="cookies-obrys" data-cookies-akcja="ustawienia">Ustawienia</button>
    </div>`;
  document.body.append(el);
  const ustawienia = el.querySelector('.cookies-ustawienia');
  const przyciskUst = el.querySelector('[data-cookies-akcja="ustawienia"]');
  const pokazUstawienia = () => { ustawienia.hidden = false; przyciskUst.textContent = 'Zapisz wybór'; przyciskUst.dataset.cookiesAkcja = 'zapisz'; };
  if (odUstawien) pokazUstawienia();
  el.addEventListener('click', (e) => {
    const b = e.target.closest('[data-cookies-akcja]');
    if (!b) return;
    const akcja = b.dataset.cookiesAkcja;
    if (akcja === 'ustawienia') { pokazUstawienia(); el.querySelector('input[name="analityczne"]').focus(); return; }
    if (akcja === 'akceptuj') zapisz(true, true);
    if (akcja === 'odrzuc') zapisz(false, false);
    if (akcja === 'zapisz') zapisz(el.querySelector('input[name="analityczne"]').checked, el.querySelector('input[name="marketingowe"]').checked);
    el.remove();
  });
  // przy pierwszym wejściu baner nie zabiera fokusu; po kliknięciu „Ustawienia cookies” — tak
  if (odUstawien) el.querySelector('input[name="analityczne"]').focus({ preventScroll: true });
}

if (!new URLSearchParams(location.search).has('druk') && !zapisane()) banerCookies();
// „Ustawienia cookies” w stopce: zmiana albo cofnięcie zgody tak samo łatwo jak jej wyrażenie
document.addEventListener('click', (e) => {
  if (e.target.closest('[data-cookies]')) { e.preventDefault(); banerCookies(true); }
});
