let express = require('express');
let router = express.Router();
let userCheck = require('../middlewares/userCheck');

let controller = require('../controllers/productsController');

//detalle
router.get('/detail/:id/', controller.detail);

//carrito
router.get('/carrito', controller.carrito);

//categorias
router.get('/categories',controller.Categories);

//buscador
router.get('/search', controller.search)

module.exports = router;