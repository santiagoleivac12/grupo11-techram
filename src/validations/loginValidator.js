const{check,body}=require('express-validator')
const {users}= require('../data/dataBase')
const bcrypt = require('bcryptjs')

module.exports= [
    check('email')
    .notEmpty()
    .withMessage('Debes ingresar un email').bail()
    .isEmail()
    .withMessage('Ingresa un email válido'),
    

    check('password')
    .notEmpty()
    .withMessage('Escribe tu contraseña'),

    body('password')
    .custom((value, {req}) => {
        let user = users.find(user=> user.email == req.body.email);

        if(user){
            if(bcrypt.compareSync(req.body.password, user.password)){
                return true
            }else{
                return false
            }
        }else{
            return false
        }
    }).withMessage('Credenciales Inválidas')
]
