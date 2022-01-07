const{check,body}=require('express-validator')
const {users}= require('../data/dataBase')

module.exports= [
    check('email')
    .notEmpty()
    .withMessage('Debes ingresar un email').bail()
    .isEmail()
    .withMessage('Ingresa un email válido'),
    

    check('password')
    .notEmpty()
    .withMessage('Escribe tu contraseña'),

    body('custom')
    .custom((value, {req}) => {
        let user = users.find(user=> user.email === req.body.email);

        if(user){
            if(user.password === req.body.password){
                return true
            }else{
                return false
            }
        }else{
            return false
        }
    }).withMessage('Credenciales Inválidas')
]
