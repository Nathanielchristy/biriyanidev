const mongoose = require("mongoose");
const crypto = require('crypto');

function generateOrderId() {
    // Generate 6 random alphanumeric characters
    const randomStr = crypto.randomBytes(3).toString('hex').toUpperCase(); // e.g. 'A1B2C3'
    return `ORD-${randomStr}`;
}

const orderSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    orderId: { type: String, unique: true },
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
orderSchema.pre('save', async function (next) {
    if (this.isNew) {
        let unique = false;
        while (!unique) {
            this.orderId = generateOrderId();
            const existingOrder = await this.constructor.findOne({ orderId: this.orderId });
            if (!existingOrder) unique = true;
        }
    }
    next();
});

module.exports = mongoose.model("Order", orderSchema);
