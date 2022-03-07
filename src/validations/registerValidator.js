const { check, body } = require('express-validator');
const db= require('../data/models')
const Users= db.User;

module.exports = [
    check('firstName')/* .isLength({min:2}) */
    .notEmpty()
    .withMessage('Debe ingresar un nombre').bail()
    .isLength({min:2})
    .withMessage('El nombre tiene que tener entre al menos 2 caracteres'),

    check('lastname')/* .isLength({min:2}) */
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
        min: 8
    })
    .withMessage('La contraseña debe tener 8'),


/*     body('pass2').custom((value,{req})=> value !== req.body.pass1 ? false :true)
    .withMessage('Las contraseñas no coinciden') */


]