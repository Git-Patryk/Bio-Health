// Scena 3D w hero: dwukolorowa kapsułka i drobne „granulki” wokół niej.
// Wszystko budowane z prostych brył three.js — bez zewnętrznych modeli,
// więc nie ma problemu z licencjami ani ciężkimi plikami.
//
// Zasady (patrz docs/01-narzedzia-3d.md):
// - prefers-reduced-motion → jedna nieruchoma klatka, bez animacji;
// - render tylko, gdy scena jest na ekranie i karta jest aktywna;
// - gęstość pikseli maks. 2 (oszczędza GPU telefonów);
// - brak WebGL → zostaje kapsułka narysowana w CSS.

import {
  ACESFilmicToneMapping,
  CylinderGeometry,
  DirectionalLight,
  DoubleSide,
  Group,
  InstancedMesh,
  MathUtils,
  Matrix4,
  Mesh,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  PMREMGenerator,
  Quaternion,
  Scene,
  SphereGeometry,
  Vector3,
  WebGLRenderer,
} from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { gsap } from 'gsap';

const DLUGOSC = 1.3; // długość części walcowej kapsułki
const LICZBA_GRANULEK = 36;

// Połówka kapsułki: walec od y0 do y1 zakończony półkulą (u góry albo u dołu).
function polowka(material, promien, y0, y1, gorna) {
  const grupa = new Group();

  const walec = new Mesh(new CylinderGeometry(promien, promien, y1 - y0, 64, 1, true), material);
  walec.position.y = (y0 + y1) / 2;

  const czasza = new Mesh(
    new SphereGeometry(promien, 64, 24, 0, Math.PI * 2, gorna ? 0 : Math.PI / 2, Math.PI / 2),
    material,
  );
  czasza.position.y = gorna ? y1 : y0;

  grupa.add(walec, czasza);
  return grupa;
}

function zbudujKapsulke() {
  const zielona = new MeshPhysicalMaterial({
    color: 0x2f6b4f,
    roughness: 0.3,
    clearcoat: 1,
    clearcoatRoughness: 0.12,
    side: DoubleSide,
  });
  const kremowa = new MeshPhysicalMaterial({
    color: 0xe9dfc8,
    roughness: 0.38,
    clearcoat: 0.6,
    clearcoatRoughness: 0.2,
    side: DoubleSide,
  });

  // Górna połówka jest minimalnie szersza i nachodzi na dolną — jak w prawdziwej kapsułce.
  const gora = polowka(zielona, 0.52, -0.1, DLUGOSC / 2, true);
  const dol = polowka(kremowa, 0.5, -DLUGOSC / 2, 0.12, false);

  const kapsulka = new Group();
  kapsulka.add(gora, dol);
  return { kapsulka, gora, dol };
}

function zbudujGranulki() {
  const granulki = new InstancedMesh(
    new SphereGeometry(1, 16, 12),
    new MeshStandardMaterial({ color: 0xc98a2b, roughness: 0.45 }),
    LICZBA_GRANULEK,
  );

  // Każda granulka krąży po własnej, lekko pochylonej orbicie.
  const orbity = Array.from({ length: LICZBA_GRANULEK }, () => ({
    promien: MathUtils.randFloat(1.35, 2.3),
    kat: Math.random() * Math.PI * 2,
    predkosc: MathUtils.randFloat(0.05, 0.16) * (Math.random() < 0.5 ? -1 : 1),
    wysokosc: MathUtils.randFloat(-1.3, 1.3),
    rozmiar: MathUtils.randFloat(0.022, 0.065),
  }));

  const macierz = new Matrix4();
  const pozycja = new Vector3();
  const obrot = new Quaternion();
  const skala = new Vector3();

  function ustaw(czas) {
    orbity.forEach((o, i) => {
      const kat = o.kat + czas * o.predkosc;
      pozycja.set(Math.cos(kat) * o.promien, o.wysokosc + Math.sin(kat * 2) * 0.08, Math.sin(kat) * o.promien);
      skala.setScalar(o.rozmiar);
      macierz.compose(pozycja, obrot, skala);
      granulki.setMatrixAt(i, macierz);
    });
    granulki.instanceMatrix.needsUpdate = true;
  }

  ustaw(0);
  return { granulki, ustaw };
}

