const db = require('../config/db');

const getOrderDetails = async () => {
    const [rows] = await db.query("SELECT * FROM `order_details` ORDER BY order_detail_id ASC");
    return rows;
}

const getOrderDetailsById = async (id) => {
    const [rows] = await db.query("SELECT * FROM order_details WHERE order_detail_id = ?",[id]);
    return rows[0];
}
const getOrderDetailsByOrderId = async (id) => {
    const [rows] = await db.query("SELECT * FROM order_details WHERE order_id = ?",[id]);
    return rows;
}
const editOrderDetailsById = async (id, order_id, product_barcode, quantity, price) => {
    const [result] = await db.query("UPDATE order_details SET  order_id = ?, product_barcode = ?, quantity = ?, price = ? WHERE order_id = ?",[ order_id, product_barcode, quantity, price, id]);
    return result.affectedRows > 0;
}

const deleteOrderDetailsById = async (id) => {
    const [result] = await db.query("DELETE FROM order_details WHERE order_detail_id = ?",[id]);
    return result.affectedRows > 0;
}

const addOrderDetails = async (order_id, product_barcode, quantity, price) => {
    const [result] = await db.query("INSERT INTO order_details(order_id, product_barcode, quantity, price) VALUES(?,?,?,?)",[order_id, product_barcode, quantity, price]);
    return result.insertId;
}

module.exports = {
    getOrderDetails,
    getOrderDetailsById,
    getOrderDetailsByOrderId,
    editOrderDetailsById,
    deleteOrderDetailsById,
    addOrderDetails
};