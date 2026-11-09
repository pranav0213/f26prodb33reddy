const express = require('express');
const router = express.Router();

const apiController = require('../controllers/api');
const productController = require('../controllers/product');

// API information
router.get('/', apiController.api);

// Display all products
router.get('/view/all', productController.product_view_all);

// Create product form
router.get('/products/create', productController.product_create_get);

// Create product
router.post('/products/create', productController.product_create_post);
router.post('/products', productController.product_create_post);

// Product operations
router.get('/products', productController.product_list);
router.get('/products/:id', productController.product_detail);
router.put('/products/:id', productController.product_update_put);
router.delete('/products/:id', productController.product_delete);

module.exports = router;