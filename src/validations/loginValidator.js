const{check,body}=require('express-validator')
const {users}= require('../data/usersDataBase')

module.exports= [
    check('email')
    .notEmpty()
    .withMessage('Debes ingresar un email').bail()
    .isEmail()
    .withMessage('Ingresa un email válido'),
    

    check('pass')
    .notEmpty()
    .withMessage('Escribe tu contraseña'),

    body('custom')
    .custom((value, {req}) => {
        let users = users.find(user=> user.email==req.body.email);

        if(users){
            if(user.pass=== req.body.pass){
                return true
            }else{
                return false
            }
        }else{
            return false
        }
    }).withMessage('Credenciales Inválidas')
]
