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
//router.get('/update', controller.eliminarArchivo);


/* GET - Show product edit form */
router.get('/:id/edit', controller.edit);


/* PUT - Update a product */
router.put('/:id',/* upload.single('producto-img') */controller.update);

/* DELETE - Delete one product */
router.delete('/:id',controller.destroy)



module.exports = router;