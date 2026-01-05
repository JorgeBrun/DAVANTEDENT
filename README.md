# DavanteDent

Aplicación web para la gestión de citas de una clínica dental (cliente-side, sin backend).

## Contenidos
- `src/index.html` — interfaz principal y formulario de citas
- `src/script.js` — lógica de la aplicación (modelo `Cita`, validación, CRUD, persistencia en cookies)
- `src/style.css` — estilos

## Funcionalidades
- Alta, modificación y eliminación de citas
- Validación de formularios (DNI, teléfono, mayor de 18 años)
- Almacenamiento en cookies
- Interfaz web simple con HTML, CSS y JavaScript

## Ejecutar localmente
No hay paso de build. Abrir `src/index.html` en un navegador o usar un servidor estático:

```bash
python3 -m http.server 8000 --directory src
# luego abrir http://localhost:8000
```

## Notas para desarrolladores
- La app es una SPA simple: el formulario `#formCita` crea instancias de `Cita` y las guarda en el arreglo `citas`.
- Persistencia: `guardarCookies()` / `cargarCookies()` serializan `citas` a JSON en una cookie llamada `citas`.
- Identificadores: el `id` de una cita se genera con `Date.now().toString()` y se usa para editar/eliminar.
- Variables DOM: el código ha sido refactorizado para usar referencias DOM explícitas en `src/script.js` en lugar de depender de variables globales creadas por elementos con `id`.

## Recomendaciones rápidas
- Para migrar almacenamiento a `localStorage`, cambia `guardarCookies()`/`cargarCookies()` por `localStorage.setItem/getItem` respetando la forma JSON.
- Antes de cambiar la estructura del objeto `Cita`, actualiza la serialización y las filas que se renderizan en `mostrarCitas()`.

## Licencia
Revisa el fichero `LICENSE` en la raíz para los términos del proyecto.

Proyecto educativo – Desarrollo Web en Entorno Cliente.