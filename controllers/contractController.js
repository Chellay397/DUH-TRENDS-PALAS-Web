const contractModel = require('../models/contractModel');

const getAllContracts = async (req, res) => {
    try {
        const contract = await contractModel.getContracts();
        res.json(contract);
    } catch (err){
        res.status(500).json({error: err.message});
    }
}

const getContractById = async (req, res) => {
    const {id} = req.params;
    try {
        const contract = await contractModel.getContractById(id);
        if(!contract) return res.status(404).json({message: "Contracts not found." });
        res.json(contract);
    } catch (err){
        res.status(500).json({error: err.message});
    }
}

const editContractById = async (req, res) => {
    const {Contract_startdate, Contract_enddate, BrandPartner_ID, Owner_ID} = req.body;
    const {id} = req.params;
    try {
        const contract = await contractModel.editContractById(Contract_startdate, Contract_enddate, BrandPartner_ID, Owner_ID);
        if(!contract) return res.status(404).json({message: "Contract not found." });
        res.json({message:"Update successful."});
    } catch (err){
        res.status(500).json({error: err.message});
    }
}

const deleteContractById = async (req, res) => {
    const {id} = req.params;
    try {
        const contract = await contractModel.deleteContractById(id);
        if(!contract) return res.status(404).json({message: "Contract not found." });
        res.json({message:"Contract deleted successfully."});
    } catch (err){
        res.status(500).json({error: err.message});
    }
}

const addContract = async (req, res) => {
    const {Contract_startdate, Contract_enddate, BrandPartner_ID, Owner_ID} = req.body;
    try {
        
        const contract = await contractModel.addEmployee(Contract_startdate, Contract_enddate, BrandPartner_ID, Owner_ID);
        res.json({message:"Contract added successfully."});
    } catch (err){
        res.status(500).json({error: err.message});
    }
};

module.exports = {getAllContracts, getContractById, editContractById, addContract,deleteContractById};