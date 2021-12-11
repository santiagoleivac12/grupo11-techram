const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadProductFiles')

let controller = require('../controllers/adminController');

//Index admin
router.get('/', controller.admin)

//Crear archivo
router.get('/create', controller.create);
router.post('/', upload.single('producto-img'), controller.store);

//Eliminar archivo
router.get('/update', controller.eliminarArchivo);

//



module.exports = router;