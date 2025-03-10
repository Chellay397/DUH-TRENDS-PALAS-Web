const db = require('../config/db');

const getOrders = async () => {
    const [rows] = await db.query("SELECT * FROM `orders` ORDER BY order_id ASC");
    return rows;
}

const getOrderById = async (id) => {
    const [rows] = await db.query("SELECT * FROM orders WHERE order_id = ?",[id]);
    return rows[0];
}

const editOrderById = async (id, order_date, total) => {
    const [result] = await db.query("UPDATE orders SET order_date = ?, total = ? WHERE order_id = ?",[order_date, total, id]);
    return result.affectedRows > 0;
}

const deleteOrderById = async (id) => {
    const [result] = await db.query("DELETE FROM orders WHERE order_id = ?",[id]);
    return result.affectedRows > 0;
}

const addOrder = async (order_date, total) => {
    const [result] = await db.query("INSERT INTO orders(order_date, total) VALUES(?,?)",[order_date, total]);
    return result.insertId;
}

module.exports = {
    getOrders,
    getOrderById,
    editOrderById,
    deleteOrderById,
    addOrder
};