// Zwraca true, jeśli scena wystartowała; false → zostaje zapas z CSS.
export function uruchomScene(canvas) {
  let renderer;
  try {
    renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' });
  } catch {
    return false;
  }

  const bezRuchu = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const kontener = canvas.parentElement;

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.setClearColor(0x000000, 0);

  const scena = new Scene();
  const pmrem = new PMREMGenerator(renderer);
  scena.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  pmrem.dispose();

  const swiatlo = new DirectionalLight(0xfff4e0, 1.4);
  swiatlo.position.set(-3, 4, 5);
  scena.add(swiatlo);

  const kamera = new PerspectiveCamera(32, 1, 0.1, 50);
  kamera.position.set(0, 0, 7.2);

  const { kapsulka, gora, dol } = zbudujKapsulke();
  const { granulki, ustaw: ustawGranulki } = zbudujGranulki();

  // całość → pochylenie → kapsułka (obrót wokół własnej osi)
  const pochylenie = new Group();
  pochylenie.rotation.z = -0.56;
  pochylenie.add(kapsulka);

  const calosc = new Group();
  calosc.add(pochylenie, granulki);
  scena.add(calosc);

  const render = () => renderer.render(scena, kamera);

  function dopasujRozmiar() {
    const { width, height } = kontener.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    kamera.aspect = width / height;
    kamera.updateProjectionMatrix();
    if (bezRuchu) render();
  }
  new ResizeObserver(dopasujRozmiar).observe(kontener);
  dopasujRozmiar();

  canvas.addEventListener('webglcontextlost', (e) => {
    e.preventDefault();
    kontener.classList.remove('scena-gotowa');
  });

  if (bezRuchu) {
    kapsulka.rotation.y = 0.6;
    render();
    kontener.classList.add('scena-gotowa');
    return true;
  }

  // Wejście: połówki zsuwają się do siebie
  gora.position.y = 0.9;
  dol.position.y = -0.9;
  kapsulka.scale.setScalar(0.85);
  gsap
    .timeline({ defaults: { duration: 1.8, ease: 'expo.out' }, delay: 0.15 })
    .to(gora.position, { y: 0 }, 0)
    .to(dol.position, { y: 0 }, 0)
    .to(kapsulka.scale, { x: 1, y: 1, z: 1 }, 0);

  // Delikatna paralaksa za kursorem / palcem
  const cel = { x: 0, y: 0 };
  window.addEventListener(
    'pointermove',
    (e) => {
      cel.x = (e.clientY / window.innerHeight - 0.5) * 0.35;
      cel.y = (e.clientX / window.innerWidth - 0.5) * 0.5;
    },
    { passive: true },
  );

  let naEkranie = true;
  let klatka = 0;
  const start = performance.now();

  function petla() {
    const czas = (performance.now() - start) / 1000;
    kapsulka.rotation.y = czas * 0.35;
    kapsulka.position.y = Math.sin(czas * 0.9) * 0.06;
    calosc.rotation.x = MathUtils.lerp(calosc.rotation.x, cel.x, 0.05);
    calosc.rotation.y = MathUtils.lerp(calosc.rotation.y, cel.y, 0.05);
    ustawGranulki(czas);
    render();
    klatka = requestAnimationFrame(petla);
  }

  function aktualizujPetle() {
    const powinnaDzialac = naEkranie && !document.hidden;
    if (powinnaDzialac && !klatka) {
      klatka = requestAnimationFrame(petla);
    } else if (!powinnaDzialac && klatka) {
      cancelAnimationFrame(klatka);
      klatka = 0;
    }
  }

  new IntersectionObserver(([wpis]) => {
    naEkranie = wpis.isIntersecting;
    aktualizujPetle();
  }).observe(kontener);
  document.addEventListener('visibilitychange', aktualizujPetle);

  aktualizujPetle();
  kontener.classList.add('scena-gotowa');
  return true;
}
