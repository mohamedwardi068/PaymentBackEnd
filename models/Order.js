const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
        },
    ],
    total: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['created', 'paid', 'failed', 'refunded'],
        default: 'created',
    },
    paymentIntentId: {
        type: String,
    },
    refundedAt: {
        type: Date,
    },
    paymentDetails: {
        cardLast4: { type: String, required: true },
        cardHolder: { type: String, required: true },
    },
    transactionId: {
        type: String,
    },
}, {
    timestamps: true,
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
