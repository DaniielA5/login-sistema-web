
document.addEventListener("DOMContentLoaded", function () {

    const btnHamburguesa = document.getElementById("btnHamburguesa");
    const sidebar = document.getElementById("sidebar");

    if (btnHamburguesa && sidebar) {
        btnHamburguesa.addEventListener("click", () => {
         sidebar.classList.toggle("oculto");
        });
    }

    const enlacesMenu = document.querySelectorAll("#sidebar [data-seccion]");
    const secciones = document.querySelectorAll(".seccion");

    enlacesMenu.forEach(enlace => {
        enlace.addEventListener("click", (e) => {
            e.preventDefault(); 
            
            const seccionDestino = enlace.getAttribute("data-seccion");

            secciones.forEach(seccion => {
                if (seccion.id === seccionDestino) {
                    seccion.classList.remove("d-none"); 
                } else {
                    seccion.classList.add("d-none");    
                }
            });
        });
    });

    const formCapturaUsuario = document.getElementById("formCapturaUsuario");
    const nombreCap = document.getElementById("nombreCap");
    const correoCap = document.getElementById("correoCap");
    const passCap = document.getElementById("passCap");
    const exitoCaptura = document.getElementById("exitoCaptura");

    if (formCapturaUsuario) {
        formCapturaUsuario.addEventListener("submit", (e) => {
            e.preventDefault();
            let todoValido = true;

            if (nombreCap.value.trim() === "") {
                nombreCap.classList.add("is-invalid");
                todoValido = false;
            } else {
                nombreCap.classList.remove("is-invalid");
                nombreCap.classList.add("is-valid");
            }

            if (typeof validarCorreo === "function" && !validarCorreo(correoCap.value)) {
                correoCap.classList.add("is-invalid");
                todoValido = false;
            } else {
                correoCap.classList.remove("is-invalid");
                correoCap.classList.add("is-valid");
            }

            if (typeof validarPassword === "function" && !validarPassword(passCap.value)) {
                passCap.classList.add("is-invalid");
                todoValido = false;
            } else {
                passCap.classList.remove("is-invalid");
                passCap.classList.add("is-valid");
            }

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

    // formulario de alumno
    const formAlumno = document.getElementById("formAlumno");
    const nombreAlumno = document.getElementById("nombreAlumno");
    const numControl = document.getElementById("numControl");
    const fechaNacimiento = document.getElementById("fechaNacimiento");
    const exitoAlumno = document.getElementById("exitoAlumno");

    const lblNombre = document.getElementById("lblNombre");
    const lblControl = document.getElementById("lblControl");
    const lblEdad = document.getElementById("lblEdad");
    const lblEstatus = document.getElementById("lblEstatus");

    if (formAlumno) {
        formAlumno.addEventListener("submit", (e) => {
            e.preventDefault();
            let todoValido = true;
            if (typeof soloLetras === "function" && !soloLetras(nombreAlumno.value)) {
                nombreAlumno.classList.add("is-invalid");
                todoValido = false;
            } else {
                nombreAlumno.classList.remove("is-invalid");
                nombreAlumno.classList.add("is-valid");
            }

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

            if (fechaNacimiento.value.trim() === "") {
                fechaNacimiento.classList.add("is-invalid");
                todoValido = false;
            } else {
                fechaNacimiento.classList.remove("is-invalid");
                fechaNacimiento.classList.add("is-valid");
            }
 
            if (todoValido) {

                const edadCalculada = calcularEdad(fechaNacimiento.value);
                const esMayor = esMayorDeEdad(fechaNacimiento.value);

                lblNombre.textContent = nombreAlumno.value;
                lblControl.textContent = numControl.value;
                lblEdad.textContent = edadCalculada;
                lblEstatus.textContent = esMayor ? "Mayor de edad" : "Menor de edad";


                const modalElement = document.getElementById("modalEdad");
                const modalEdad = new bootstrap.Modal(modalElement);
                modalEdad.show();

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