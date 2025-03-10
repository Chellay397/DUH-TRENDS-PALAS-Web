const db = require('../config/db');

const getContracts = async () => {
    const [rows] = await db.query("SELECT * FROM contract ORDER BY Contract_ID ASC");
    return rows;
}

const getContractById = async (id) => {
    const [rows] = await db.query("SELECT * FROM contract WHERE Contract_ID = ?",[id]);
    return rows[0];
}

const editContractById = async (id, Contract_startdate, Contract_enddate, BrandPartner_ID, Owner_ID) => {
    const [result] = await db.query("UPDATE contract SET Contract_startdate = ?, Contract_enddate = ?, BrandPartner_ID = ?, Owner_ID = ? WHERE Contract_ID = ?",[Contract_startdate, Contract_enddate, BrandPartner_ID, Owner_ID]);
    return result.affectedRows > 0;
}

const deleteContractById = async (id) => {
    const [result] = await db.query("DELETE FROM contract WHERE Contract_ID = ?",[id]);
    return result.affectedRows > 0;
}

const addContract = async (Contract_startdate, Contract_enddate, BrandPartner_ID, Owner_ID) => {
    const [result] = await db.query("INSERT INTO contract(Contract_startdate, Contract_enddate, BrandPartner_ID, Owner_ID) VALUES(?,?,?,?)",[Contract_startdate, Contract_enddate, BrandPartner_ID, Owner_ID]);
    return result.insertId;
}

module.exports = {
    getContracts,
    getContractById,
    editContractById,
    deleteContractById,
    addContract
};