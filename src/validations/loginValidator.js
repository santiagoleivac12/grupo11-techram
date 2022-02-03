const{check,body}=require('express-validator')
const bcrypt = require('bcryptjs')
const db= require('../date/models')
const Users= db.User

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
        return Users.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(user => {
            if(!bcrypt.compareSync(req.body.pass, user.dataValues.pass)){
                return Promise.reject()
            }
        })
        .catch(() => {
            return Promise.reject("Email o contraseña incorrecta")
        })
          
    })
]
