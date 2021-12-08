const express = require('express');
const router = express.Router();

let controller = require('../controllers/usersControllers');
//login
router.get('/login', controller.login1);

//perfil
router.get('/perfil', controller.perfil2);

//register
router.get('/register', controller.register3)

module.exports = router