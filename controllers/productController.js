const productModel = require('../models/productModel');

const getAllProducts = async (req, res) => {
    try {
        const products = await productModel.getProducts();
        res.json(products);
    } catch (err){
        res.status(500).json({error: err.message});
    }
}

const getProductById = async (req, res) => {
    const {id} = req.params;
    try {
        const product = await productModel.getProductById(id);
        if(!product) return res.status(404).json({message: "Product not found." });
        res.json(product);
    } catch (err){
        res.status(500).json({error: err.message});
    }
}

const editProductById = async (req, res) => {
    const {product_name, brandpartner_id, quantity, price, employee_id, delivery_date, expiration_date} = req.body;
    const {id} = req.params;
    try {
        const product = await productModel.editProductById(id, product_name, brandpartner_id, quantity, price, employee_id, delivery_date, expiration_date);
        if(!product) return res.status(404).json({message: "Product not found." });
        res.json({message:"Update successful."});
    } catch (err){
        res.status(500).json({error: err.message});
    }
}

const deleteProductById = async (req, res) => {
    const {id} = req.params;
    try {
        const product = await productModel.deleteProductById(id);
        if(!product) return res.status(404).json({message: "Product not found." });
        res.json({message:"Product deleted successfully."});
    } catch (err){
        res.status(500).json({error: err.message});
    }
}

const addProduct = async (req, res) => {
    const {product_name, brandpartner_id, quantity, price, employee_id, delivery_date, expiration_date} = req.body;
    try {
        
        const product = await productModel.addProduct(product_name, brandpartner_id, quantity, price, employee_id, delivery_date, expiration_date);
        res.json({message:"Product added successfully."});
    } catch (err){
        res.status(500).json({error: err.message});
    }
};

module.exports = {getAllProducts, getProductById, editProductById, addProduct,deleteProductById};