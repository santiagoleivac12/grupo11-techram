const express = require('express');
const router = express.Router();

let controller = require('../controllers/productsController');

router.get('/', controller.detail)

module.exports = router