document.addEventListener("DOMContentLoaded", function () {
    const nombre = sessionStorage.getItem("usuarioNombre");

    if (!nombre) {
        window.location.replace("login.html");
        return;
    }
        document.getElementById("nombreUsuario").textContent = nombre;
     document.getElementById("btnSalir").addEventListener("click", function() {
        sessionStorage.removeItem("usuarioNombre");
        sessionStorage.removeItem("usuarioCorreo");
        window.location.replace("login.html");
     });
});