const brandpartnerModel = require('../models/brandpartnerModel');

const getAllBrandpartners = async (req, res) => {
    try {
        const brandpartners = await brandpartnerModel.getBrandpartners();
        res.json(brandpartners);
    } catch (err){
        res.status(500).json({error: err.message});
    }
}

const getBrandpartnerById = async (req, res) => {
    const {id} = req.params;
    try {
        const brandpartner = await brandpartnerModel.getBrandpartnerById(id);
        if(!brandpartner) return res.status(404).json({message: "Brandpartner not found." });
        res.json(brandpartner);
    } catch (err){
        res.status(500).json({error: err.message});
    }
}

const editBrandpartnerById = async (req, res) => {
    const {BrandPartner_ContactNum, BrandPartner_Email, BrandPartner_Address, Firstname, Lastname} = req.body;
    const {id} = req.params;
    try {
        const brandpartner = await brandpartnerModel.editBrandpartnerById(id, BrandPartner_ContactNum, BrandPartner_Email, BrandPartner_Address, Firstname, Lastname);
        if(!brandpartner) return res.status(404).json({message: "brandpartner not found." });
        res.json({message:"Update successful."});
    } catch (err){
        res.status(500).json({error: err.message});
    }
}

const deleteBrandpartnerById = async (req, res) => {
    const {id} = req.params;
    try {
        const brandpartner = await brandpartnerModel.deleteBrandpartnerById(id);
        if(!brandpartner) return res.status(404).json({message: "Brandpartner not found." });
        res.json({message:"Brandpartner deleted successfully."});
    } catch (err){
        res.status(500).json({error: err.message});
    }
}

const addBrandpartner = async (req, res) => {
    const {BrandPartner_ContactNum, BrandPartner_Email, BrandPartner_Address, Firstname, Lastname} = req.body;
    try {
        
        const brandpartner = await brandpartnerModel.addBrandpartner(BrandPartner_ContactNum, BrandPartner_Email, BrandPartner_Address, Firstname, Lastname);
        res.json({message:"Brandpartner added successfully."});
    } catch (err){
        res.status(500).json({error: err.message});
    }
};

module.exports = {getAllBrandpartners, getBrandpartnerById, editBrandpartnerById, addBrandpartner,deleteBrandpartnerById};