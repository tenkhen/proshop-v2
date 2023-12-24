import express from 'express';

import {
  getProducts,
  getProductById,
  createProduct,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// no need to add whole url like /api/products, because we will add this url to server.js
router.route('/').get(getProducts).post(protect, admin, createProduct);

router.route('/:id').get(getProductById);

export default router;
