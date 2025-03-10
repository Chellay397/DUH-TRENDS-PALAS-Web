const db = require('../config/db');

const getStoragetypes = async () => {
    const [rows] = await db.query("SELECT * FROM storagetype ORDER BY Storage_ID ASC");
    return rows;
}

const getStoragetypeById = async (id) => {
    const [rows] = await db.query("SELECT * FROM storagetype WHERE Storage_ID = ?",[id]);
    return rows[0];
}

const editStoragetypeById = async (id, Storage_price, ContractID) => {
    const [result] = await db.query("UPDATE storagetype SET Storage_price = ?, ContractID = ? WHERE Storage_ID = ?",[Storage_price, ContractID, id]);
    return result.affectedRows > 0;
}

const deleteStoragetypeById = async (id) => {
    const [result] = await db.query("DELETE FROM storagetype WHERE Storage_ID = ?",[id]);
    return result.affectedRows > 0;
}

const addStoragetype = async (Storage_price, ContractID) => {
    const [result] = await db.query("INSERT INTO storagetype(Storage_price, ContractID) VALUES(?,?)",[Storage_price, ContractID]);
    return result.insertId;
}

module.exports = {
    getStoragetypes,
    getStoragetypeById,
    editStoragetypeById,
    deleteStoragetypeById,
    addStoragetype
};