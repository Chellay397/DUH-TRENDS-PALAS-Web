const storagetypeModel = require('../models/storagetypeModel');

const getAllStoragetypes = async (req, res) => {
    try {
        const storagetypes = await storagetypeModel.getStoragetypes();
        res.json(storagetypes);
    } catch (err){
        res.status(500).json({error: err.message});
    }
}

const getStoragetypeById = async (req, res) => {
    const {id} = req.params;
    try {
        const storagetype = await storagetypeModel.getStoragetypeById(id);
        if(!storagetype) return res.status(404).json({message: "Storagetype not found." });
        res.json(storagetype);
    } catch (err){
        res.status(500).json({error: err.message});
    }
}

const editStoragetypeById = async (req, res) => {
    const {Storage_price, ContractID} = req.body;
    const {id} = req.params;
    try {
        const storagetype = await storagetypeModel.editStoragetypeById(id, Storage_price, ContractID);
        if(!storagetype) return res.status(404).json({message: "Storagetype not found." });
        res.json({message:"Update successful."});
    } catch (err){
        res.status(500).json({error: err.message});
    }
}

const deleteStoragetypeById = async (req, res) => {
    const {id} = req.params;
    try {
        const storagetype = await storagetypeModel.deleteStoragetypeById(id);
        if(!storagetype) return res.status(404).json({message: "Storagetype not found." });
        res.json({message:"Storagetype deleted successfully."});
    } catch (err){
        res.status(500).json({error: err.message});
    }
}

const addStoragetype = async (req, res) => {
    const {Storage_price, ContractID} = req.body;
    try {
        
        const storagetype = await storagetypeModel.addStoragetype(Storage_price, ContractID);
        res.json({message:"Storagetype added successfully."});
    } catch (err){
        res.status(500).json({error: err.message});
    }
};

module.exports = {getAllStoragetypes, getStoragetypeById, editStoragetypeById, addStoragetype,deleteStoragetypeById};