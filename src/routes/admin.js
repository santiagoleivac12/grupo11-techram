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


/* GET - Show product edit form */
router.get('/product/edit/:id', controller.edit);
/* PUT - Update a product */
router.put('/product/edit/:id', controller.update);

/* DELETE - Delete one product */
router.delete('/product/delete/:id', controller.destroy)



module.exports = router;