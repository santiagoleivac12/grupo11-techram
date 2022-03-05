function qs(element) {
    return document.querySelector(element)
}

window.addEventListener('load', ()=> {

    let $form = qs('form'),
        $email = qs('#email-front'),
        $passFront = qs('#passFront'),
        $emailErrors = qs('#emailErrors'),
        $passError = qs('#passError')
    //exprecion regular para email y contraceña
    let regExEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
    let regExPass = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;

    let validationsErrors = false;

//email
    $email.addEventListener('blur', function(){
        switch (true){
            case !$email.value.trim():
                $emailErrors.innerHTML = 'Debes completar el campo email';
                $email.classList.add('is-invalid');
                validationsErrors = true;
                break;
            case !regExEmail.test($email.value):
                $emailErrors.innerHTML = 'Debes ingresar un email válido';
                $email.classList.add('is-invalid');
                validationsErrors = true;
                break;
            default:
                $email.classList.remove('is-invalid');
                $email.classList.add('is-valid');
                $emailErrors.innerHTML = "";
                validationsErrors = false;
                break
        }
    })
    //contraseña 
    $passFront.addEventListener('blur', function(){
        switch (true) {
            case !$passFront.value.trim():
                $passError.innerHTML = 'Debes completar el campo contraseña';
                $passFront.classList.add('is-invalid');
                validationsErrors = true;
                break;
            case !regExPass.test($passFront.value):
                $passError.innerHTML = 'contraseña incorrecta';
                $passFront.classList.add('is-invalid');
                validationsErrors = true;
                break;
            default:
                $passFront.classList.remove('is-invalid');
                $passFront.classList.add('is-valid');
                $passError.innerHTML = "";
                validationsErrors = false
                break
        }
    })
    //para que el form no se envie incompleto.
    $form.addEventListener('submit', (event) => {
        event.preventDefault();
        alert('tenes que completar los campos')
    })
})