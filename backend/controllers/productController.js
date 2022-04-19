import Product from '../models/Product.js';

// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = async (req, res) => {
  const products = await Product.find({});

  res.status(200).json(products);
};

// @desc Fetch single product
// @route GET /api/products/:id
// @access Public
const getSingleProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product was not found!');
  }

  res.status(200).json(product);
};

export { getProducts, getSingleProduct };
