let express = require('express');
let router = express.Router();


//Index
let controller = require('../controllers/indexController')

router.get('/', controller.index);

module.exports = router;