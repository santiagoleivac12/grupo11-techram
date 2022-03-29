const {check} = require('express-validator')

module.exports = [
    check('name')
    .notEmpty()
    .withMessage('El campo nombre es obligatorio').bail()
    .isLength({min:5})
    .withMessage('Tiene que tener al menos 5 caracteres')
    /* .isAlphanumeric('Ingresa un nombre valido') */,

    check('category')
    .notEmpty()
    .withMessage('Tienes que elegir una categoría'),

    check('subcategory')
    .notEmpty()
    .withMessage('Tienes que elegir una subcategoría'),

    check('price')
    .notEmpty()
    .withMessage('Tienes que ingresar un precio').bail()
    .isNumeric()
    .withMessage('Debes ingresar sólo números'),

    check('discount')
    .isNumeric()
    .withMessage('Debes ingresar sólo números'),

    check('stock')
    .notEmpty()
    .withMessage('Tienes que ingresar la cantidad').bail()
    .isNumeric()
    .withMessage('Debes ingresar sólo números'),

    check('description')
    .notEmpty()
    .withMessage('Tienes que ingresar una descripción').bail()
    .isLength({min:20})
    .withMessage('Tiene que tener al menos 20 caracteres'),

    check('marca')
    .notEmpty()
    .withMessage('Tienes que ingresar la marca')
]