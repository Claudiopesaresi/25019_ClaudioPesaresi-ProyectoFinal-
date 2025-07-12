/*Función que ejecute todas las validaciones*/
function validateForm() {
  const name = document.getElementById('nombre').value;
  const pass = document.getElementById('pwd').value;
  let isValid = true;
  let mensaje2 = '';

  //valido si el campo nombre esta vacío
  if(name.trim() === '') {
    showError('empty-name', 'El nombre es obligatorio');
    isValid = false;
  } else {
    hideError('empty-name');
  }

  //Valida que el nombre tenga como mínimo dos caracteres
  if(name.trim() !== '' && name.length <= 7) {
    showError('min-name', 'El nombre tiene que tener 8 caracteres o más');
    isValid = false;
  } else {
    hideError('min-name');
  }

  if(pass.trim() === '') {
    showError('empty-pwd', 'La clave es obligatoria');
    isValid = false;
  } else {
    hideError('empty-pwd');

  }

  mensaje2 = esValida(pass.trim());
  //Valida que la contraseña tenga al menos una mayúscula, una minúscula

  if ( pass.trim() !== '' && mensaje2.length > 0) {
    showError('car-pwd', mensaje2);
    isValid = false;
  } else {
    hideError('car-pwd');
  }

    //Valida que La contraseña ingresada sea la correcta
  if(pass.trim() !== 'Pepe1234' ) {
    showError('OK-pwd', 'LA CLAVE ES INCORRECTA');
    isValid = false;
  } else {
    hideError('OK-pwd');
  }


  /*
  //Valida que el campo edad no este vacio y que la edad sea mayor a 18
  if(age.trim() !== '' && age < 18) {
    showError('min-age', 'El usuario es menor de edad');
    isValid = false;
  } else {
    hideError('min-age');
  }
*/


  /*Validar si el nombre tiene algún carácter prohibido
  Se puede usar regexp o iterar los caracteres y compararlos con un 
  conjunto de caracteres prohibidos.
  */


  


  return isValid;
}

function esValida(cadena) {
  let tieneMayuscula = false;
  let tieneMinuscula = false;
  let tieneNumero = false;
  let mensaje = '';  

  for (let i = 0; i < cadena.length; i++) {
    const char = cadena[i];

    if (/[A-Z]/.test(char)) tieneMayuscula = true;
    else if (/[a-z]/.test(char)) tieneMinuscula = true;
    else if (/[0-9]/.test(char)) tieneNumero = true;

    // Cortar antes si ya cumple todo
    if (tieneMayuscula && tieneMinuscula && tieneNumero) return '';

  }

  if (!tieneMayuscula ) {
      mensaje += ' Falta mayúscula.';  
  }
  if (!tieneMinuscula ) {
      mensaje += ' Falta minúscula.';  
  }
  if (!tieneNumero) {
      mensaje += ' Falta número. ';  
  }

  return mensaje;
}
/*Función que muestre todos los mensajes de error*/
function showError(fieldId, message) {
  const errorElement = document.getElementById(fieldId + '-error');
  errorElement.textContent = "❌ " + message;
  errorElement.style.display = 'block';
}

/*Función que oculte los mensajes de error*/
function hideError(fieldId) {
  const errorElement = document.getElementById(fieldId + '-error');
  errorElement.style.display = 'none';
}

/*Agregar un listener para el botón Enviar*/
const btnEnviar = document.getElementById('btnEnviar');
btnEnviar.addEventListener('click', function(event) {
  event.preventDefault;
  if(validateForm()) {
    window.location.href = "./pages/fakestore.html";
  }
});

/*Redireccionamiento si los datos son válidos*/
