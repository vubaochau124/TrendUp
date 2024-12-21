import employeeModel from "../models/employeeModel.js";

import { Op } from 'sequelize';

// Get all employees
const getEmployees = async (req, res) => {
    try {
        const employees = await employeeModel.findAll({
            where: { employee_id: { [Op.ne]: 1 } },
            attributes: { exclude: ['password'] }
        });
        console.log(employees);
        res.json({ success: true, employees });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Add an employee
const addEmployee = async (req, res) => {
    try {
        const { name, dob, phone, email, password, position } = req.body;

        const employee = await employeeModel.create({ name, dob, phone, email, password, position });

        res.json({ success: true, message: "Employee added successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// fetch an employee info
const getEmployeeById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);

        const employee = await employeeModel.findOne({ where: { employee_id: id } });

        res.json({ success: true, message: employee });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// edit an employee info
const editEmployee = async (req, res) => {
    try {
        // const employee_id = req.params.id;
        const { employee_id, name, dob, phone, email, position } = req.body;

        await employeeModel.update({ name, dob, phone, email, position }, { where: { employee_id } });

        res.json({ success: true, message: "Employee updated successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// delete an employee
const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;

        await employeeModel.destroy({ where: { employee_id: id } });

        res.json({ success: true, message: "Employee deleted successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { getEmployees, addEmployee, editEmployee, deleteEmployee, getEmployeeById };