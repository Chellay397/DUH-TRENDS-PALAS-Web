const orderModel = require('../models/orderModel');

const getAllOrders = async (req, res) => {
    try {
        const orders = await orderModel.getOrders();
        res.json(orders);
    } catch (err){
        res.status(500).json({error: err.message});
    }
}

const getOrderById = async (req, res) => {
    const {id} = req.params;
    try {
        const order = await orderModel.getOrderById(id);
        if(!order) return res.status(404).json({message: "Order not found." });
        res.json(order);
    } catch (err){
        res.status(500).json({error: err.message});
    }
}

const editOrderById = async (req, res) => {
    const {order_date, employee_id, total} = req.body;
    const {id} = req.params;
    try {
        const order = await orderModel.editOrderById(id, order_date, employee_id, total);
        if(!order) return res.status(404).json({message: "Order not found." });
        res.json({message:"Update successful."});
    } catch (err){
        res.status(500).json({error: err.message});
    }
}

const deleteOrderById = async (req, res) => {
    const {id} = req.params;
    try {
        const order = await orderModel.deleteOrderById(id);
        if(!order) return res.status(404).json({message: "Order not found." });
        res.json({message:"Order deleted successfully."});
    } catch (err){
        res.status(500).json({error: err.message});
    }
}

const addOrder = async (req, res) => {
    const {order_date, total} = req.body;
    try {
        
        const order = await orderModel.addOrder(order_date, total);
        res.json({message:"Order added successfully.",id:order});
    } catch (err){
        res.status(500).json({error: err.message});
    }
};

module.exports = {getAllOrders, getOrderById, editOrderById, addOrder,deleteOrderById};