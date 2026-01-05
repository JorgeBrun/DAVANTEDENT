class Cita {
    constructor(id, nombre, apellidos, dni, telefono, nacimiento, fechaCita, hora, observaciones) {
        this.id = id;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.dni = dni;
        this.telefono = telefono;
        this.nacimiento = nacimiento;
        this.fechaCita = fechaCita;
        this.hora = hora;
        this.observaciones = observaciones;
    }
}

let citas = [];

/* ================= COOKIES ================= */
function guardarCookies() {
    const fecha = new Date();
    fecha.setFullYear(fecha.getFullYear() + 1);
    document.cookie =
        "citas=" +
        encodeURIComponent(JSON.stringify(citas)) +
        ";expires=" +
        fecha.toUTCString() +
        ";path=/";
}

function cargarCookies() {
    const cookie = document.cookie
        .split("; ")
        .find(c => c.startsWith("citas="));
    if (cookie) {
        citas = JSON.parse(decodeURIComponent(cookie.split("=")[1]));
    }
}

/* ================= VALIDACIÓN ================= */
function validarFormulario() {
    let valido = true;
    const error = document.getElementById("error");
    error.textContent = "";

    document.querySelectorAll("input, textarea").forEach(el => {
        el.style.border = "1px solid #ccc";
    });

    if (nombre.value.trim() === "") {
        marcarError(nombre, "El nombre es obligatorio");
        valido = false;
    }

    if (apellidos.value.trim() === "") {
        marcarError(apellidos, "Los apellidos son obligatorios");
        valido = false;
    }

    /* DNI: 8 números + 1 letra MAYÚSCULA */
    const dniValor = dni.value.trim();
    const dniRegex = /^[0-9]{8}[A-Z]$/;
    if (!dniRegex.test(dniValor)) {
        marcarError(dni, "El DNI debe tener 8 números y una letra mayúscula");
        valido = false;
    }

    /* TELÉFONO: EXACTAMENTE 9 DÍGITOS */
    const telefonoValor = telefono.value.trim();
    const telefonoRegex = /^[0-9]{9}$/;
    if (!telefonoRegex.test(telefonoValor)) {
        marcarError(telefono, "El teléfono debe tener exactamente 9 dígitos");
        valido = false;
    }

    /* FECHA NACIMIENTO: MAYOR DE 18 Y NO FUTURA */
    if (nacimiento.value === "") {
        marcarError(nacimiento, "La fecha de nacimiento es obligatoria");
        valido = false;
    } else {
        const fechaNacimiento = new Date(nacimiento.value);
        const hoy = new Date();

        if (fechaNacimiento >= hoy) {
            marcarError(nacimiento, "La fecha de nacimiento no puede ser futura");
            valido = false;
        } else {
            let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
            const m = hoy.getMonth() - fechaNacimiento.getMonth();

            if (m < 0 || (m === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
                edad--;
            }

            if (edad < 18) {
                marcarError(nacimiento, "El paciente debe tener al menos 18 años");
                valido = false;
            }
        }
    }

    if (fechaCita.value === "") {
        marcarError(fechaCita, "La fecha de la cita es obligatoria");
        valido = false;
    }

    if (horaCita.value === "") {
        marcarError(horaCita, "La hora de la cita es obligatoria");
        valido = false;
    }

    return valido;
}

function marcarError(input, mensaje) {
    input.style.border = "2px solid red";
    document.getElementById("error").textContent = mensaje;
}

/* ================= TABLA ================= */
function mostrarCitas() {
    const tbody = document.querySelector("#tablaCitas tbody");
    tbody.innerHTML = "";

    if (citas.length === 0) {
        tbody.innerHTML = `<tr><td colspan="10">dato vacío</td></tr>`;
        return;
    }

    citas.forEach((cita, index) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${index + 1}</td>
            <td>${cita.nombre}</td>
            <td>${cita.apellidos}</td>
            <td>${cita.dni}</td>
            <td>${cita.telefono}</td>
            <td>${cita.nacimiento}</td>
            <td>${cita.fechaCita}</td>
            <td>${cita.hora}</td>
            <td>${cita.observaciones}</td>
            <td>
                <button onclick="editarCita('${cita.id}')">Editar</button>
                <button onclick="eliminarCita('${cita.id}')">Eliminar</button>
            </td>
        `;
        tbody.appendChild(fila);
    });
}

/* ================= EVENTOS ================= */
document.getElementById("formCita").addEventListener("submit", function (e) {
    e.preventDefault();

    if (!validarFormulario()) return;

    const id = idCita.value || Date.now().toString();

    const nuevaCita = new Cita(
        id,
        nombre.value.trim(),
        apellidos.value.trim(),
        dni.value.trim(),
        telefono.value.trim(),
        nacimiento.value,
        fechaCita.value,
        horaCita.value,
        observaciones.value.trim()
    );

    citas = citas.filter(c => c.id !== id);
    citas.push(nuevaCita);

    guardarCookies();
    mostrarCitas();
    this.reset();
    idCita.value = "";
});

/* ================= CRUD ================= */
function eliminarCita(id) {
    citas = citas.filter(c => c.id !== id);
    guardarCookies();
    mostrarCitas();
}

function editarCita(id) {
    const cita = citas.find(c => c.id === id);
    if (!cita) return;

    idCita.value = cita.id;
    nombre.value = cita.nombre;
    apellidos.value = cita.apellidos;
    dni.value = cita.dni;
    telefono.value = cita.telefono;
    nacimiento.value = cita.nacimiento;
    fechaCita.value = cita.fechaCita;
    horaCita.value = cita.hora;
    observaciones.value = cita.observaciones;
}

/* ================= INICIO ================= */
cargarCookies();
mostrarCitas();