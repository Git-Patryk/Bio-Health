# 01. Narzędzia do animowanej strony 3D

*Stan na 30.10.2026. Sprawdzone w Claude Code (aplikacja desktop) i w sieci.*

## W skrócie

- **Samo podłączenie connectora nie zrobi strony 3D, która nie wygląda generycznie.** Dobry efekt daje jeden pomysł wizualny, własna kolorystyka i typografia, oszczędne 3D tam, gdzie coś wyjaśnia, i dopracowane detale. Narzędzia tylko w tym pomagają.
- **Stos technologiczny:** Vite + three.js + GSAP, czysty JavaScript bez frameworka. Jest już w tym folderze i działa (scena z kapsułką w hero).
- **Warto dodać:** dokumentację Three.js przez MCP (darmowa, bez konta), oficjalne skille GSAP i skill Impeccable przeciw „AI-owemu” wyglądowi. Spline MCP dopiero wtedy, gdy będziemy modelować własny obiekt 3D.
- **Ostrożnie z gotowymi szablonami** (np. AnimatedWebs). Szybko dają efekt „wow”, ale ten sam szablon ma wiele innych stron. To najprostsza droga do strony generycznej.

## Co już masz w Claude Code

| Narzędzie | Stan | Do czego się przyda | Uwagi |
|---|---|---|---|
| **frontend-design** (skill Anthropic) | ✅ włączony | Kierunek wizualny, typografia, unikanie szablonowego wyglądu | Używać na starcie każdej pracy nad wyglądem |
| **AnimatedWebs** (plugin) | ⚠️ zainstalowany, wymaga autoryzacji | 1400+ szablonów animowanych stron, filmowe tła wideo, animowane komponenty | Plugin społeczności, **niezweryfikowany** przez Anthropic. Sprawdzić licencję szablonów. Ryzyko: wygląd jak u setek innych stron |
| **Figma** (plugin) | ⚠️ wymaga autoryzacji | Przeniesienie makiet z Figmy do kodu; skille `figma-shaders`, `figma-implement-motion` | Przyda się, jeśli grupa robi makiety (BC5) w Figmie |
| **Przeglądarka wbudowana** w aplikację Claude | ✅ działa | Podgląd strony, zrzuty ekranu, test na szerokości telefonu | Zastępuje Playwright MCP — nie trzeba go instalować |
| **design-critique**, **accessibility-review** (skille) | ✅ dostępne | Ocena projektu i dostępności przed oddaniem | — |

Pluginy z oznaczeniem „wymaga autoryzacji” podłącza się w ustawieniach konektorów aplikacji albo komendą `/mcp` w terminalowym `claude`. Bez tego ich narzędzia nie działają.

## Co warto dodać

| Narzędzie | Co daje | Konto / koszt | Jak dodać | Ocena |
|---|---|---|---|---|
| **Three.js Resources MCP** | Aktualne, sprawdzone poradniki three.js, katalog ~300 narzędzi WebGL/WebGPU, konwerter shaderów | Bez konta, darmowe, tylko odczyt (beta) | `claude mcp add --transport http threejsresources https://threejsresources.com/api/mcp` | ⭐ Polecam — zero ryzyka |
| **GSAP skills** (konto `greensock` na GitHubie) | Skille: `gsap-core`, `gsap-scrolltrigger`, `gsap-plugins`, `gsap-react` — animacje przewijania, SplitText, MorphSVG | Darmowe. GSAP jest w 100% darmowy, także komercyjnie, od 30.04.2025 (przejęcie przez Webflow) | `npx skills add https://github.com/greensock/gsap-skills` | ⭐ Polecam |
| **Impeccable** (Paul Bakaus) | Skill + komendy wyłapujące typowe „AI-owe” błędy projektowe (fonty, kontrast, układ); osobne narzędzie `npx impeccable detect` | Darmowe (Apache 2.0) | `/plugin marketplace add pbakaus/impeccable` | ⭐ Polecam do przeglądu przed oddaniem |
| **Spline MCP** (oficjalny) | Claude tworzy i edytuje scenę 3D w Spline (np. słoik suplementu, pudełko subskrypcji); eksport do three.js / react-three-fiber / vanilla JS | Konto Spline; dzienny limit wywołań zależny od planu | `claude mcp add --transport http --scope user spline https://mcp.spline.design/mcp`, potem autoryzacja | Gdy potrzebny będzie własny model 3D |
| **Context7** | Aktualna dokumentacja bibliotek (mniej zmyślonych funkcji) | Klucz API | `claude mcp add context7 -- npx -y @upstash/context7-mcp` | Opcjonalnie |
| **parallax-threejs** (katalog Anthropic, społeczność) | Diagnostyka sceny three.js, testy regresji wizualnej | Darmowe | Przez katalog pluginów | Dopiero przy trudnych błędach 3D |
| **Generatory modeli 3D** (Meshy, Tripo, Rodin, Blender MCP) | Model 3D z opisu lub zdjęcia | Konta, płatne limity | — | Raczej niepotrzebne: kapsułkę, słoik czy pudełko lepiej zbudować z prostych brył w kodzie (lekko, bez licencji) |

