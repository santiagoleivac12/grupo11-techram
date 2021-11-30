const express = require('express');
const router = express.Router();

let controller = require('../controllers/adminController.js');

router.get('/', controller.crearArchivo);

module.exports = router;