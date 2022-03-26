const express = require('express');
const router = express.Router();
let loginValidator = require('../validations/loginValidator');
let registerValidator = require('../validations/registerValidator')
const upload = require('../middlewares/uploadUserFiles')

let userCheck = require('../middlewares/userCheck');

let controller = require('../controllers/usersControllers');
/* let rolUser = require('../middlewares/rolUser'); */
//login
router.get('/login', controller.login1);
//login-post-data
router.post('/login',loginValidator, controller.processLogin);

//register
router.get('/register', controller.register3);
router.post('/register', upload.single('user-img'), registerValidator , controller.processRegister);

//perfil
router.get('/perfil', userCheck,controller.perfil2);

//editar perfil
router.get('/perfilEdit/:id', userCheck,controller.perfilEdit);

// get logout
router.get('/logout', controller.logout);




//rutas accecibles para todos = sin cambios
//rutas accesibles solo sin login = redirigen al perfil
// requiere estar logueado = redirecciona al login 
module.exports = router