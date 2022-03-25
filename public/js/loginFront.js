function qs(element) {
    return document.querySelector(element)
}

window.addEventListener('load', () => {

    let $form = qs('form'),
        $email = qs('#email-front'),
        $passFront = qs('#passFront'),
        $emailErrors = qs('#emailErrors'),
        $passError = qs('#passError'),
        $checkEmail = qs("#id-email"),
        $checkPass = qs("#id-password"),
        $login = qs('#login-error')
    //exprecion regular para email y contraceñanodemon
    let regExEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/


    let validationsErrors = false;

    //email
    $email.addEventListener('blur', function () {
        switch (true) {
            case !$email.value.trim():
                $emailErrors.innerHTML = 'Debes completar el campo email';
                $email.classList.add('is-invalid');
                $checkEmail.style.display= "none"
                validationsErrors = true;
                break;
            case !regExEmail.test($email.value):
                $emailErrors.innerHTML = 'Debes ingresar un email válido';
                $email.classList.add('is-invalid');
                $checkEmail.style.display= "none"
                validationsErrors = true;
                break;
            default:
                $email.classList.remove('is-invalid');
                $email.classList.add('is-valid');
                $email.style.boxShadow= "none";
                $checkEmail.style.display= "inline-block";
                $emailErrors.innerHTML = "";
                validationsErrors = false;
                break
        }
    })

    //contraseña 
    $passFront.addEventListener('blur', function () {
        switch (true) {
            case !$passFront.value.trim():
                $passError.innerHTML = 'Debes completar el campo contraseña';
                $passFront.classList.add('is-invalid');
                $checkPass.style.display= "none"
                validationsErrors = true;
                break;
            default:
                $passFront.classList.remove('is-invalid');
                $passFront.classList.add('is-valid');
                $passFront.style.boxShadow= "none";
                $checkPass.style.display= "inline-block";
                $passError.innerHTML = "";
                validationsErrors = false
                break
        }
    })
    //para que el form no se envie incompleto.
/*     $form.addEventListener('submit', (event) => {
     
        
        let error = false;
        if(!error && !validationsErrors){
            $form.submit()
        }else{
            event.preventDefault();
            alert('tenes que completar los campos');
        }

    }) */

    $form.addEventListener('submit', function(event){
        event.preventDefault()
        let error = false;
        let elementsForm = this.elements;
        
        for (let index = 0; index < elementsForm.length - 1; index++){
            if(elementsForm[index].value == ''
            ){
            /*     elementsForm[index].style.borderColor = ('#dd2211'); */
                elementsForm[index].style.boxShadow= ("0px 0px 2px 3px rgba(227,3,3,0.60)");
                $login.innerHTML = "Los campos señalados son obligatorios";
                $login.classList.add('msg-error')
                error = true;
            }
        }

        if(!error && !validationsErrors){
            $form.submit()
        }
    })


})