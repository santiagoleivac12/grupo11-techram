 const express = require('express');
const router = express.Router();

let controller = require('../controllers/usersControllers');

router.get('/', controller.perfil2)

module.exports = router