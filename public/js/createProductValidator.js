function qs(element) {
    return document.querySelector(element)
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
    $checkName = qs("#input-name"),
    $checkPrice = qs("#input-price"),
    $checkDiscount = qs("#input-discount"),
    $checkStock = qs("#input-stock"),
    $form = qs("#formCreate"),
    $submitErrors = qs("#submitErrors"),
/*     $file = qs("#fileCreate"),
    $fileErrors = qs("#fileErrors"), */
    regExAlpha = /^[0-9a-zA-Z]+$/,
    regExNumber = /^[0-9]+$/;

    let validationsErrors = false

    $name.addEventListener('blur', () => {
        switch(true) {
            case !$name.value.trim():
                $nameErrors.innerHTML = "El campo nombre esta vacio";
                $nameErrors.classList.add('msg-error')
                validationsErrors = true;
                break;
            case $name.value.length < 5:
                $nameErrors.innerHTML = "Tiene que tener al menos 5 caracteres";
                $nameErrors.classList.add('msg-error')
                validationsErrors = true;
                break;
            case !regExAlpha.test($name.value):
                $nameErrors.innerHTML = "Ingrese un nombre valido";
                $nameErrors.classList.add('msg-error')
                 validationsErrors = true;
                 break;
            default: 
                $name.classList.remove('msg-error')
                $checkName.style.display= "inline-block"
                $nameErrors.innerHTML = "";
                validationsErrors = false;
                break;
        }
    })

    $price.addEventListener('blur', () => {
        switch(true) {
            case !$price.value.trim():
                $priceErrors.innerHTML = "El campo precio esta vacio";
                $priceErrors.classList.add('msg-error') 
                validationsErrors = true;
                break;
            case !regExNumber.test($price.value):
                $priceErrors.innerHTML = "Ingrese solo números";
                $priceErrors.classList.add('msg-error')
                validationsErrors = true;
                break;
            default:
                $price.classList.remove('msg-error')
                $checkPrice.style.display= "inline-block"
                $priceErrors.innerHTML = "";
                validationsErrors = false;
                break;
        }
    })

    $discount.addEventListener('blur', () => {
        switch(true) {
            case regExNumber.test($discount.value):
                $discountErrors.innerHTML = "Ingrese solo números";
                $discountErrors.classList.add('msg-error') 
                validationsErrors = true;
            default:
                $discount.classList.remove('msg-error')
                $checkDiscount.style.display= "inline-block"
                 $discountErrors.innerHTML = "";
                 validationsErrors = false;
                 break;
        }
    })

    $stock.addEventListener('blur', () => {
        switch(true) {
            case !$stock.value.trim():
                $stockErrors.innerHTML = "El campo de stock esta vacio";
                $stockErrors.classList.add('msg-error') 
                validationsErrors = true;
                break;
            case !regExNumber.test($stock.value):
                $stockErrors.innerHTML = "Ingrese solo números";
                $stockErrors.classList.add('msg-error') 
                validationsErrors = true;
                break;
            default:
                $stock.classList.remove('msg-error')
                $checkStock.style.display= "inline-block"
                $stockErrors.innerHTML = "";
                validationsErrors = false;
                break;
        }
    })

    $category.addEventListener('blur', () => {
        if($category.value == ""){
            $categoryErrors.innerHTML = "Debe elegir una categoría";
            $categoryErrors.classList.add('msg-error') 
            validationsErrors = true;
        }else{
            $subcategory.classList.remove('msg-error')
            $subcategoryErrors.innerHTML = "";
            validationsErrors = false;
        }
    })

    $subcategory.addEventListener('blur', () => {
        if($subcategory.value == ""){
            $subcategoryErrors.innerHTML = "Debe elegir una subcategoría";
            $subcategoryErrors.classList.add('msg-error')
            validationsErrors = true;
        }else{
            $subcategory.classList.remove('msg-error')
            $subcategoryErrors.innerHTML = "";
            validationsErrors = false;
        }
    })

    
    $form.addEventListener('submit', (event) =>{
        event.preventDefault()
        /* console.log(this.Element) */
        let error = false;
        let elementsForm = this.elements;
        
        for (let index = 0; index < elementsForm.length - 1; index++){
            if(elementsForm[index].value == ''
            && elementsForm[index].type !== 'file'
            && elementsForm[index].name !== 'discount'
            ){
                elementsForm[index].classList.add('msg-error');
                $submitErrors.innerHTML = "Los campos señalados son obligatorios";
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