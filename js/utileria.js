
/**
 * Valida el formato de un correo (usuario@dominio.tld).
 * @param {string} correo
 * @returns {boolean}
 */
function validarCorreo(correo) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(correo);
}

/**
 * Valida que el texto tenga solo letras (con acentos y ñ) y espacios.
 * @param {string} texto
 * @returns {boolean}
 */
function soloLetras(texto) {
  const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
  return regex.test(texto);
}

/**
 * Valida que un número no tenga más dígitos que el máximo.
 * @param {number|string} numero
 * @param {number} maxLongitud
 * @returns {boolean}
 */
function validarLongitud(numero, maxLongitud) {
  return String(numero).length <= maxLongitud;
}

/**
 * Calcula la edad en años a partir de la fecha de nacimiento.
 * @param {string|Date} fechaNacimiento - Formato "YYYY-MM-DD" o Date.
 * @returns {number} Edad como entero.
 */
function calcularEdad(fechaNacimiento) {
  let nacimiento;
  if (typeof fechaNacimiento === "string") {
    const [anio, mes, dia] = fechaNacimiento.split("-").map(Number);
    nacimiento = new Date(anio, mes - 1, dia);
  } else {
    nacimiento = new Date(fechaNacimiento);
  }

  const hoy = new Date();
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mes = hoy.getMonth() - nacimiento.getMonth();
  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }
  return edad;
}

/**
 * Indica si la persona tiene 18 años o más.
 * @param {string|Date} fechaNacimiento
 * @returns {boolean}
 */
function esMayorDeEdad(fechaNacimiento) {
  return calcularEdad(fechaNacimiento) >= 18;
}

/**
 * Valida contraseña: mínimo 8 caracteres, mayúscula, minúscula, número y carácter especial.
 * @param {string} password
 * @returns {boolean}
 */
function validarPassword(password) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/;
  return regex.test(password);
}

/**
 * Da formato (xxx) xxx-xxxx a un teléfono de 10 dígitos.
 * Si no tiene 10 dígitos, devuelve el texto original.
 * @param {string} numero
 * @returns {string}
 */
function formatearTelefono(numero) {
  const soloDigitos = String(numero).replace(/\D/g, "");
  if (soloDigitos.length !== 10) {
    return numero;
  }
  return `(${soloDigitos.slice(0, 3)}) ${soloDigitos.slice(3, 6)}-${soloDigitos.slice(6)}`;
}

/**
 * Mide la fortaleza de una contraseña según cuántas de 5 reglas cumple.
 * @param {string} password
 * @returns {string} "débil", "media" o "fuerte".
 */
function medirFortalezaPassword(password) {
  let puntos = 0;
  if (password.length >= 8) puntos++;
  if (/[a-z]/.test(password)) puntos++;
  if (/[A-Z]/.test(password)) puntos++;
  if (/\d/.test(password)) puntos++;
  if (/[^a-zA-Z0-9]/.test(password)) puntos++;

  if (puntos <= 2) return "débil";
  if (puntos <= 4) return "media";
  return "fuerte";
}