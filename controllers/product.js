const Product = require('../models/product');

exports.product_list = async function(req, res) {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    res.status(500).json({
      error: 'Failed to retrieve products'
    });
  }
};
// Get one product
exports.product_detail = function(req, res) {
  res.send('NOT IMPLEMENTED: Product detail: ' + req.params.id);
};

// Create product
exports.product_create_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Product create POST');
};

// Delete product
exports.product_delete = function(req, res) {
  res.send('NOT IMPLEMENTED: Product delete: ' + req.params.id);
};

// Update product
exports.product_update_put = function(req, res) {
  res.send('NOT IMPLEMENTED: Product update: ' + req.params.id);
};

exports.product_view_all = async function(req, res) {
  try {
    const products = await Product.find({});
    res.render('products', {
      title: 'All Products',
      products: products
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading products');
  }
};

exports.product_create_get = function(req, res) {
  res.render('product_create', {
    title: 'Create Product'
  });
};

exports.product_create_post = async function(req, res) {
  try {
    const product = new Product({
      name: req.body.name,
      category: req.body.category,
      price: Number(req.body.price)
    });

    await product.save();
    res.redirect('/resource/view/all');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating product');
  }
};