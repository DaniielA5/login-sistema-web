document.addEventListener("DOMContentLoaded", function () {
    const nombre = sessionStorage.getItem("usuarioNombre");

    if (nombre) {
        document.getElementById("nombreUsuario").textContent = nombre;
    }
});