**Zasady bezpieczeństwa przy instalowaniu:** tylko z oficjalnych repozytoriów. Serwery MCP mogą uruchamiać kod na komputerze, więc lepiej wybierać te tylko do odczytu. Uwaga na podróbki: paczka `spline-mcp` z PyPI **nie jest** oficjalnym serwerem Spline.

## Przepis na stronę 3D, która nie wygląda generycznie

1. **Jedna idea wizualna zamiast efektów wszędzie.** Np. „kapsułka jako bohater”: przy przewijaniu kapsułka się otwiera, a składniki układają się w plan zestawu. Animacja ma tłumaczyć, jak działa subskrypcja, a nie tylko zdobić.
2. **Najpierw kierunek, potem kod.** Przed budową krótki `docs/DESIGN.md`: paleta, fonty, nastrój, 3 strony-inspiracje, czego unikamy. Pomaga skill frontend-design.
3. **Własna typografia i kolory.** Unikamy klasyki AI: font Inter, fioletowe gradienty, wszystko zaokrąglone i w kartach. Fonty trzymamy lokalnie (zob. RODO w [02](02-prawo-i-zgodnosc.md)).
4. **3D oszczędnie:** hero i 1–2 kluczowe momenty. Reszta to szybki, czytelny HTML.
5. **Prawdziwe materiały:** zdjęcia z banków z licencją albo rendery. Grafiki z AI zawsze z podpisem.
6. **Przegląd przed oddaniem:** Impeccable + skill design-critique + test na telefonie.

## Wydajność i dostępność 3D — obowiązkowe

Zaimplementowane w szkielecie (`src/scena-3d.js`). Zostaje w każdej kolejnej wersji:

- **`prefers-reduced-motion`**: osoby z wyłączonymi animacjami w systemie widzą nieruchomą klatkę.
- **Zapas bez WebGL:** gdy przeglądarka nie obsługuje 3D, zostaje kapsułka narysowana w CSS.
- **Tekst w HTML, nie w canvasie.** Wyszukiwarki i czytniki ekranu go widzą, a scena ma `aria-hidden`.
- **Gęstość pikseli maks. 2:** telefony z ekranami 3× nie przegrzewają GPU.
- **Pauza:** scena nie renderuje się, gdy jest poza ekranem albo karta jest w tle (bateria).
- **Lazy loading:** three.js (~160 kB po kompresji) wczytuje się w tle, po tekście.
- **Budżet:** modele i tekstury łącznie ≤ 1,5 MB (glTF + Draco/KTX2, jeśli będą modele).
- **Cele Core Web Vitals:** LCP < 2,5 s, INP < 200 ms, CLS < 0,1.

## Źródła

- [Three.js Resources MCP](https://threejsresources.com/mcp)
- [Spline MCP Server — dokumentacja](https://docs.spline.design/generate/spline-mcp-server) · [Spline Agent Skill](https://docs.spline.design/generate/spline-agent-skill)
- [GSAP skills (greensock)](https://www.skills.sh/greensock/gsap-skills/gsap-plugins) · [Webflow: GSAP 100% free](https://webflow.com/blog/gsap-becomes-free)
- [Impeccable (GitHub, pbakaus)](https://github.com/pbakaus/impeccable/wiki)
- [frontend-design (Anthropic)](https://claudemarketplaces.com/skills/anthropics/claude-code/frontend-design)
- [21st.dev Magic MCP](https://github.com/21st-dev/magic-mcp): generator komponentów React; nam niepotrzebny, bo nie używamy Reacta
- [3D website best practices](https://www.svilenkovic.com/3d/3d-website-best-practices) · [Three.js skill (MengTo)](https://skills.sh/mengto/skills/threejs)
- [Best 3D Model MCP Servers (Thrixel)](https://thrixel.com/learn/best-3d-model-mcp-servers)
