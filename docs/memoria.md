# Memoria del proyecto — DavanteDent

**Autor:** Jorge Sainz Brun

**Fecha:** 2026-01-05

Resumen

DavanteDent es una pequeña aplicación web educativa para la gestión de citas en una clínica dental. Está implementada completamente en el lado cliente usando HTML, CSS y JavaScript puro; no hay servidor ni base de datos remota.

1. Objetivos

- Proveer una interfaz sencilla para crear, editar y eliminar citas.
- Validar datos básicos de entrada (DNI, teléfono, edad mínima).
- Guardar las citas en el navegador para persistencia entre sesiones.

2. Estructura del repositorio

- `src/index.html` — Interfaz principal: formulario y tabla de citas.
- `src/style.css` — Reglas CSS para la presentación.
- `src/script.js` — Lógica de la aplicación: clase `Cita`, validación, CRUD, persistencia y renderizado.
- `src/assets/logo.png` — Logo de la cabecera (se incluye en la memoria).
- `docs/memoria.md` — Esta memoria (origen para el PDF).
- `.github/copilot-instructions.md` — Instrucciones específicas para AI agents.

3. Arquitectura y flujo de datos

La aplicación sigue un flujo simple y lineal:

- El usuario completa el formulario `#formCita` y envía los datos.
- `script.js` crea una instancia de `Cita` y la añade al array global `citas`.
- `guardarCookies()` serializa `citas` a JSON y lo almacena en `localStorage` bajo la clave `citas`.
- `mostrarCitas()` recorre el array y renderiza cada elemento como una fila de la tabla `#tablaCitas`.

4. Componentes clave y responsabilidades

- Clase `Cita` (`src/script.js`): modelo de dominio que agrupa los campos `id, nombre, apellidos, dni, telefono, nacimiento, fechaCita, hora, observaciones`.
- Validación (`validarFormulario()`): implementa reglas concretas:
  - DNI: 8 dígitos y letra mayúscula — regex `/^[0-9]{8}[A-Z]$/`.
  - Teléfono: exactamente 9 dígitos — regex `/^[0-9]{9}$/`.
  - Fecha de nacimiento: no futura y edad mínima 18 años.
- Persistencia: `localStorage` garantiza que las citas se mantengan entre recargas y sesiones en el mismo navegador.
- CRUD:
  - Crear/Actualizar: manejar `id` con `Date.now().toString()` y reemplazar por `id` si existe.
  - Eliminar: filtrar el array por `id`.

5. Decisiones de diseño y justificación

- Sin backend: el alcance del proyecto es educativo; usar solo cliente simplifica despliegue y evaluación.
- `localStorage` vs cookies: `localStorage` evita límites de tamaño y manejo tedioso de expiraciones; es adecuado para datos de usuario local.
- Variables DOM explícitas: para mayor claridad y menos dependencia de comportamientos del navegador, `script.js` obtiene referencias DOM con `document.getElementById(...)`.

6. Uso y funcionamiento (resumen para el lector)

Se describe a continuación el comportamiento observable al usar la aplicación:

- Pantalla principal: el encabezado muestra el logo y el título. Bajo él aparece el formulario para crear o editar citas y, debajo, la tabla con las citas registradas.
- Crear cita: rellena los campos obligatorios (nombre, apellidos, DNI, teléfono, fecha de nacimiento, fecha y hora de cita) y pulsa "Guardar cita". Si hay errores, se muestra un mensaje en rojo en el campo `#error`.
- Editar cita: en la tabla, pulsar "Editar" cargará los datos en el formulario; tras modificar, pulsar "Guardar cita" sobrescribe la entrada.
- Eliminar cita: pulsar "Eliminar" en la fila correspondiente y la cita desaparecerá del listado y del `localStorage`.

7. Imágenes y contenido visual (incluir en PDF)

Incluyo el logo del proyecto dentro del repositorio; las capturas de pantalla concretas (formulario, tabla, consola DevTools) no se han añadido aquí. En el PDF final deben aparecer, en el siguiente orden:

- Portada con logo y meta-información (autor/fecha).
- Captura del formulario completado (ejemplo de entrada válida).
- Captura de la tabla con varias citas.
- Captura de DevTools -> Application mostrando la clave `citas` en `localStorage`.

En el Markdown de la memoria he colocado marcadores donde deberían ir las imágenes:

![Logo](../src/assets/logo.png)

![Formulario: ejemplo](images/form.png)

![Tabla: ejemplo](images/tabla.png)

![LocalStorage en DevTools](images/localstorage.png)

Nota: si quieres, puedo generar el PDF final y añadir las imágenes si me proporcionas las capturas (subiéndolas aquí o indicando dónde están); de lo contrario crearé el PDF con los marcadores vacíos.

8. Limitaciones y mejoras propuestas

- Actualmente no hay validación contra duplicados (mismo DNI y fecha), podría añadirse lógica para avisar/evitar duplicados.
- Internacionalización y formatos de fecha: la app usa el formato del navegador; para un proyecto real convendría normalizar o permitir formatos.
- Tests: añadir pruebas unitarias para `validarFormulario()` y para las operaciones CRUD.

9. Archivos relevantes

- `src/index.html` — formulario y tabla
- `src/script.js` — lógica principal
- `src/style.css` — estilos

10. Conclusión

DavanteDent es una práctica adecuada para entender el ciclo completo de una pequeña aplicación cliente: captura de datos, validación, persistencia local y renderizado dinámico. Es fácil de ejecutar y de extender para prácticas posteriores.

---

Si quieres que genere el PDF final yo mismo, sube las capturas (`form.png`, `tabla.png`, `localstorage.png`) dentro de `docs/images/` y yo integraré las imágenes en el PDF y lo subiré al repositorio.
