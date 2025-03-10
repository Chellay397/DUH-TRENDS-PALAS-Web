const express = require('express');

const {getAllOrders,getOrderById,editOrderById,addOrder, deleteOrderById} = require('../controllers/orderController');
const router = express.Router();

router.get('/',getAllOrders);
router.post('/',addOrder);

router.get('/:id',getOrderById);
router.put('/:id',editOrderById);
router.delete('/:id',deleteOrderById);

module.exports = router;