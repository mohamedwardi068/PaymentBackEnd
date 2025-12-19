const Order = require('../models/Order');
const Product = require('../models/Product');
const { processPayment } = require('../services/paymentService');

const createCheckoutSession = async (req, res) => {
    const { items, payment } = req.body;

    if (!items || items.length === 0) {
        return res.status(400).json({ message: 'No items in order' });
    }

    try {
        let total = 0;
        const orderItems = [];

        // validate items and calculate total from DB
        for (const item of items) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.status(404).json({ message: `Product not found: ${item.productId}` });
            }

            if (product.stock < item.quantity) {
                return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
            }

            total += product.price * item.quantity;
            orderItems.push({
                productId: product._id,
                name: product.name,
                quantity: item.quantity,
                price: product.price,
            });
        }

        // Process payment
        const paymentResult = await processPayment(payment, total);

        // Create order
        const order = new Order({
            items: orderItems,
            total,
            status: paymentResult.status === 'succeeded' ? 'paid' : 'failed',
            paymentDetails: {
                cardLast4: payment.cardNumber.slice(-4),
                cardHolder: payment.cardHolder,
            },
            transactionId: paymentResult.id,
        });

        const createdOrder = await order.save();

        // Update stock
        if (createdOrder.status === 'paid') {
            for (const item of items) {
                const product = await Product.findById(item.productId);
                product.stock -= item.quantity;
                await product.save();
            }
        }

        res.status(201).json({
            orderId: createdOrder._id,
            status: createdOrder.status,
            total: createdOrder.total,
            message: 'Order created successfully',
        });

    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: error.message || 'Checkout failed',
            status: 'failed'
        });
    }
};

const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('items.productId');
        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { createCheckoutSession, getOrderById };
