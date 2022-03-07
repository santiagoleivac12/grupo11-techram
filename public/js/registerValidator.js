let qs = function (elemento) {
    return document.querySelector(elemento)
}

window.addEventListener('load', () => {
    let $inputName = qs('#name'),
        $nameErrors = qs('#nameErrors'),
        $lastName = qs('#apellido'),
        $lastNameErrors = qs('#lastNameErrors'),
        $form = qs('#formRegister'),
        $email = qs('#inputEmail'),
        $emailErrors = qs('#emailErrors'),
        $password = qs('#password'),
        $passwordErrors = qs('#passwordErrors'),
        $file = qs('#user-img'),
        $fileErrors = qs('#fileErrors'),
        $submitErrors = qs('#submitErrors'),
        $checkName = qs("#input-name"),
        $checkLastName = qs("#input-lastName"),
        $checkEmail = qs("#input-email"),
        $checkPassword = qs("#input-pass"),
/*         $password2 = qs('#confirmarPassword'),
        $password2Errors = qs('#confirmarPasswordErrors'), */
/*         $emaillog = qs('#emailLog'),
        $emailErrorsLog = qs('#emailErrorsLog'),
        $passwordLog = qs('#password'),
        $passwordErrorsLog = qs('#passwordErrorsLog'), */
        regExAlpha = /^[a-zA-Z\sñáéíóúü ]*$/,
        regExEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
        regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;

    let validationsErrors = false;

    $inputName.addEventListener('blur', function () {
        switch (true) {
            case !$inputName.value.trim():
                $nameErrors.innerHTML = 'Debes colocar el nombre';
                $nameErrors.classList.add('msg-error');
                $checkName.style.display= "none"
                validationsErrors = true
                break;
            case $inputName.value.length < 2:
                $nameErrors.innerHTML = "Tiene que tener al menos 2 caracteres";
                $nameErrors.classList.add('msg-error');
                $checkName.style.display= "none"
                validationsErrors = true;
                break;
            case !regExAlpha.test($inputName.value):
                $nameErrors.innerHTML = 'Ingrese un nombre válido';
                $nameErrors.classList.add('msg-error');
                $checkName.style.display= "none"
                validationsErrors = true
                break;       
            default:
                /* $inputName.classList.add('is-valid'); */
                $inputName.style.boxShadow= "none";
                $checkName.style.display= "inline-block"
                $nameErrors.innerHTML = "";
                validationsErrors = false;
                break;
        }
    })
    $lastName.addEventListener('blur', function () {
        switch (true) {
            case !$lastName.value.trim():
                $lastNameErrors.innerHTML = 'Ingresa tu apellido'
                $lastNameErrors.classList.add('msg-error');
                $checkLastName.style.display= "none"
                validationsErrors = true
                break;
            case !regExAlpha.test($lastName.value):
                $lastNameErrors.innerHTML = 'Ingresa un apellido valido'
                $lastNameErrors.classList.add('msg-error');
                $checkLastName.style.display= "none"
                validationsErrors = true;
                break;
            default:
                /* $inputSurname.classList.add('is-valid'); */
                $lastName.style.boxShadow= "none";
                $checkLastName.style.display= "inline-block"
                $lastNameErrors.innerHTML = ''
                validationsErrors = false;
                break;
        }
    })
    $email.addEventListener('blur', function () {
        switch (true) {
            case !$email.value.trim():
                $emailErrors.innerHTML = 'Coloca tu email';
                $emailErrors.classList.add('msg-error')
                $checkEmail.style.display= "none"
                validationsErrors = true
                break;
            case !regExEmail.test($email.value):
                $emailErrors.innerHTML = 'Coloca un email valido';
                $emailErrors.classList.add('msg-error')
                $checkEmail.style.display= "none"
                validationsErrors = true
                break
            default:
                /* $email.classList.add('is-valid'); */
                $email.style.boxShadow= "none";
                $checkEmail.style.display= "inline-block"
                $emailErrors.innerHTML = ''
                validationsErrors = false
                break;
        }
    })

    $password.addEventListener('blur', function () {
        switch (true) {
            case !$password.value.trim():
                $passwordErrors.innerHTML = 'Coloca tu contraseña';
                $passwordErrors.classList.add('msg-error')
                $checkPassword.style.display= "none"
                validationsErrors = true
                break;
            case $password.value.length < 8 :
                $passwordErrors.innerHTML = 'Tu contraseña debe tener al menos 8 caracteres';
                $passwordErrors.classList.add('msg-error')
                $checkPassword.style.display= "none"
                validationsErrors = true
                break;
            default:
/*                 $password.classList.add('is-valid'); */
                $password.style.boxShadow= "none";
                $checkPassword.style.display= "inline-block"
                $passwordErrors.innerHTML = ''
                validationsErrors = false
                break;
        }
    })

    $form.addEventListener('submit', function(event){
        event.preventDefault()
        let error = false;
        let elementsForm = this.elements;
        
        for (let index = 0; index < elementsForm.length - 1; index++){
            if(elementsForm[index].value == ''
            && elementsForm[index].type !== 'file'
            ){
            /*     elementsForm[index].style.borderColor = ('#dd2211'); */
                elementsForm[index].style.boxShadow= ("0px 0px 2px 3px rgba(227,3,3,0.60)");
                $submitErrors.innerHTML = "Los campos señalados son obligatorios";
                $submitErrors.classList.add('msg-error')
                error = true;
            }
        }

        if(!error && !validationsErrors){
            $form.submit()
        }
    })

    $file.addEventListener('change', function fileValidation(){
        let filePath = $file.value;
        let allowedExtensions = /(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/;
        if(!allowedExtensions.exec(filePath)){
            $fileErrors.innerHTML = 'Carga un archivo de imagen valido';
            $fileErrors.classList.add('msg-error')
            $file.value = "";
/*             $imagePreview.innerHTML = ""; */
            return false;
        }else {
            if($file.files && $file.files[0]){
                let reader = new FileReader();
/*                 reader.onload = function (e) {
                    $imagePreview.innerHTML = `<img src="${e.target.result}" alt=""`;
                }; */
                reader.readAsDataURL($file.files[0]);
                $fileErrors.innerHTML = '';
                /* $file.classList.remove(''); */
            }
        }
    }) 

/*     $password2.addEventListener('blur', function () {
        switch (true) {
            case !$password2.value.trim():
                $password2Errors.innerHTML = 'Debes confirmar tu contraseña';
                $password2.classList.add('msg-error')
                break;
            case $password2.value != $password2.value:
                $password2Errors.innerHTML = 'Las contraseñas no concuerdan';
                $password2.classList.add('msg-error')
                break;
            default:
                $password2.classList.remove('msg-error');
                $password2.classList.add('is-valid');
                $password2Errors.innerHTML = ''
                break;
        }
    }) */

})
