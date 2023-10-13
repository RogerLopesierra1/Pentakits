    const firstNameInput = document.getElementById('first-name');
    const lastNameInput = document.getElementById('last-name');
    const emailInput = document.getElementById('email');
    const newPassword1Input = document.getElementById('new-password-1');
    const newPassword2Input = document.getElementById('new-password-2');
    const ageInput = document.getElementById('age');

    // Función para mostrar mensajes de error
    function showError(input, message) {
      const errorSpan = document.getElementById(input.id + '-error');
      errorSpan.textContent = message;
    }    

    // Función para validar el nombre
    function validateName(input) {
      const value = input.value.trim();

      if (value === '') {
        showError(input, 'Este campo es obligatorio.');
        input.classList.remove('valid');
        input.classList.add('invalid');
      } else if (/[\d!@#$%^&*()_+=[\]{};':"\\|,.<>/?~]/.test(value)) {
        showError(input, 'El nombre no debe contener números o caracteres especiales.');
        input.classList.remove('valid');
        input.classList.add('invalid');
      } else {
        showError(input, '');
        input.classList.remove('invalid');
        input.classList.add('valid');
      }
    }

    // Función para validar el correo electrónico
    function validateEmail(input) {
      const value = input.value.trim();

      if (value === '') {
        showError(input, 'Este campo es obligatorio.');
        input.classList.remove('valid');
        input.classList.add('invalid');
      } else if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(value)) {
        showError(input, 'El correo invalido cambiar a xxx@xxx.yyy x es numero o letra, y solo letra.');
        input.classList.remove('valid');
        input.classList.add('invalid');
      } else if (value.length < 8) {
        showError(input, 'El correo electrónico debe tener al menos 8 caracteres.');
        input.classList.remove('valid');
        input.classList.add('invalid');
      } else {
        showError(input, '');
        input.classList.remove('invalid');
        input.classList.add('valid');
      }
    }

    // Función para validar la contraseña
    function validatePassword(input) {
      const value = input.value.trim();

      if (value === '') {
        showError(input, 'Este campo es obligatorio.');
        input.classList.remove('valid');
        input.classList.add('invalid');
      } else if (!/^[a-z0-9]{8,}$/.test(value)) {
        showError(input, 'La contraseña debe tener al menos 8 caracteres y contener solo letras minúsculas y números.');
        input.classList.remove('valid');
        input.classList.add('invalid');
      } else {
        showError(input, '');
        input.classList.remove('invalid');
        input.classList.add('valid');
      }
    }

    // Función para validar que las contraseñas coincidan
    function validatePasswordMatch() {
      const password1 = newPassword1Input.value.trim();
      const password2 = newPassword2Input.value.trim();

      if (password1 === password2 && password1 !== '' && password2 !== '') {
        showError(newPassword2Input, '');
        newPassword2Input.classList.remove('invalid');
        newPassword2Input.classList.add('valid');
      } else {
        showError(newPassword2Input, 'Las contraseñas no coinciden.');
        newPassword2Input.classList.remove('valid');
        newPassword2Input.classList.add('invalid');
      }
    }

    // Función para validar la edad
    function validateAge(input) {
      const value = parseInt(input.value, 10);

      if (isNaN(value)) {
        showError(input, 'Este campo es obligatorio.');
        input.classList.remove('valid');
        input.classList.add('invalid');
      } else if (value < 18 || value > 120) {
        showError(input, 'La edad debe estar entre 18 y 120 años.');
        input.classList.remove('valid');
        input.classList.add('invalid');
      } else {
        showError(input, '');
        input.classList.remove('invalid');
        input.classList.add('valid');
      }
    }

    // Agregar oyentes de eventos para validar en tiempo real
    firstNameInput.addEventListener('input', () => {
      validateName(firstNameInput);
    });

    lastNameInput.addEventListener('input', () => {
      validateName(lastNameInput);
    });

    emailInput.addEventListener('input', () => {
      validateEmail(emailInput);
    });

    newPassword1Input.addEventListener('input', () => {
      validatePassword(newPassword1Input);
      validatePasswordMatch();
    });

    newPassword2Input.addEventListener('input', () => {
      validatePasswordMatch();
    });

    ageInput.addEventListener('input', () => {
      validateAge(ageInput);
    });