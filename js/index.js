/* =========================================================
            CHAY 


   REGLAS:
   - Todo el código va DENTRO del DOMContentLoaded de abajo. Así no chocan
     los nombres de variables con sesion.js, que escribo .
   - Usa las funciones de utileria.js (ya está cargada en index.html).
   - Un commit por tarea y git pull antes de cada git push.

   TAREAS, en este orden:
   1. HAMBURGUESA: al dar clic en #btnHamburguesa, abrir/cerrar el sidebar
      (agregar/quitar la clase que creaste en index.css).
   2. NAVEGACIÓN: al dar clic en una opción con data-seccion, mostrar esa
      sección y ocultar las demás (todas tienen la clase .seccion).
      Pista: classList.toggle("d-none", condicion)
   3. CAPTURA DE USUARIOS: validar el formulario con validarCorreo() y
      validarPassword(); mostrar errores y mensaje de éxito.
   4. ALUMNOS: validar nombre (soloLetras), número de control (exactamente
      6 dígitos, solo números) y fecha de nacimiento.
   5. MODAL DE EDAD: si el formulario de alumnos es válido, llenar y abrir
      el modal con calcularEdad() y esMayorDeEdad().
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    // TAREA 1: botón hamburguesa
    const btnHamburguesa = document.getElementById("btnHamburguesa");
    const sidebar = document.getElementById("sidebar");

    if (btnHamburguesa && sidebar) {
        btnHamburguesa.addEventListener("click", () => {
         sidebar.classList.toggle("d-none");
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

    // TAREA 5: modal de edad

});