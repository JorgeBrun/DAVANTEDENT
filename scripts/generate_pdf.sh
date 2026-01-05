#!/usr/bin/env bash
# Script helper to capture screenshots and generate a PDF of the memoria.
# Requires: google-chrome (or Chromium), and either pandoc or wkhtmltopdf.

set -e

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
SRC_DIR="$ROOT_DIR/src"
DOCS_DIR="$ROOT_DIR/docs"
SCREEN_DIR="$DOCS_DIR/screenshots"

mkdir -p "$SCREEN_DIR"

echo "Iniciando servidor estático en puerto 8000 (background)..."
pushd "$SRC_DIR" > /dev/null
python3 -m http.server 8000 &
SERVER_PID=$!
popd > /dev/null

sleep 1

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
if [ ! -x "$CHROME" ]; then
  CHROME="google-chrome"
fi

echo "Capturando formulario..."
"$CHROME" --headless --disable-gpu --window-size=1200,900 --screenshot="$SCREEN_DIR/form.png" http://localhost:8000

echo "Capturando tabla de citas..."
"$CHROME" --headless --disable-gpu --window-size=1200,900 --screenshot="$SCREEN_DIR/tabla.png" http://localhost:8000

echo "Deteniendo servidor..."
kill $SERVER_PID || true

if command -v pandoc >/dev/null 2>&1; then
  echo "Generando PDF con pandoc..."
  pandoc "$DOCS_DIR/memoria.md" -o "$DOCS_DIR/memoria.pdf" --resource-path="$SRC_DIR:$DOCS_DIR" -V geometry:margin=1in
  echo "PDF generado: $DOCS_DIR/memoria.pdf"
elif command -v wkhtmltopdf >/dev/null 2>&1; then
  echo "wkhtmltopdf no tiene markdown directo; convierta primero a HTML o abra memoria.md en navegador y guarde como PDF."
else
  echo "No se encontró 'pandoc' ni 'wkhtmltopdf'. El Markdown está en $DOCS_DIR/memoria.md."
fi

echo "Listo. Añade o revisa las capturas en $SCREEN_DIR antes de generar el PDF si quieres mejor resultado."
