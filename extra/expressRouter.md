# EXPRESS ROUTER GUIDE

## Create routes folder, routes files and initialize

1. In backend folder, create folder called routes
2. In routes folder, create route file (e.g. productRoutes.js)
3. Add following code to initialize
```
import express from 'express';
const router = express.Router();

export default router
```

---

## Adding routes

### Add all products API route

#### Check asyncHandler.md
```
import asyncHander from '../middleware/asyncHandler.js;
import Product from '../models/productModel.js';

router.get('/', asyncHandler(async (req, res) => {
  <!-- passing empty object we will get all products -->
  const products = await Product.find({});
  res.json(products);
}));
```

### Add single product API route
```
router.get('/:id', asyncHandler(async (req, res) => {
  <!-- for single product, we use findById and pass params id -->
  const product = await Product.findById(req.params.id);

  if(product) res.json(product);

  <!-- 404 - Not Found -->
  res.status(404).json({ message: 'Product not found' })
}));
```

---

## Using routes

### Add following lines of code to server.js under first app.get
```
import productRoutes from './routes/productRoutes.js';

app.use('/api/products', productRoutes);
```
