const USUARIO_FIJO = {
    correo: "camaron@gmail.com",
    password:"Camaron123!",
    nombre: "Administrador"
};

const formLogin =document.getElementById("formLogin");
const inputCorreo = document.getElementById("loginCorreo");
const inputPassword = document.getElementById("loginPassword");
const errorCorreo = document.getElementById("errorLoginCorreo");
const errorPassword = document.getElementById("errorLoginPassword");
const mensajeLogin = document.getElementById("mensajeLogin");

function marcarCampo(input, divError, esValido, mensaje) {
    input.classList.toggle("is-invalid", !esValido);
    divError.textContent = esValido ? "" : mensaje; 
}    

formLogin.addEventListener("submit", function (event) {
        event.preventDefault();
        const correo = inputCorreo.value.trim();
        const password = inputPassword.value;

        const correoOk = validarCorreo(correo);
        const passwordOk = validarPassword(password);

        marcarCampo(inputCorreo, errorCorreo, correoOk, "Escribe un correo valido (usuario@dominio.com)");
        marcarCampo(inputPassword, errorPassword, passwordOk , "Minimo 8 caracteres con Mayuscula, minuscula, numero y simbolo");
        mensajeLogin.classList.add("d-none");

        if(!(correoOk && passwordOk)) return;

        const coincide = correo.toLowerCase() === USUARIO_FIJO.correo && password === USUARIO_FIJO.password;

        if(!coincide){
            mensajeLogin.textContent = "Correo o contrasena incorectos";
            mensajeLogin.classList.remove("d-none");
            return;
        }

        sessionStorage.setItem("usuarioNombre", USUARIO_FIJO.nombre);
        sessionStorage.setItem("usuarioCorreo", correo);

        window.location.href = "index.html";
    });
