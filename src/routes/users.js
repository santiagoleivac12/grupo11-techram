const express = require('express');
const router = express.Router();
let loginValidator = require('../validations/loginValidator');
const upload = require('../middlewares/uploadProductFiles')

let controller = require('../controllers/usersControllers');
//login
router.get('/login', controller.login1);
//login-post-data
router.post('/login',loginValidator, controller.processLogin);

//register
router.get('/register', controller.register3);
router.post('/register', upload.single(any), controller.processRegister);

//perfil
router.get('/perfil', controller.perfil2);

// get logout
router.get('/logout', controller.logout);

module.exports = router