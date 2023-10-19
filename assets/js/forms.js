// DATOS CONTACTO

const nombre = document.getElementById('nombre-contacto');
const apellido = document.getElementById('apellido-contacto');
const email = document.getElementById('email-contacto');
const mensaje =  document.getElementById('mensaje-contacto');

// DATOS SUSCRIPCIÓN

const emailSuscripcion =  document.getElementById('email-suscripcion');


function validarContacto(){

    if(!empty(nombre) && !empty(apellido) && !empty(email) && !empty(mensaje)){


    }else{
        alert("El formulario esta vacio. Debe completarlo para poder eviarlo.")
    }

}

// VALIDACIONES SUSCRIPCIÓN

function validarSuscipcion(){

    if(!empty(emailSuscripcion)){



    }else{
        alert("El formulario esta vacio. Debe completarlo para poder eviarlo.")
    }


}


 


