const express = require('express');

const {getAllOrderDetails,getOrderDetailsById,getOrderDetailsByOrderId,editOrderDetailsById,addOrderDetails, deleteOrderDetailsById} = require('../controllers/orderDetailsController');
const router = express.Router();

router.get('/',getAllOrderDetails);
router.post('/',addOrderDetails);
router.get('/order/:id',getOrderDetailsByOrderId);

router.get('/:id',getOrderDetailsById);
router.put('/:id',editOrderDetailsById);
router.delete('/:id',deleteOrderDetailsById);

module.exports = router;