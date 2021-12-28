const{check}=require('express-validator')

module.exports= [
    check('email')
    .notEmpty()
    .withMessage('Debes ingresar un email').bail()
    .isEmail()
    .withMessage('Ingresa un email válido'),

    check('password')
    .notEmpty()
    .withMessage('Escribe tu contraseña')
]
