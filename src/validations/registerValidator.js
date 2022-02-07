const { check, body } = require('express-validator');
const db= require('../data/models')
const Users= db.User;

module.exports = [
    check('firstName')
    .notEmpty()
    .withMessage('debe ingresar un nombre'),

    check('lastname')
    .notEmpty()
    .withMessage('El apellido es requerido'),

    check('email')
    .isEmail()
    .withMessage('debes ingresar un email válido'),

    body('email').custom((value) => {
     return  Users.findOne({
          where:{
              email: value,
          }
      })
      .then((user)=>{
           if(user){
            return Promise.reject('Email ya registrado')
        }
      })

    }),

    check('pass')
    .notEmpty()
    .withMessage('debes escribir tu contraseña')
    .isLength({
        min: 6,
        max: 12
    })
    .withMessage('La contraseña debe tener entre 6 y 12 caracteres')

/* 
    check('terms')
    .isString('on')
    .withMessage('debes aceptar las bases y condiciones') */
]