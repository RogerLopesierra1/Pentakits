// Usamos el servicio de EmailJS para poder enviar el form de Contacto
function sendEmail() {
    const name = document.getElementById('from_name').value;
    const email = document.getElementById('email_id').value;
    const message = document.getElementById('message').value;

    // Validación de HTML
    const htmlValidacion = new RegExp("<.*?>");
    if (htmlValidacion.test(name) || htmlValidacion.test(email) || htmlValidacion.test(message)) {
        alert("No se permiten etiquetas HTML en los campos.");
        return;
    }

    // Validación de campos vacíos
    if (!name || !email || !message) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    // Validación de correo electrónico
    const validacionEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Validación de nombre
    const nombre = /^[a-zA-Z\s]+$/;
   
    if (!nombre.test(name)) {
        alert("Por favor, introduce un nombre y apellido válido");
        return;
    }

    if (!validacionEmail.test(email)) {
        alert("Por favor, introduce un correo electrónico válido.");
        return;
    }
    // Enviar email
    emailjs.send("default_service", "template_6ty8r7q", {
        from_name: name,
        email_id: email,
        message: message,
    }).then(function(response) {
        console.log("Email enviado con éxito", response);
        alert("Email enviado con éxito.");
    }, function(error) {
        console.log("Error al enviar el email", error);
        alert("Hubo un error al enviar el email.");
    });
}



function sendSuscriber() {
    const email = document.getElementById('email_suscripcion').value;
    // Validación de HTML
    const htmlValidacion = new RegExp("<.*?>");
    if (htmlValidacion.test(email)) {
        alert("No se permiten etiquetas HTML en los campos.");
        return;
    }
    // Validación de campos vacíos
    if (!email) {
        alert("Por favor, completa todos los campos.");
        return;
    }
    // Validación de correo electrónico
    const validacionEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!validacionEmail.test(email)) {
        alert("Por favor, introduce un correo electrónico válido.");
        return;
    }
    // Enviar email
    emailjs.send("default_service", "template_k0y3c46", {
        email_id: email,
    }).then(function(response) {
        console.log("Email enviado con éxito", response);
        alert("Email enviado con éxito.");
    }, function(error) {
        console.log("Error al enviar el email", error);
        alert("Hubo un error al enviar el email.");
    });
}


















