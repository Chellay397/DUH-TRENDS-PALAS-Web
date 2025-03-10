const express = require('express');

const {getAllEmployees,getEmployeeById,editEmployeeById,addEmployee, deleteEmployeeById} = require('../controllers/employeeController');
const router = express.Router();

router.get('/',getAllEmployees);
router.post('/',addEmployee);

router.get('/:id',getEmployeeById);
router.put('/:id',editEmployeeById);
router.delete('/:id',deleteEmployeeById);

module.exports = router;