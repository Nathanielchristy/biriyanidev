const MenuItem = require("../models/MenuItem");
const { validationResult } = require('express-validator');

// Get all menu items
const getMenuItems = async (req, res) => {
    try {
        const { category } = req.query;
        const filter = { available: true };

        if (category && category !== "All") {
            filter.category = category;
        }

        const items = await MenuItem.find(filter);
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
// Get all unique categories


const getMenuCategories = async (req, res) => {
    try {
        // SAFER QUERY in case some docs don't have available field
        const filter = { $or: [{ available: true }, { available: { $exists: false } }] };

        const categories = await MenuItem.distinct("category", filter);

        if (!Array.isArray(categories)) {
            throw new Error("Distinct query did not return an array");
        }

        res.json(["All", ...categories]);
    } catch (error) {
        console.error("Error in getMenuCategories:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
// Get menu item by ID
const getMenuItemById = async (req, res) => {
    try {
        const item = await MenuItem.findById(req.params.id);
        if (!item) return res.status(404).json({ message: "Menu item not found" });
        res.json(item);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Create menu item (admin only)
const createMenuItem = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, category, price, description, imageUrl, available } = req.body;
    try {
        const newItem = await MenuItem.create({
            name,
            category,
            price,
            description,
            imageUrl,
            available: available !== undefined ? available : true,
        });
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Update menu item (admin only)
const updateMenuItem = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const updatedItem = await MenuItem.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedItem) return res.status(404).json({ message: "Menu item not found" });
        res.json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Delete menu item (admin only)
const deleteMenuItem = async (req, res) => {
    try {
        const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);
        if (!deletedItem) return res.status(404).json({ message: "Menu item not found" });
        res.json({ message: "Menu item deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};


// Export menu controller functions
module.exports = {
    getMenuItems,
    getMenuItemById,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
    getMenuCategories
};