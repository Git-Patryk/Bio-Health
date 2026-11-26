// Menu główne z kategoriami — wspólne dla wszystkich podstron.
// Rozwijanie podkategorii na komputerze robi sam CSS (najechanie / klawisz Tab).
// Tu tylko: przycisk „Menu” na telefonie, zamykanie klawiszem Esc i po kliknięciu linku.

const menu = document.getElementById('menu');
const przycisk = document.getElementById('przelacz-menu');

function zamknij() {
  if (!menu) return;
  menu.classList.remove('otwarte');
  przycisk?.setAttribute('aria-expanded', 'false');
}

if (menu && przycisk) {
  przycisk.addEventListener('click', () => {
    const otwarte = menu.classList.toggle('otwarte');
    przycisk.setAttribute('aria-expanded', String(otwarte));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (menu.classList.contains('otwarte')) {
      zamknij();
      przycisk.focus();
    } else if (menu.contains(document.activeElement)) {
      // Esc w rozwiniętej liście na komputerze: chowamy listę i wracamy do nazwy kategorii
      const pozycja = document.activeElement.closest('.menu-pozycja');
      pozycja?.classList.add('schowane');
      pozycja?.querySelector('.menu-link')?.focus();
    }
  });

  // schowana klawiszem Esc lista wraca, gdy fokus albo mysz opuści kategorię
  menu.querySelectorAll('.menu-pozycja').forEach((pozycja) => {
    pozycja.addEventListener('focusout', (e) => {
      if (!pozycja.contains(e.relatedTarget)) pozycja.classList.remove('schowane');
    });
    pozycja.addEventListener('mouseleave', () => pozycja.classList.remove('schowane'));
  });

  menu.addEventListener('click', (e) => {
    if (e.target.closest('a')) zamknij();
  });
}

export { zamknij as zamknijMenu };
