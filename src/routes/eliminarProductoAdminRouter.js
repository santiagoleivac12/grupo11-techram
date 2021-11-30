const express = require('express');
const router = express.Router();

let controller = require('../controllers/adminController.js');

router.get('/', controller.eliminarArchivo);

module.exports = router;