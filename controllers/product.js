
const Product = require('../models/product');

// Get all products
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

// Get one product - Part 1
exports.product_detail = async function(req, res) {
  try {
    const result = await Product.findById(req.params.id);

    if (!result) {
      return res.status(404).json({
        error: 'Product not found'
      });
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({
      error: 'Error finding product'
    });
  }
};

// Create product
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

// Delete product - Part 3 (not required yet)
exports.product_delete = function(req, res) {
  res.send('NOT IMPLEMENTED: Product delete: ' + req.params.id);
};

// Update product - Part 2
exports.product_update_put = async function(req, res) {
  try {
    const toUpdate = await Product.findById(req.params.id);

    if (!toUpdate) {
      return res.status(404).json({
        error: 'Product not found'
      });
    }

    if (req.body.name !== undefined)
      toUpdate.name = req.body.name;

    if (req.body.category !== undefined)
      toUpdate.category = req.body.category;

    if (req.body.price !== undefined)
      toUpdate.price = Number(req.body.price);

    const result = await toUpdate.save();

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: 'Error updating product'
    });
  }
};

// View all products page
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

// Show create product page
exports.product_create_get = function(req, res) {
  res.render('product_create', {
    title: 'Create Product'
  });
};
