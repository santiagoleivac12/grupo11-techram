const express = require('express');
const router = express.Router();

let controller = require('../controllers/usersControllers');
router.get('/', controller.login1)

module.exports = router