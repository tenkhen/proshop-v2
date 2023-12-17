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

#### Check controller.md
```
import { getProducts, getProductById } from '../controllers/productController.js'

router.route('/').get(getProducts);
```

### Add single product API route
```
router.route('/:id').get(getProductById);
```

---

## Using routes

### Add following lines of code to server.js under first app.get
```
import productRoutes from './routes/productRoutes.js';

app.use('/api/products', productRoutes);
```
