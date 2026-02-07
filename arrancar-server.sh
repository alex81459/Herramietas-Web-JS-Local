#!/usr/bin/env bash
set -e

echo "Iniciando servidor local en http://localhost:5500"
if command -v xdg-open >/dev/null 2>&1; then
	xdg-open "http://localhost:5500" >/dev/null 2>&1 &
fi
python3 -m http.server 5500
