const employeeModel = require('../models/employeeModel');

const getAllEmployees = async (req, res) => {
    try {
        const employees = await employeeModel.getEmployees();
        res.json(employees);
    } catch (err){
        res.status(500).json({error: err.message});
    }
}

const getEmployeeById = async (req, res) => {
    const {id} = req.params;
    try {
        const employee = await employeeModel.getEmployeeById(id);
        if(!employee) return res.status(404).json({message: "Employee not found." });
        res.json(employee);
    } catch (err){
        res.status(500).json({error: err.message});
    }
}

const editEmployeeById = async (req, res) => {
    const {firstname, lastname, contactnumber, address} = req.body;
    const {id} = req.params;
    try {
        const employee = await employeeModel.editEmployeeById(id, firstname, lastname, contactnumber, address);
        if(!employee) return res.status(404).json({message: "employee not found." });
        res.json({message:"Update successful."});
    } catch (err){
        res.status(500).json({error: err.message});
    }
}

const deleteEmployeeById = async (req, res) => {
    const {id} = req.params;
    try {
        const employee = await employeeModel.deleteEmployeeById(id);
        if(!employee) return res.status(404).json({message: "Employee not found." });
        res.json({message:"Employee deleted successfully."});
    } catch (err){
        res.status(500).json({error: err.message});
    }
}

const addEmployee = async (req, res) => {
    const {firstname, lastname, contactnumber, address} = req.body;
    try {
        
        const employee = await employeeModel.addEmployee(firstname, lastname, contactnumber, address);
        res.json({message:"Employee added successfully."});
    } catch (err){
        res.status(500).json({error: err.message});
    }
};

module.exports = {getAllEmployees, getEmployeeById, editEmployeeById, addEmployee,deleteEmployeeById};