const {check} = require('express-validator')

module.exports = [
    check('name')
    .notEmpty().withMessage('El campo nombre el obligatorio').bail()
    .isLength({min:4}).withMessage('El nombre tiene que tener entre al menos 4 caracteres')
    .isAlphanumeric('Ingresa un nombre valido'),

    check('category')
    .notEmpty
    .withMessage('Tienes que elegir una categoría'),

    check('subcategory')
    .notEmpty
    .withMessage('Tienes que elegir una subcategoría'),

    check('price')
    .notEmpty
    .withMessage('Tienes que ingresar un precio').bail()
    .isNumeric()
    .withMessage('Debes ingresar sólo números'),

    check('discount')
    .isNumeric()
    .withMessage('Debes ingresar sólo números'),
]