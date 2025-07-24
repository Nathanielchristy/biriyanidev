const Order = require("../models/Order");
const MenuItem = require("../models/MenuItem");
const { validationResult } = require('express-validator');

// Place new order
exports.placeOrder = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { items, paymentMethod } = req.body;

    try {
        // Calculate total
        let totalAmount = 0;
        for (const item of items) {
            const menuItem = await MenuItem.findById(item.menuItem);
            if (!menuItem || !menuItem.available) {
                return res.status(400).json({ message: `Item ${item.menuItem} not available` });
            }
            totalAmount += menuItem.price * item.quantity;
        }

        const order = await Order.create({
            customer: req.user._id,
            items,
            paymentMethod,
            totalAmount,
        });

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Get orders (customers get own orders, admin gets all)
exports.getOrders = async (req, res) => {
    try {
        let orders;
        if (req.user.role === "admin") {
            orders = await Order.find().populate("customer", "name email").populate("items.menuItem");
        } else {
            orders = await Order.find({ customer: req.user._id }).populate("items.menuItem");
        }
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Get order by ID (only owner or admin)
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate("items.menuItem").populate("customer", "name email");
        if (!order) return res.status(404).json({ message: "Order not found" });

        if (req.user.role !== "admin" && order.customer._id.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized" });
        }

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Admin updates order status
exports.updateOrderStatus = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { status } = req.body;

    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: "Order not found" });

        order.status = status;
        await order.save();

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
