# Memoria del proyecto — DavanteDent

Autor: Jorge Sainz Brun

Fecha: 2026-01-05

Resumen
- Proyecto educativo: aplicación cliente para la gestión de citas de una clínica dental.
- Tecnologías: HTML, CSS y JavaScript puro (sin frameworks ni back-end).

1. Objetivos
- Permitir alta, edición y eliminación de citas.
- Validación de datos básicos (DNI, teléfono, edad >= 18).
- Persistencia simple en el navegador (localStorage).

2. Estructura del proyecto
- `src/index.html`: interfaz y formulario principal.
- `src/style.css`: estilos.
- `src/script.js`: lógica de la app: clase `Cita`, validaciones, CRUD, persistencia y renderizado.
- `src/assets/logo.png`: logo usado en la cabecera.
- `.github/copilot-instructions.md`: instrucciones para AI agents.

3. Arquitectura y flujo de datos
- El usuario rellena el formulario `#formCita`.
- JavaScript crea una instancia `Cita` y la añade al array `citas`.
- `guardarCookies()` serializa `citas` a JSON y lo guarda en `localStorage` (clave `citas`).
- `mostrarCitas()` renderiza el array en la tabla `#tablaCitas`.

4. Validaciones importantes (implementadas en `validarFormulario()`)
- DNI: 8 dígitos + letra mayúscula — regex `/^[0-9]{8}[A-Z]$/`.
- Teléfono: exactamente 9 dígitos — regex `/^[0-9]{9}$/`.
- Fecha de nacimiento: no futura y edad >= 18.

5. Persistencia
- Implementado con `localStorage` (clave `citas`) para facilitar pruebas y evitar límites de cookies.

6. Cómo ejecutar y generar PDF con capturas

- Ejecuta un servidor local desde la raíz del proyecto:

```bash
python3 -m http.server 8000 --directory src
# abrir http://localhost:8000
```

- Capturar pantallas (ejemplo con Google Chrome en macOS):

```bash
# formulario principal
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
  --headless --disable-gpu --window-size=1200,900 \
  --screenshot=docs/screenshots/form.png http://localhost:8000

# tabla de citas (tras crear algunas citas)
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
  --headless --disable-gpu --window-size=1200,900 \
  --screenshot=docs/screenshots/tabla.png http://localhost:8000
```

- Convertir la memoria a PDF (opciones):

1) Usando `pandoc` (recomendado si lo tienes instalado):

```bash
pandoc docs/memoria.md -o docs/memoria.pdf --from markdown -V geometry:margin=1in --resource-path=src:docs
```

2) Usando `wkhtmltopdf` sobre la versión HTML (puedes crear `docs/memoria.html` o abrir `docs/memoria.md` en el navegador y guardar como PDF):

```bash
wkhtmltopdf docs/memoria.html docs/memoria.pdf
```

7. Capturas incluidas (marcadores)
- `docs/screenshots/form.png` — formulario para crear una cita.
- `docs/screenshots/tabla.png` — tabla con citas guardadas.
- `docs/screenshots/localstorage.png` — panel de DevTools mostrando la clave `citas` en `localStorage`.

Nota: no incluyo capturas en este repositorio por no tener acceso al navegador gráfico desde aquí. Sigue las instrucciones anteriores para generarlas localmente; el script `scripts/generate_pdf.sh` (añadido) automatiza el proceso si tienes Chrome y `pandoc` o `wkhtmltopdf`.

8. Conclusiones y mejoras futuras
- Aplicación adecuada para prácticas de cliente: sencilla, auto-contenida y fácil de auditar.
- Mejoras sugeridas: migración a `localStorage` (ya aplicada), modularización del JS, añadir tests unitarios con Karma/Jest para la lógica y mejorar accesibilidad del formulario.

Apéndice: ubicación de los ficheros clave
- `src/index.html`
- `src/script.js`
- `src/style.css`
