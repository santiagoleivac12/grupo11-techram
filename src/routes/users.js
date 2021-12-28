const express = require('express');
const router = express.Router();
let loginValidator= require('../validations/loginValidator')

let controller = require('../controllers/usersControllers');
//login
router.get('/login', controller.login1);
//login-post-data
router.post('/login',loginValidator, controller.processLogin);

//perfil
router.get('/perfil', controller.perfil2);

//register
router.get('/register', controller.register3)

module.exports = router