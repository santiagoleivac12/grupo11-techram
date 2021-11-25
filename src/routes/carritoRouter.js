const express = require('express');
const router = express.Router();

let controller = require('../controllers/productsController')

router.get('/', controller.carrito);

module.exports = router;