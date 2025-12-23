const Order = require('../models/Order');
const { validateTransition, STATUSES } = require('../services/orderLifecycle.service');

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
};

const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('items.productId');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching order', error: error.message });
    }
};

const updateOrderStatus = async (req, res) => {
    const { status } = req.body;
    const { id } = req.params;

    if (!status) {
        return res.status(400).json({ message: 'Status is required' });
    }

    try {
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Validate transition
        try {
            validateTransition(order.status, status);
        } catch (transitionError) {
            return res.status(400).json({ message: transitionError.message });
        }

        // Update order
        order.status = status;
        if (status === STATUSES.REFUNDED) {
            order.refundedAt = new Date();
        }

        await order.save();

        res.status(200).json({
            message: `Order status updated to ${status}`,
            order
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating order status', error: error.message });
    }
};

module.exports = {
    getAllOrders,
    getOrderById,
    updateOrderStatus
};
