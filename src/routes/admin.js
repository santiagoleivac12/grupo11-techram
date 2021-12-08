const express = require('express');
const router = express.Router();

let controller = require('../controllers/adminController');
//Crear archivo
router.get('/create', controller.crearArchivo);

//Eliminar archivo
router.get('/update', controller.eliminarArchivo);

module.exports = router;