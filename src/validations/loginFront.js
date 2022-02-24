window.onload = () => {

    let $form = document.querySelector('#form');
    let $emailFront = document.querySelector('#emailFront');
    let $passFront = document.querySelector('#passFront');

    //exprecion regular para email 
    /* let regEx = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/ */
    
    
    //que el campo email no este vacio
    $emailFront.addEventListener('blur', (event) => {
        let value =event.target.value;
        if (value.length == 0) {
            let mensajeError = 'Debe ingresar un email'
            error.emailFrontError = mensajeError
            emailError.innerHTML = mensajeError //cuando hace click en el campo ,sale y no lo completa se muestra el msg de error
        }else{
            emailError.innerHTML = ""
        }
    })
    //contraseña 
    $passFront.addEventListener('blur', (event) => {
        let value =event.target.value;
        if (value.length == 0) {
            let mensajeError = 'Debe ingresar una contraceña'
            error.passFrontError = mensajeError
            passError.innerHTML = mensajeError 
        }else{
            passError.innerHTML = ""
        }
    })

    //para que el form no se envie incompleto.
    $form.addEventListener('submit', (event) => {
        event.preventDefault()
        alert('tenes que completar los campos')
    })

}