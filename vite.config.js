import { resolve } from 'node:path';
import { defineConfig } from 'vite';

// Polityka bezpieczeństwa treści (CSP): przeglądarka uruchomi tylko skrypty, style
// i czcionki z naszej domeny. GitHub Pages nie pozwala ustawiać nagłówków HTTP,
// więc CSP trafia do <meta>. Dodajemy ją tylko w wersji zbudowanej, bo serwer
// deweloperski Vite wstrzykuje style inline (CSP by je zablokowała).
const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'none'",
  'upgrade-insecure-requests',
].join('; ');

function cspWBudowie() {
  return {
    name: 'csp-w-budowie',
    apply: 'build',
    transformIndexHtml: () => [
      {
        tag: 'meta',
        attrs: { 'http-equiv': 'Content-Security-Policy', content: CSP },
        injectTo: 'head-prepend',
      },
    ],
  };
}

export default defineConfig({
  // Ścieżki względne: strona działa pod adresem https://<konto>.github.io/<repo>/
  base: './',
  plugins: [cspWBudowie()],
  build: {
    // three.js to ok. 600 kB (ok. 160 kB po kompresji) — ładowany w tle, po tekście strony.
    chunkSizeWarningLimit: 700,
    rolldownOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        informacje: resolve(import.meta.dirname, 'informacje.html'),
        produkt: resolve(import.meta.dirname, 'produkt.html'),
        prezentacja: resolve(import.meta.dirname, 'prezentacja.html'),
      },
    },
  },
});
