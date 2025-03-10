const orderDetailsModel = require('../models/orderDetailsModel');

const getAllOrderDetails = async (req, res) => {
    try {
        const orderDetails = await orderDetailsModel.getOrderDetails();
        res.json(orderDetails);
    } catch (err){
        res.status(500).json({error: err.message});
    }
}

const getOrderDetailsById = async (req, res) => {
    const {id} = req.params;
    try {
        const orderDetails = await orderDetailsModel.getOrderDetailsById(id);
        if(!orderDetails) return res.status(404).json({message: "OrderDetails not found." });
        res.json(orderDetails);
    } catch (err){
        res.status(500).json({error: err.message});
    }
}
const getOrderDetailsByOrderId = async (req, res) => {
    const {id} = req.params;
    try {
        const orderDetails = await orderDetailsModel.getOrderDetailsByOrderId(id);
        if(!orderDetails) return res.status(404).json({message: "Order not found." });
        res.json(orderDetails);
    } catch (err){
        res.status(500).json({error: err.message});
    }
}
const editOrderDetailsById = async (req, res) => {
    const {order_id, product_barcode, quantity, price} = req.body;
    const {id} = req.params;
    try {
        const orderDetails = await orderDetailsModel.editOrderDetailsById(id, order_id, product_barcode, quantity, price);
        if(!orderDetails) return res.status(404).json({message: "OrderDetails not found." });
        res.json({message:"Update successful."});
    } catch (err){
        res.status(500).json({error: err.message});
    }
}

const deleteOrderDetailsById = async (req, res) => {
    const {id} = req.params;
    try {
        const orderDetails = await orderDetailsModel.deleteOrderDetailsById(id);
        if(!orderDetails) return res.status(404).json({message: "OrderDetails not found." });
        res.json({message:"OrderDetails deleted successfully."});
    } catch (err){
        res.status(500).json({error: err.message});
    }
}

const addOrderDetails = async (req, res) => {
    const {order_id, product_barcode, quantity, price} = req.body;
    try {
        
        const orderDetails = await orderDetailsModel.addOrderDetails(order_id, product_barcode, quantity, price);
        res.json({message:"OrderDetails added successfully."});
    } catch (err){
        res.status(500).json({error: err.message});
    }
};

module.exports = {getAllOrderDetails, getOrderDetailsByOrderId,getOrderDetailsById, editOrderDetailsById, addOrderDetails,deleteOrderDetailsById};