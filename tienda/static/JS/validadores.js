


//**CODIGO ANTIGUO, ANTES DEL USO DE DJGANGO SE HACIAN LAS VALIDACION CON JS */


//_____________________________________________________________________________________

// *VALIDADOR FORMULARIO CREAR CUENTA
/* function formCrearCuenta() {
    //const form = document.getElementById('formularioCrearCuenta');  
    const userName = document.getElementById('userNameCrearCuenta').value.trim();
    const userEmail = document.getElementById('userEmailCrearCuenta').value.trim();
    const pass1 = document.getElementById('userPasswordCrearCuenta').value.trim();
    const pass2 = document.getElementById('confirmPasswordCrearCuenta').value.trim();

    console.log("Validando formulario...");

    // Validar nombre de usuario
    if (userName.length < 6) {
        alert("El nombre de usuario debe contener al menos 6 caracteres");
        return false;
    }

    // Validar email usando expresion regular
    const validEmailPattern = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    if (!validEmailPattern.test(userEmail)) {
        alert('El email es inválido, por favor ingresa un email correcto');
        return false;
    }

    // Validar contraseña con expresion regular
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/; 
    if (!passwordPattern.test(pass1)) {
        alert("La contraseña debe contener al menos 6 caracteres, incluyendo una mayúscula, una minúscula y un número");
        return false;
    }
    if (pass1!== pass2) {
        alert("Las contraseñas no coinciden");
        return false;
    }

    // Si todas las validaciones son exitosas, se retorna true para enviar el formulario
    alert("La cuenta ha sido creada satisfactoriamente");
    return true;
} */



//_____________________________________________________________________________________



//*VALIDADOR FORMULARIO ESTANDAR
/* function formEstandar() {
    const form = document.getElementById('formEstandar');  
    const userName = document.getElementById('nameFormEstandar').value.trim();
    const userEmail = document.getElementById('emailFormEstandar').value.trim();
    const text = document.getElementById('messageFormEstandar').value.trim();


    console.log("Validando formulario...");

    //Validar nombre de usuario
    if (userName.length < 6) {
        alert("El nombre debe contener al menos 6 caracteres");
        return;
    }

    //Validar email usando expresion regular. Las Expresiones Regulares son patrones de busqueda que se usan para verificar si una cadena de texto cumple con un formato específico.
    const validEmailPattern = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    if (!validEmailPattern.test(userEmail)) { //El metodo test() retorna true si la cadena cumple con el patron y viceversa
        alert('El email es inválido, por favor ingresa un email correcto');
        return;
    }

    // Validar texto
    if (text.length < 12) {
        alert("El texto debe tener minimo 12 caracteres");
        return;
    }

    // Si todas las validaciones son exitosas, enviar el formulario al futuro servidor
    alert("El mensaje ha sido enviado satisfactoriamente");
    form.submit();
    
}
 */

//_____________________________________________________________________________________


//*VALIDADOR FORMULARIO CONTACTO
/* 
function formContacto() {
    const form = document.getElementById('formContacto');
    const userName = document.getElementById('nombreFormContacto').value.trim();
    const userEmail = document.getElementById('emailFormContacto').value.trim();
    const userTelefono = document.getElementById('telefonoFormContacto').value.trim();
    const userAsunto = document.getElementById('asuntoFormContacto').value.trim();
    const userTextMain = document.getElementById('mensajeFormContacto').value.trim();

    console.log("Validando formulario...");

    // Validar nombre de usuario
    if (userName.length < 6) {
        alert("El nombre debe contener al menos 6 caracteres");
        return;
    }

    // Validar email usando expresión regular
    const validEmailPattern = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    if (!validEmailPattern.test(userEmail)) {
        alert('El email es inválido, por favor ingresa un email correcto');
        return;
    }

    // Validar numero de telefono
    if (userTelefono.length < 10) {
        alert("El numero de telefono debe tener minimo 10 caracteres");
        return;
    }

    // Validar texto de usuario
    if (userAsunto.length < 8) {
        alert("El asunto debe tener minimo 8 caracteres");
        return;
    }

     // Validar texto de usuario
     if (userTextMain.length < 16) {
        alert("El mensaje debe tener minimo 16 caracteres");
        return;
    }

    // Si todas las validaciones son exitosas, enviar el formulario al futuro backend
    form.submit();
    alert("El mensaje ha sido enviado satisfactoriamente");
}
 */