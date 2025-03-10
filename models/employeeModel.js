const db = require('../config/db');

const getEmployees = async () => {
    const [rows] = await db.query("SELECT * FROM employee ORDER BY Employee_ID ASC");
    return rows;
}

const getEmployeeById = async (id) => {
    const [rows] = await db.query("SELECT * FROM employee WHERE Employee_ID = ?",[id]);
    return rows[0];
}

const editEmployeeById = async (id, firstname, lastname, contactnumber, address) => {
    const [result] = await db.query("UPDATE employee SET Firstname = ?, Lastname = ?, ContactNumber = ?, Address = ? WHERE Employee_ID = ?",[firstname, lastname, contactnumber, address, id]);
    return result.affectedRows > 0;
}

const deleteEmployeeById = async (id) => {
    const [result] = await db.query("DELETE FROM employee WHERE Employee_ID = ?",[id]);
    return result.affectedRows > 0;
}

const addEmployee = async (firstname, lastname, contactnumber, address) => {
    const [result] = await db.query("INSERT INTO employee(firstname, lastname, contactnumber, address) VALUES(?,?,?,?)",[firstname, lastname, contactnumber, address]);
    return result.insertId;
}

module.exports = {
    getEmployees,
    getEmployeeById,
    editEmployeeById,
    deleteEmployeeById,
    addEmployee
};