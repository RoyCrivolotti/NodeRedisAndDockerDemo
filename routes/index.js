const express = require('express');

const router = express.Router();

const controller = require('../controllers/mainController');


router.get('/', controller.getProducts);
router.get('/getProduct', controller.getProduct);
router.post('/createProduct', controller.createProduct);
router.post('/updateProduct', controller.updateProduct);
router.post('/deleteProduct', controller.deleteProduct);

module.exports = router;
