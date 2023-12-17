import express from 'express';

import {
  getProducts,
  getProductById,
} from '../controllers/productController.js';

const router = express.Router();

// no need to add whole url like /api/products, because we will add this url to server.js
router.route('/').get(getProducts);

router.route('/:id').get(getProductById);

export default router;
