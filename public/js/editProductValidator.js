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
    $description = qs("#descripcion-admin"),
    $descriptionErrors = qs("#descriptionErrors"),
    $marca = qs("#marca-admin"),
    $marcaErrors = qs("#marcaErrors"),
    $checkName = qs("#input-name"),
    $checkPrice = qs("#input-price"),
    $checkDiscount = qs("#input-discount"),
    $checkStock = qs("#input-stock"),
    $checkMarca = qs("#input-marca"),
    $form = qs("#formEdit"),
    $submitErrors = qs("#submitErrors"),
    $file = qs("#fileEdit"),
    $fileErrors = qs("#fileErrors"),
    $imagePreview = qs("#img-preview")
    regExAlpha = /^[0-9a-zA-Z]+$/,
    regExNumber = /^[0-9]+$/;

    let validationsErrors = false

    $name.addEventListener('blur', () => {
        switch(true) {
            case !$name.value.trim():
                $nameErrors.innerHTML = "El campo nombre es obligatorio";
                $nameErrors.classList.add('msg-error')
                $checkName.style.display= "none"
                validationsErrors = true;
                break;
            case $name.value.length < 5:
                $nameErrors.innerHTML = "Tiene que tener al menos 5 caracteres";
                $nameErrors.classList.add('msg-error')
                $checkName.style.display= "none"
                validationsErrors = true;
                break;
/*             case !regExAlpha.test($name.value):
                $nameErrors.innerHTML = "Ingrese un nombre valido";
                $nameErrors.classList.add('msg-error')
                $checkName.style.display= "none"
                 validationsErrors = true;
                 break; */
            default: 
                $name.classList.remove('msg-error')
                $price.style.boxShadow= "none";
                $checkName.style.display= "inline-block"
                $nameErrors.innerHTML = "";
                validationsErrors = false;
                break;        
        }
    })

    $price.addEventListener('blur', () => {
        switch(true) {
            case !$price.value.trim():
                $priceErrors.innerHTML = "Tienes que ingresar un precio";
                $priceErrors.classList.add('msg-error')
                $checkPrice.style.display= "none" 
                validationsErrors = true;
                break;
            case !regExNumber.test($price.value):
                $priceErrors.innerHTML = "Debes ingresar sólo números";
                $priceErrors.classList.add('msg-error')
                $checkPrice.style.display= "none"
                validationsErrors = true;
                break;
            default:
                $price.classList.remove('msg-error')
                $price.style.boxShadow= "none";
                $checkPrice.style.display= "inline-block"
                $priceErrors.innerHTML = "";
                validationsErrors = false;
                break;
        }
    })

    $discount.addEventListener('blur', () => {
        switch(true) {
            case regExNumber.test($discount.value):
                $discountErrors.innerHTML = "Debes ingresar sólo números";
                $discountErrors.classList.add('msg-error') 
                $checkDiscount.style.display= "none"
                validationsErrors = true;
            default:
                $discount.classList.remove('msg-error')
                $discount.style.boxShadow= "none";
                $checkDiscount.style.display= "inline-block"
                 $discountErrors.innerHTML = "";
                 validationsErrors = false;
                 break;
        }
    })

    $stock.addEventListener('blur', () => {
        switch(true) {
            case !$stock.value.trim():
                $stockErrors.innerHTML = "Tienes que ingresar la cantidad";
                $stockErrors.classList.add('msg-error')
                $checkStock.style.display= "none" 
                validationsErrors = true;
                break;
            case !regExNumber.test($stock.value):
                $stockErrors.innerHTML = "Debes ingresar sólo números";
                $stockErrors.classList.add('msg-error')
                $checkStock.style.display= "none" 
                validationsErrors = true;
                break;
            default:
                $stock.classList.remove('msg-error')
                $stock.style.boxShadow= "none";
                $checkStock.style.display= "inline-block"
                $stockErrors.innerHTML = "";
                validationsErrors = false;
                break;
        }
    })

    $description.addEventListener('blur', () =>{
        switch(true) {
            case !$description.value.trim():
                $descriptionErrors.innerHTML = "Tienes que ingresar una descripción";
                $descriptionErrors.classList.add('msg-error')
                validationsErrors = true;
                break;
            case $description.value.length < 20:
                $descriptionErrors.innerHTML = "Tiene que tener al menos 20 caracteres";
                $descriptionErrors.classList.add('msg-error')
                validationsErrors = true;
                break;
            default:
                $description.classList.remove('msg-error')
                $description.style.boxShadow= "none";
                $descriptionErrors.innerHTML = "";
                validationsErrors = false;
                break;
        }
    })

    $marca.addEventListener('blur', () => {
        if($marca.value == ""){
            $marcaErrors.innerHTML = "Tienes que ingresar la marca";
            $marcaErrors.classList.add('msg-error') 
            validationsErrors = true;
        }else{
            $marca.classList.remove('msg-error')
            $marca.style.boxShadow= "none";
            $marcaErrors.innerHTML = "";
            validationsErrors = false;
        }
    })


    $category.addEventListener('blur', () => {
        if($category.value == ""){
            $categoryErrors.innerHTML = "Tienes que elegir una categoría";
            $categoryErrors.classList.add('msg-error') 
            validationsErrors = true;
        }else{
            $category.classList.remove('msg-error')
            $category.style.boxShadow= "none";
            $categoryErrors.innerHTML = "";
            validationsErrors = false;
        }
    })

    $subcategory.addEventListener('blur', () => {
        if($subcategory.value == ""){
            $subcategoryErrors.innerHTML = "Tienes que elegir una subcategoría";
            $subcategoryErrors.classList.add('msg-error')
            validationsErrors = true;
        }else{
            $subcategory.classList.remove('msg-error')
            $subcategory.style.boxShadow= "none";
            $subcategoryErrors.innerHTML = "";
            validationsErrors = false;
        }
    })

    
    $form.addEventListener('submit', function(event){
        event.preventDefault()
        let error = false;
        let elementsForm = this.elements;
        
        for (let index = 0; index < elementsForm.length - 1; index++){
            if(elementsForm[index].value == ''
            && elementsForm[index].type !== 'file'
            && elementsForm[index].name !== 'discount'
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
            $file.value = "";
            $imagePreview.innerHTML = "";
            return false;
        }else {
            switch (true) {
                case !allowedExtensions.exec(this.value):
                    $fileErrors.innerHTML = "Solo imágenes con extensión jpg, jpeg, png, gif, webp"
                    this.classList.add('is-invalid')
                    $imagePreview.innerHTML = null;
                    break;
                case this.value == "":
                    $fileErrors.innerHTML = "Tiene que subir una imagen"
                    this.classList.add('is-invalid');
                    $imagePreview.innerHTML = null;
                    break
                case this.files.length > 3:
                    $fileErrors.innerHTML = "Solo se permiten 3 imágenes"
                    this.classList.add('is-invalid');
                    $imagePreview.innerHTML = null;
                    break
                default:
                    this.classList.remove('is-invalid');
                    this.classList.add('is-valid');
                    $imagePreview.classList.add('.test');
                    $fileErrors.innerHTML = null;
                    if (this.files) {
                        [].forEach.call(this.files, readAndPreview);
                    }
        
                    function readAndPreview(file) {
        
                        var reader = new FileReader();
                        $imagePreview.innerHTML = null;
                        reader.addEventListener("load", function () {
                            var image = new Image();
                            image.title = file.name;
                            image.src = this.result;
                            $imagePreview.appendChild(image);
                        });
                        reader.readAsDataURL(file);
        
                    }
                    break;
            }
        }
    }) 

})