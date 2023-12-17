# CONTROLLER GUIDE - Functions for routes

### Create a folder called controllers in backend, create a controller file (e.g. productController.js)

### Add following code in it (just for example)

#### Check asyncHandler.md
```
import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  public
const getProducts = asyncHandler(async(req, res) => {
  <!-- passing empty object we will get all products -->
  const products = await Product.find({});
  res.json(products);
})

// @desc    Fetch a single product
// @route   GET /api/products/:id
// @access  public
const getProductById = asyncHandler(async(req, res) => {
  <!-- for single product, we use findById and pass id we get from params -->
  const product = await Product.findById(res.params.id)

  if(product) {
    res.json(product);
  } else {
    <!-- 404 - Not Found -->
    res.status(404);
    <!-- we are handling this error. Check errorMiddleware.md -->
    throw new Error('Resource not found');
  }
})
```