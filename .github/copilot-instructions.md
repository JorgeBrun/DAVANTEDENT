# Copilot instructions — DavanteDent

Brief, actionable guidance for AI coding agents working on this repo.

- **Project type:** Static single-page web app (client-side only). See `src/index.html`.
- **Primary languages/files:** HTML (`src/index.html`), CSS (`src/style.css`), JavaScript (`src/script.js`).
- **Run / dev preview:** No build step. Open `src/index.html` in a browser or run a local server, e.g.:  
  ```bash
  python3 -m http.server 8000 --directory src
  ```

Architecture & data flow
- Single-page form-driven app: user fills `#formCita` → JS constructs a `Cita` instance (`class Cita` in `src/script.js`) → appended to the in-memory `citas` array → persisted to browser cookies via `guardarCookies()` → rendered into `#tablaCitas` by `mostrarCitas()`.
- Persistence is cookie-based (see `guardarCookies()` / `cargarCookies()`); there is no backend or remote API.

Key patterns & conventions
- Global DOM bindings: script accesses form fields by their IDs (e.g., `nombre`, `dni`, `fechaCita`, `formCita`). When modifying logic, keep these IDs intact or update both HTML and `src/script.js` together.
- Validation happens in `validarFormulario()` with project-specific rules: DNI regex `/^[0-9]{8}[A-Z]$/`, phone `/^[0-9]{9}$/`, and age >= 18 via `nacimiento` checks. Preserve explicit error messages shown in `#error`.
- IDs as primary keys: appointment `id` uses `Date.now().toString()` when creating new entries. CRUD operations locate by `id` (see `editarCita`, `eliminarCita`).
- DOM mutation: table rows are built with template literals in `mostrarCitas()` — be careful when changing markup to keep the column order consistent with table header.

Files to inspect for common tasks
- Add field to form: update `src/index.html` (add input/label), update `Cita` constructor and the new prop where `nuevaCita` is created in `src/script.js`, and include it in the table row in `mostrarCitas()`.
- Change persistence: to migrate from cookies to localStorage or a backend, update `guardarCookies()`/`cargarCookies()` and ensure JSON shape remains `{...}` identical to existing `citas` array.
- Adjust validation: update `validarFormulario()` and `marcarError()`; tests are manual — run in browser and submit forms.

Developer workflow notes
- No automated tests or linters present; changes should be manually validated in browser.
- For quick manual testing: run the local server above, add/modify/delete appointments and verify cookies (Application → Cookies in browser devtools) and table rendering.

Edge cases & gotchas
- Cookies storage size limits: large `citas` arrays may hit cookie size limits — consider switching to `localStorage` for more capacity.
- Date handling is string-based (ISO from `<input type="date">`); compare dates carefully if adding sorting/filtering logic.
- Many script variables are globals — refactor cautiously to avoid name collisions.

When editing code, prefer small, focused changes and include: changed HTML file, updated `src/script.js` constructor/usage sites, and updated `mostrarCitas()` row template.

If anything above is unclear or you want the instructions adjusted (more examples, commands, or a migration plan), tell me which section to expand.
