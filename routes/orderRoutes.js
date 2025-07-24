const express = require("express");
const {
    placeOrder,
    getOrders,
    getOrderById,
    updateOrderStatus,
} = require("../controllers/orderController");
const { body, param } = require('express-validator');

const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

// Customers can place orders and view their own orders
router.post(
  '/',
  protect,
  [
    body('items').isArray({ min: 1 }).withMessage('Items must be a non-empty array'),
    body('items.*.menuItem').isMongoId().withMessage('Each item must have a valid menuItem ID'),
    body('items.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
    body('paymentMethod').isIn(['cash', 'online']).withMessage('Payment method must be cash or online'),
  ],
  placeOrder
);
router.get("/", protect, getOrders);
router.get("/:id", protect, getOrderById);

// Admin can update order status
router.put(
  '/:id/status',
  protect,
  adminOnly,
  [
    param('id').isMongoId().withMessage('Invalid order ID'),
    body('status').isIn(['pending', 'confirmed', 'preparing', 'out-for-delivery', 'delivered', 'cancelled']).withMessage('Invalid status'),
  ],
  updateOrderStatus
);

module.exports = router;
