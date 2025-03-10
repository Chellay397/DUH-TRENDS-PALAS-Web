const db = require('../config/db');

const getBrandpartners = async () => {
    const [rows] = await db.query("SELECT * FROM brandpartner ORDER BY BrandPartner_ID ASC");
    return rows;
}

const getBrandpartnerById = async (id) => {
    const [rows] = await db.query("SELECT * FROM brandpartner WHERE BrandPartner_ID = ?",[id]);
    return rows[0];
}

const editBrandpartnerById = async (BrandPartner_ContactNum, BrandPartner_Email, BrandPartner_Address, Firstname, Lastname) => {
    const [result] = await db.query("UPDATE brandpartner SET BrandPartner_ContactNum = ?, BrandPartner_Email = ?, BrandPartner_Address = ?, Firstname = ? Lastname WHERE BrandPartner_ID = ?",[BrandPartner_ContactNum, BrandPartner_Email, BrandPartner_Address, Firstname, Lastname]);
    return result.affectedRows > 0;
}

const deleteBrandpartnerById = async (id) => {
    const [result] = await db.query("DELETE FROM brandpartner WHERE BrandPartner_ID = ?",[id]);
    return result.affectedRows > 0;
}

const addBrandpartner = async (BrandPartner_ContactNum, BrandPartner_Email, BrandPartner_Address, Firstname, Lastname) => {
    const [result] = await db.query("INSERT INTO brandpartner(BrandPartner_ContactNum, BrandPartner_Email, BrandPartner_Address, Firstname, Lastname) VALUES(?,?,?,?,?)",[BrandPartner_ContactNum, BrandPartner_Email, BrandPartner_Address, Firstname, Lastname]);
    return result.insertId;
}

module.exports = {
    getBrandpartners,
    getBrandpartnerById,
    editBrandpartnerById,
    deleteBrandpartnerById,
    addBrandpartner
};