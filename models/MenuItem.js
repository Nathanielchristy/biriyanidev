const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true }, // e.g. "Biriyani", "Drinks"
    price: { type: Number, required: true },
    description: { type: String },
    imageUrl: { type: String },
    available: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model("MenuItem", menuItemSchema);
