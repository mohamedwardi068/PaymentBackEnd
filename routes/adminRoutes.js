const express = require('express');
const router = express.Router();
const { getAllOrders, getOrderById, updateOrderStatus } = require('../controllers/adminController');

router.get('/', getAllOrders);
router.get('/:id', getOrderById);
router.patch('/:id/status', updateOrderStatus);

module.exports = router;
