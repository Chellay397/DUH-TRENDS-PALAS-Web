const express = require('express');

const {getAllBrandpartners,getBrandpartnerById,editBrandpartnerById,addBrandpartner, deleteBrandpartnerById} = require('../controllers/brandpartnerController');
const router = express.Router();

router.get('/',getAllBrandpartners);
router.post('/',addBrandpartner);

router.get('/:id',getBrandpartnerById);
router.put('/:id',editBrandpartnerById);
router.delete('/:id',deleteBrandpartnerById);

module.exports = router;