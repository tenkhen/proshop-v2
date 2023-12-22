import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  private
const addOrderItems = asyncHandler(async (req, res) => {
  res.send('add order items');
});

// @desc    Get user order
// @route   GET /api/orders/myorders
// @access  private
const getMyOrder = asyncHandler(async (req, res) => {
  res.send('get my orders');
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  private/admin
const getOrderById = asyncHandler(async (req, res) => {
  res.send('get order by id');
});

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  res.send('update order to paid');
});

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  private/admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send('update order to delivered');
});

// @desc    Get all orders
// @route   PUT /api/orders
// @access  private/admin
const getOrders = asyncHandler(async (req, res) => {
  res.send('get all orders');
});

export {
  addOrderItems,
  getMyOrder,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};
