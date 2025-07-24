const express = require("express");
const { registerUser, loginUser, getProfile, forgotPassword, resetPassword } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const { body } = require('express-validator');

const router = express.Router();

router.post(
  "/register",
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  registerUser
);

router.post(
  "/login",
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  loginUser
);
router.get("/profile", protect, getProfile);

router.post(
  "/forgot-password",
  [body('email').isEmail().withMessage('Valid email is required')],
  forgotPassword
);

router.post(
  "/reset-password",
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('token').notEmpty().withMessage('Token is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  resetPassword
);

module.exports = router;
