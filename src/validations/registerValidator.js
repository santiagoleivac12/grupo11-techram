const {check, body } = require('express-validator');
const { users } = require('../data/usersDataBase.json')

module.exports = [
    check('firstName')
    .notEmpty()
    .withMessage('debe ingresar un nombre'),

    check('lastName')
    .notEmpty()
    .withMessage('El apellido es requerido'),

    check('email')
    .isEmail()
    .withMessage('debes ingresar un email válido'),

    body('email').custom(value =>{
        let user = users.filter(user =>{
            return user.email == value
        })
    }),

    check('passWord')
    .notEmpty()
    .withMessage('debes escribir tu contraseña')
    .isLength({
        min: 6,
        max: 12
    })
    .withMessage('La contraseña debe tener entre 6 y 8 caracteres')
,
    body('passWord').custom((value, {req})=> value !== req.body.passWord ? false : true)
    .withMessage('las contraseñas no coinciden'),

    check('terms')
    .isString('on')
    .withMessage('debes aceptar las bases y condiciones')
]