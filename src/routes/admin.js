const express = require('express');
const router = express.Router();

let controller = require('../controllers/adminController');

//Index admin
router.get('/', controller.admin)

//Crear archivo
router.get('/create', controller.crearArchivo);

router.post('/', controller.store);

//Eliminar archivo
router.get('/update', controller.eliminarArchivo);

//



module.exports = router;