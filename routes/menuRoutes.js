const express = require("express");
const {
  getMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getMenuCategories,
} = require("../controllers/menuController");
const { body, param } = require('express-validator');

const { protect, adminOnly } = require("../middleware/authMiddleware");
const router = express.Router();

// Public routes
router.get("/:id", getMenuItemById);
router.get("/", getMenuItems);


// Admin routes
router.post(
  '/',
  protect,
  adminOnly,
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('category').notEmpty().withMessage('Category is required'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
    body('description').optional().isString(),
    body('imageUrl').optional().isURL().withMessage('Image URL must be valid'),
    body('available').optional().isBoolean(),
  ],
  createMenuItem
);

router.put(
  '/:id',
  protect,
  adminOnly,
  [
    param('id').isMongoId().withMessage('Invalid menu item ID'),
    body('name').optional().notEmpty().withMessage('Name cannot be empty'),
    body('category').optional().notEmpty().withMessage('Category cannot be empty'),
    body('price').optional().isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
    body('description').optional().isString(),
    body('imageUrl').optional().isURL().withMessage('Image URL must be valid'),
    body('available').optional().isBoolean(),
  ],
  updateMenuItem
);
router.delete("/:id", protect, adminOnly, deleteMenuItem);

router.get("/categories", getMenuCategories);

module.exports = router;
