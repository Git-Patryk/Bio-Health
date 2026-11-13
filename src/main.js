// Scena 3D ładuje się osobno (dynamiczny import), więc tekst strony
// pojawia się od razu, a three.js dociąga się w tle.
const canvas = document.getElementById('scena');

if (canvas) {
  import('./scena-3d.js')
    .then(({ uruchomScene }) => uruchomScene(canvas))
    .catch(() => {
      // Nie udało się wczytać sceny — zostaje kapsułka z CSS.
    });
}
