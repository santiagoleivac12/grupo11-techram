let express = require('express');
let router = express.Router();
let userCheck = require('../middlewares/userCheck');

let controller = require('../controllers/productsController');

//detalle
router.get('/detail/:id/', controller.detail);

//carrito
router.get('/carrito', controller.carrito);

module.exports = router;