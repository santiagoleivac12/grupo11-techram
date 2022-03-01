function qs(e) {
    return document.querySelector(e)
}

window.addEventListener('load', () => {
    let $name = qs("#name-admin"),
    $nameErrors = qs("#nameErrors"),
    $price = qs("#price-admin"),
    $priceErrors = qs("#priceErrors"),
    $discount = qs("#discount-admin"),
    $discountErrors = qs("#discountErrors"),
    $stock = qs("#stock-admin"),
    $stockErrors = qs("#stockErrors"),
    $category = qs("#categoria-admin"),
    $categoryErrors = qs("#categoryErrors"),
    $subcategory = qs("#subcategoria-admin"),
    $subcategoryErrors = qs("#subcategoryErrors"),
    $form = qs("#formCreate"),
    $file = qs("#fileCreate"),
    $fileErrors = qs("#")
    regExAlpha = /^[0-9a-zA-Z]+$/;
    regExNumber = /^[0-9]+$/;

    let validationsErrors = false

    $name.addEventListener('blur', () => {
        switch(true) {
            case !$name.value.trim():
                $nameErrors.innerHTML = "El campo nombre esta vacio";
                /* $name.classList.add('') hacer clase con estilos*/
                validationsErrors = true;
                break;
            case !$name.value < 4:
                $nameErrors.innerHTML = "Tiene que tener al menos 5 caracteres";
                /* $name.classList.add('') hacer clase con estilos*/
                validationsErrors = true;
                break;
            case !regExAlpha.test($name.value):
                $nameErrors.innerHTML = "Ingrese un nombre valido";
                /* $name.classList.add('') hacer clase con estilos*/
                 validationsErrors = true;
                 break;
            default: 
                /* $name.classList.remove('') */
                /* $name.classList.add('') clase para mostrar que esta bien lo que escribio*/
                $nameErrors.innerHTML = "";
                validationsErrors = false;
                break;        
        }
    })

    $price.addEventListener('blur', () => {
        switch(true) {
            case !$price.value.trim():
                $priceErrors.innerHTML = "El campo precio esta vacio";
                /* $price.classList.add('') hacer clase con estilos*/
                validationsErrors = true;
                break;
            case !regExNumber.test($price.value):
                $nameErrors.innerHTML = "Ingrese solo números";
                /* $price.classList.add('') hacer clase con estilos*/
                validationsErrors = true;
                break;
            default:
                /* $price.classList.remove('') */
                /* $price.classList.add('') clase para mostrar que esta bien lo que escribio*/
                $priceErrors.innerHTML = "";
                validationsErrors = false;
                break;
        }
    })

    $discount.addEventListener('blur', () => {
        switch(true) {
            case !regExNumber.test($stock.value):
                $stockErrors.innerHTML = "Ingrese solo números";
                /* $discount.classList.add('') hacer clase con estilos*/
                validationsErrors = true;
            default:
                /* $discount.classList.remove('') */
                 /* $discount.classList.add('') clase para mostrar que esta bien lo que escribio*/
                 $discountErrors.innerHTML = "";
                 validationsErrors = false;
                 break;
        }
    })

    $stock.addEventListener('blur', () => {
        switch(true) {
            case !$stock.value.trim():
                $stockErrors.innerHTML = "El campo de stock esta vacio";
                /* $stock.classList.add('') hacer clase con estilos*/
                validationsErrors = true;
                break;
            case !regExNumber.test($stock.value):
                $stockErrors.innerHTML = "Ingrese solo números";
                /* $stock.classList.add('') hacer clase con estilos*/
                validationsErrors = true;
                break;
            default:
                /* $stock.classList.remove('') */
                /* $stock.classList.add('') clase para mostrar que esta bien lo que escribio*/
                $stockErrors.innerHTML = "";
                validationsErrors = false;
                break;
        }
    })

    
    $form.addEventListener('submit', (event) => {
        event.preventDeFault();

        let error = false;
        let elementsForm = this.elements;
        
        for (let index = 0; index < elementsForm.length - 1; index++){
            if(elementsForm[index].value == ''
            && elementsForm[index].type !== "file"
            && elementsForm[index].name !== "discount"
            ){
                /* elementsForm[index].classList.add('') */
                submitErrors.innerHTML = "Los campos señalados son obligatorios";
                error = true;
            }
        }

        if(!error && !validationsErrors){
            $form.submit()
        }
    })

/*     $file.addEventListener('change', function fileValidation(){
        let filePath = $file.value;
        let allowedExtensions = /(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/;
        if(!allowedExtensions.exec(filePath)){
            $fileErrors.innerHTML = 'Carga un archivo de imagen valido, con la extensión jpg, jpeg, png, gif';
            $file.value = "";
            return false;
        }else {
            if($file.files && $file.files[0]){
                let reader = new FileReader();
                reader.onload = function (e) {
                    $imagePreview.innerHTML = `<img src="${e.target.result}" alt=""`;
                };
                reader.readAsDataURL($file.files[0]);
                $fileErrors.innerHTML = '';
                $file.classList.remove('');
            }
        }
    }) */

})