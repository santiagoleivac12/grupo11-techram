const { check, body } = require('express-validator');
const db= require('../data/models')
const Users= db.User;

module.exports = [
    check('firstName').isLength({min:2})
    .notEmpty()
    .withMessage('debe ingresar un nombre'),

    check('lastname').isLength({min:2})
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

    check('pass1')
    .notEmpty()
    .withMessage('debes escribir tu contraseña')
    .isLength({
        min: 8,
        max: 12
    })
    .withMessage('La contraseña debe tener entre 8 y 12 caracteres'),

    body('pass2').custom((value,{req})=> value !== req.body.pass1 ? false :true)
    .withMessage('Las contraseñas no coinciden')


]