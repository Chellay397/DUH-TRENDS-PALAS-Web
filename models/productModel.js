const db = require('../config/db');

const getProducts = async () => {
    const [rows] = await db.query("SELECT * FROM product ORDER BY product_barcode ASC");
    return rows;
}

const getProductById = async (id) => {
    const [rows] = await db.query("SELECT * FROM product WHERE product_barcode = ?",[id]);
    return rows[0];
}

const editProductById = async (product_barcode, product_name, brandpartner_id, quantity, price, employee_id, delivery_date, expiration_date) => {
    const [result] = await db.query("UPDATE product SET product_name = ?, brandpartner_id = ?, quantity = ?, price = ?, employee_id = ?, delivery_date = ?, expiration_date = ? WHERE product_barcode = ?",[product_name, brandpartner_id, quantity, price, employee_id, delivery_date, expiration_date, product_barcode]);
    return result.affectedRows > 0;
}

const deleteProductById = async (id) => {
    const [result] = await db.query("DELETE FROM product WHERE product_barcode = ?",[id]);
    return result.affectedRows > 0;
}

const addProduct = async (product_name, brandpartner_id, quantity, price, employee_id, delivery_date, expiration_date) => {
    const [result] = await db.query("INSERT INTO product(product_name, brandpartner_id, quantity, price, employee_id, delivery_date, expiration_date) VALUES(?,?,?,?,?,?,?)",[product_name, brandpartner_id, quantity, price, employee_id, delivery_date, expiration_date]);
    return result.insertId;
}

module.exports = {
    getProducts,
    getProductById,
    editProductById,
    deleteProductById,
    addProduct
};