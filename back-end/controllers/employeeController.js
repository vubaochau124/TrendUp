import {v2 as cloudinary} from 'cloudinary'
import connectDB from '../config/mysqlDB.js'
import employees from '../models/employeeModel.js'

// function for add product
const addEmployee = async (req, res) => {
    try {
        const {name, dob, phone, email, password, position} = req.body
        const [find] = await connectDB.query("INSERT INTO employees (name, dob, phone, email, password, position) VALUES (?, ?, ?, ?, ?, ?);", [name, dob, phone, email, password, position])

        res.json({sucess:true,message:"Employee Added"})

    } catch (error) {
        console.log(error)
        res.json({sucess:false, message:error.message})
    }
}

const listEmployee = async (req, res) => {
    try {
        const list_employees = await employees();
        res.json({sucess:true, message: list_employees})
    } catch (error){
        console.log(error)
        res.json({sucess:false, message:error.message})
    }
}

const editEmployee = async (req, res) => {
    try {
        const {employee_id, name, dob, phone, email, password, position} = req.body
        const [product] = await connectDB.query("UPDATE employees \
            SET name = ?, dob = ?, phone= ?, email = ?, \
            password = ?, position = ?\
            where employee_id = ?;", 
             [name, dob, phone, email, password, position, employee_id])
        res.json({sucess:true, message: "Edit " + name})
    } catch (error){
        console.log(error)
        res.json({sucess:false, message:error.message})
    }
}


const removeEmployee = async (req, res) => {
    try {
        await connectDB.query("DELETE FROM employees WHERE employee_id = ?;", [req.body.id]);
        res.json({sucess:true, message: "Delete employee"})
    } catch (error){
        console.log(error)
        res.json({sucess:false, message:error.message})
    }
}


const singleEmployee = async (req, res) => {
    try {
        const [result] = await connectDB.query("SELECT * FROM employees WHERE employee_id = ?;", [req.body.employee_id]);
        res.json({sucess:true, message: result[0]})
    } catch (error){
        console.log(error)
        res.json({sucess:false, message:error.message})
    }
}

export { listEmployee, addEmployee, editEmployee, removeEmployee, singleEmployee}