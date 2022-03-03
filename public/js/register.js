let qs = function (elemento) {
    return document.querySelector(elemento)
}

window.addEventListener('load', () => {
    console.log('Vinculado')

    let $inputName = qs('#name'),
        $nameErrors = qs('#nameErrors'),
        $inputSurname = qs('#surname'),
        $surnameErrors = qs('#surnameErrors'),
        $form = qs('#form'),
        $email = qs('#email'),
        $emailErrors = qs('#emailErrors'),
        $password = qs('#password'),
        $passwordErrors = qs('#passwordErrors'),
        $password2 = qs('#confirmarPassword'),
        $password2Errors = qs('#confirmarPasswordErrors'),
        $emaillog = qs('#emailLog'),
        $emailErrorsLog = qs('#emailErrorsLog'),
        $passwordLog = qs('#password'),
        $passwordErrorsLog = qs('#passwordErrorsLog'),

        $terms = qs('#flexCheckDefault'),
        $termsErrors = qs('#termsErrors'),
        regExAlpha = /^[a-zA-Z\sñáéíóúü ]*$/,
        regExEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
        regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;

    let validationsErrors = false;

    $inputName.addEventListener('blur', function () {
        switch (true) {
            case !$inputName.value.trim():
                $nameErrors.innerHTML = 'Debes colocar el nombre';
                $inputName.classList.add('is-invalid');
                validationsErrors = true
                break;
            case !regExAlpha.test($inputName.value):
                $nameErrors.innerHTML = 'Ingrese un nombre válido';
                $inputName.classList.add('is-invalid');
                validationsErrors = true
                break;
            default:
                $inputName.classList.remove('is-invalid');
                $inputName.classList.add('is-valid');
                $nameErrors.innerHTML = '';

                break;

        }
    })
    $inputSurname.addEventListener('blur', function () {
        console.log($inputSurname.value.trim())
        switch (true) {
            case !$inputSurname.value.trim():
                $surnameErrors.innerHTML = 'Ingresa tu apellido'
                $inputSurname.classList.add('is-invalid')
                break;
            case !regExAlpha.test($inputSurname.value):
                $surnameErrors.innerHTML = 'TIngresa tu apellido'
                $inputSurname.classList.add('is-invalid')
                break;
            default:
                $inputSurname.classList.remove('is-invalid');
                $inputSurname.classList.add('is-valid');
                $surnameErrors.innerHTML = ''
                break;
        }
    })
    $email.addEventListener('blur', function () {
        switch (true) {
            case !$email.value.trim():
                $emailErrors.innerHTML = 'Coloca tu email';
                $email.classList.add('is-invalid')
                break;
            case !regExEmail.test($email.value):
                $emailErrors.innerHTML = 'Coloca tu email';
                $email.classList.add('is-invalid')
                break
            default:
                $email.classList.remove('is-invalid');
                $email.classList.add('is-valid');
                $emailErrors.innerHTML = ''
                break;
        }
    })

    $password.addEventListener('blur', function () {
        switch (true) {
            case !$password.value.trim():
                $passwordErrors.innerHTML = 'Coloca tu contraseña';
                $password.classList.add('is-invalid')
                break;
            case !regExPass.test($password.value):
                $passwordErrors.innerHTML = 'Tu contraseña debe tener entre 8 a 12 caracteres';
                $password.classList.add('is-invalid')
                break;
            default:
                $password.classList.remove('is-invalid');
                $password.classList.add('is-valid');
                $passwordErrors.innerHTML = ''
                break;
        }
    })

    $password2.addEventListener('blur', function () {
        switch (true) {
            case !$password2.value.trim():
                $password2Errors.innerHTML = 'Debes confirmar tu contraseña';
                $password2.classList.add('is-invalid')
                break;
            case $password2.value != $password2.value:
                $password2Errors.innerHTML = 'Las contraseñas no concuerdan';
                $password2.classList.add('is-invalid')
                break;
            default:
                $password2.classList.remove('is-invalid');
                $password2.classList.add('is-valid');
                $password2Errors.innerHTML = ''
                break;
        }
    })

})
