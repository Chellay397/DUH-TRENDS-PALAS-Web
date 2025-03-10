const express = require('express');

const {getAllProducts,getProductById,editProductById,addProduct, deleteProductById} = require('../controllers/productController');
const router = express.Router();

router.get('/',getAllProducts);
router.post('/',addProduct);

router.get('/:id',getProductById);
router.put('/:id',editProductById);
router.delete('/:id',deleteProductById);

module.exports = router;