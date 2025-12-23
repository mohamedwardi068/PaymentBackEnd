const express = require('express');
const router = express.Router();
const { createCheckoutSession, getOrderById, getAllOrders } = require('../controllers/orderController');

router.get('/', getAllOrders);
router.post('/checkout', createCheckoutSession);
router.get('/:id', getOrderById);

module.exports = router;
