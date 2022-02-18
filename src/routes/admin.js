const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadProductFiles')
let controller = require('../controllers/adminController');

let userAdmin = require('../middlewares/userAdmin');
/* const rolUser = require('../middlewares/rolUser'); */

//Index admin
router.get('/',userAdmin, controller.admin) // el usuario no puede 

//Crear archivo
router.get('/create',userAdmin, controller.create);//  el usuario tampoco puede acceder a la creacion de productos
router.post('/', upload.single('producto-img'), controller.store);


/* GET - Show product edit form */
router.get('/:id/edit',userAdmin, controller.edit);// a la edicion de los producctos 


/* PUT - Update a product */
router.put('/:id/edit',upload.single('producto-img'),controller.update);

/* DELETE - Delete one product */
router.delete('/:id',controller.destroy)



module.exports = router;