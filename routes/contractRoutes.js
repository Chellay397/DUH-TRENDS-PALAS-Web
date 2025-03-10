const express = require('express');

const {getAllContracts,getContractById,editContractById,addContract, deleteContractById} = require('../controllers/contractController');
const router = express.Router();

router.get('/',getAllContracts);
router.post('/',addContract);

router.get('/:id',getContractById);
router.put('/:id',editContractById);
router.delete('/:id',deleteContractById);

module.exports = router;