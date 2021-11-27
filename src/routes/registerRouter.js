 const express = require('express');
const router = express.Router();

let controller = require('../controllers/usersControllers');

router.get('/', controller.register3)

module.exports = router