# Checklista przed prezentacją

## Wersja pokazowa (prezentacja na zajęciach)

**Treść i prawo**
- [ ] Pasek „Sklep pokazowy — projekt studencki” widoczny na każdej podstronie
- [ ] Wszystkie elementy z [`ZGODNOSC-Z-PRAWEM.md`](../ZGODNOSC-Z-PRAWEM.md) są na stronie, a sekcje „W demo” są aktualne
- [ ] Formularze mają komplet pól i zgód, walidują dane, ale niczego nie wysyłają; hasła nigdzie nie są zapisywane
- [ ] Ankieta „Dobierz zestaw” działa od początku do wyniku
- [ ] Strona „Informacje i prywatność” aktualna (opisuje wszystko, co działa w przeglądarce)
- [ ] Żadnych trackerów, zewnętrznych fontów i skryptów (baner cookies tylko pokazowy)
- [ ] Oświadczenia o suplementach tylko z rejestru UE, bez „leczy/zapobiega”
- [ ] Produkty i ceny oznaczone jako przykładowe, bez cudzych marek i logo
- [ ] Grafiki z AI podpisane, stopka „Przygotowano z pomocą AI”
- [ ] Licencje zdjęć, fontów i modeli 3D spisane w README (sekcja „Źródła materiałów”)

**Technika**
- [ ] `npm run build` przechodzi bez błędów
- [ ] Podgląd wersji produkcyjnej: brak błędów w konsoli (CSP niczego nie blokuje)
- [ ] Test na szerokości telefonu (375 px): brak poziomego przewijania
- [ ] Test z wyłączonymi animacjami (`prefers-reduced-motion`)
- [ ] Obsługa klawiaturą (Tab, widoczny fokus), kontrast tekstu ≥ 4,5:1
- [ ] Lighthouse: wydajność i dostępność ≥ 90

**Na zajęciach**
- [ ] Laptop: `npm run build && npm run preview` uruchomione przed prezentacją, strona otwarta w przeglądarce
- [ ] Przygotowane przykładowe dane do wpisania na żywo (konto, adres), bez prawdziwych danych osobowych

**GitHub (jeśli repo istnieje)**
- [ ] 2FA na koncie
- [ ] Settings → Code security: Dependabot alerts, Secret scanning, Push protection

## Prawdziwy sklep (dopiero etap 3)

- [ ] Firma założona, wpis do rejestru zakładów w Sanepidzie, powiadomienia GIS (marka własna)
- [ ] Regulamin, polityka prywatności, polityka cookies, informacje przedumowne — sprawdzone przez prawnika
- [ ] Wyjątek od zwrotu dla otwartych suplementów jasno opisany
- [ ] Rejestr czynności przetwarzania, umowy powierzenia, procedura naruszeń (72 h)
- [ ] Operator płatności: tryb produkcyjny, webhooki z weryfikacją podpisu, ceny liczone na serwerze
- [ ] Subskrypcja: jasne zasady, przypomnienia, rezygnacja w 1–2 kliknięciach
- [ ] Baner cookies zgodny z PKE (jeśli są cookies inne niż niezbędne)
- [ ] Dostępność WCAG 2.1 AA, test czytnikiem ekranu
- [ ] Osoba odpowiedzialna za aktualizacje i incydenty
