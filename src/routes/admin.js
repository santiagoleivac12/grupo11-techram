const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadProductFiles')
let controller = require('../controllers/adminController');

let userAdmin = require('../middlewares/userAdmin');
/* const rolUser = require('../middlewares/rolUser'); */

//Index admin
router.get('/',userAdmin, controller.admin)

//Crear archivo
router.get('/create',userAdmin, controller.create);
router.post('/', upload.array('producto-img'), controller.store);


/* GET - Show product edit form */
router.get('/:id/edit',userAdmin, controller.edit); 


/* PUT - Update a product */
router.put('/:id/edit',upload.array('producto-img'),controller.update);

/* DELETE - Delete one product */
router.delete('/:id',controller.destroy)



module.exports = router;