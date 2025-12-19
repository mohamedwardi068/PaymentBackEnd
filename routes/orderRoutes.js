const express = require('express');
const router = express.Router();
const { createCheckoutSession, getOrderById } = require('../controllers/orderController');

router.post('/checkout', createCheckoutSession);
router.get('/:id', getOrderById);

module.exports = router;
