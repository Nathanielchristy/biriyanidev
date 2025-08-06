const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [{
        menuItem: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem" },
        quantity: { type: Number, default: 1 },
    }],
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ["cash", "online"], default: "cash" },
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        zip: { type: String, required: true },
    },

    phoneNumber: { type: String, required: true },
    orderPlacedAt: { type: Date, default: Date.now },
    orderDeliveredAt: { type: Date },
    status: {
        type: String,
        enum: ["pending", "confirmed", "preparing", "out-for-delivery", "delivered", "cancelled"],
        default: "pending"
    }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
