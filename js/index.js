
/*  TAREAS:
   1. HAMBURGUESA: al dar clic en #btnHamburguesa, abre/cierra el sidebar 
   2. NAVEGACIÓN: al dar clic en una opción con data-seccion, mostrar esa
      sección y ocultar las demás.
   3. CAPTURA DE USUARIOS: valida el formulario, mostrar errores y mensaje de éxito.
   4. ALUMNOS: validar campos nombre, número de control y fecha de nacimiento.
   5. MODAL DE EDAD: si el formulario de alumnos es válido, llena y abre 
      el modal con la edad calculada  */

document.addEventListener("DOMContentLoaded", function () {

    // TAREA 1: botón hamburguesa
    const btnHamburguesa = document.getElementById("btnHamburguesa");
    const sidebar = document.getElementById("sidebar");

    if (btnHamburguesa && sidebar) {
        btnHamburguesa.addEventListener("click", () => {
         sidebar.classList.toggle("oculto");
        });
    }

    // TAREA 2: navegación entre secciones
    const enlacesMenu = document.querySelectorAll("#sidebar [data-seccion]");
    const secciones = document.querySelectorAll(".seccion");

    enlacesMenu.forEach(enlace => {
        enlace.addEventListener("click", (e) => {
            e.preventDefault(); // Evita que la página recargue o brinque
            
            const seccionDestino = enlace.getAttribute("data-seccion");

            secciones.forEach(seccion => {
                if (seccion.id === seccionDestino) {
                    seccion.classList.remove("d-none"); // Muestra la sección correcta
                } else {
                    seccion.classList.add("d-none");    // Oculta las demás
                }
            });
        });
    });

    // TAREA 3: formulario de captura de usuarios
    const formCapturaUsuario = document.getElementById("formCapturaUsuario");
    const nombreCap = document.getElementById("nombreCap");
    const correoCap = document.getElementById("correoCap");
    const passCap = document.getElementById("passCap");
    const exitoCaptura = document.getElementById("exitoCaptura");

    if (formCapturaUsuario) {
        formCapturaUsuario.addEventListener("submit", (e) => {
            e.preventDefault();
            let todoValido = true;

            // 1. Validar nombre (que no esté vacío)
            if (nombreCap.value.trim() === "") {
                nombreCap.classList.add("is-invalid");
                todoValido = false;
            } else {
                nombreCap.classList.remove("is-invalid");
                nombreCap.classList.add("is-valid");
            }

            // 2. Validar correo usando la función de utileria.js
            if (typeof validarCorreo === "function" && !validarCorreo(correoCap.value)) {
                correoCap.classList.add("is-invalid");
                todoValido = false;
            } else {
                correoCap.classList.remove("is-invalid");
                correoCap.classList.add("is-valid");
            }

            // 3. Validar contraseña usando la función de utileria.js
            if (typeof validarPassword === "function" && !validarPassword(passCap.value)) {
                passCap.classList.add("is-invalid");
                todoValido = false;
            } else {
                passCap.classList.remove("is-invalid");
                passCap.classList.add("is-valid");
            }

            // Si todo el formulario es válido
            if (todoValido) {
                exitoCaptura.classList.remove("d-none");
                formCapturaUsuario.reset();
                nombreCap.classList.remove("is-valid");
                correoCap.classList.remove("is-valid");
                passCap.classList.remove("is-valid");
            } else {
                exitoCaptura.classList.add("d-none");
            }
        });
    }

    // TAREA 4: formulario de alumnos
    const formAlumno = document.getElementById("formAlumno");
    const nombreAlumno = document.getElementById("nombreAlumno");
    const numControl = document.getElementById("numControl");
    const fechaNacimiento = document.getElementById("fechaNacimiento");
    const exitoAlumno = document.getElementById("exitoAlumno");

    // Elementos del modal (para la Tarea 5)
    const lblNombre = document.getElementById("lblNombre");
    const lblControl = document.getElementById("lblControl");
    const lblEdad = document.getElementById("lblEdad");
    const lblEstatus = document.getElementById("lblEstatus");

    if (formAlumno) {
        formAlumno.addEventListener("submit", (e) => {
            e.preventDefault();
            let todoValido = true;

            // 1. Validar nombre con soloLetras() de utileria.js
            if (typeof soloLetras === "function" && !soloLetras(nombreAlumno.value)) {
                nombreAlumno.classList.add("is-invalid");
                todoValido = false;
            } else {
                nombreAlumno.classList.remove("is-invalid");
                nombreAlumno.classList.add("is-valid");
            }

            // 2. Validar número de control (exactamente 6 dígitos, solo números)
            const valorControl = numControl.value.trim();
            const esSoloNumeros = /^\d+$/.test(valorControl);
            const tieneOchoDigitos = valorControl.length === 6;

            if (!esSoloNumeros || !tieneOchoDigitos) {
                numControl.classList.add("is-invalid");
                todoValido = false;
            } else {
                numControl.classList.remove("is-invalid");
                numControl.classList.add("is-valid");
            }

            // 3. Validar fecha de nacimiento (que no esté vacía)
            if (fechaNacimiento.value.trim() === "") {
                fechaNacimiento.classList.add("is-invalid");
                todoValido = false;
            } else {
                fechaNacimiento.classList.remove("is-invalid");
                fechaNacimiento.classList.add("is-valid");
            }
 

    // TAREA 5: modal de edad

            // Si todo es válido, calculamos datos y abrimos el modal
            if (todoValido) {

                // Usamos las funciones de utileria.js para calcular edad y estatus
                const edadCalculada = calcularEdad(fechaNacimiento.value);
                const esMayor = esMayorDeEdad(fechaNacimiento.value);

                // Llenamos los datos dentro del modal
                lblNombre.textContent = nombreAlumno.value;
                lblControl.textContent = numControl.value;
                lblEdad.textContent = edadCalculada;
                lblEstatus.textContent = esMayor ? "Mayor de edad" : "Menor de edad";

                // Abrimos el modal de Bootstrap usando JavaScript
                const modalElement = document.getElementById("modalEdad");
                const modalEdad = new bootstrap.Modal(modalElement);
                modalEdad.show();

                // Limpiar formulario y bordes verdes después de abrir
                formAlumno.reset();
                exitoAlumno.classList.add("d-none");
                nombreAlumno.classList.remove("is-valid");
                numControl.classList.remove("is-valid");
                fechaNacimiento.classList.remove("is-valid");
            } else {
                exitoAlumno.classList.add("d-none");
            }
        });
    } 
 
});