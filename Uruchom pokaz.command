#!/bin/zsh
# Dwuklik: uruchamia stronę na tym komputerze i otwiera prezentację w przeglądarce.
# Zamknięcie okna Terminala wyłącza stronę.
cd "$(dirname "$0")"
[ -d node_modules ] || npm install
( sleep 3; open "http://localhost:4317/prezentacja.html" ) &
npm run dev -- --port 4317
