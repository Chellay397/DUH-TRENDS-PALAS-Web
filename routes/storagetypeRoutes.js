const express = require('express');

const {getAllStoragetypes,getStoragetypeById,editStoragetypeById,addStoragetype, deleteStoragetypeById} = require('../controllers/storagetypeController');
const router = express.Router();

router.get('/',getAllStoragetypes);
router.post('/',addStoragetype);

router.get('/:id',getStoragetypeById);
router.put('/:id',editStoragetypeById);
router.delete('/:id',deleteStoragetypeById);

module.exports = router;