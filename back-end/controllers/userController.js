import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import employees from "../models/employeeModel.js"
import dotenv from 'dotenv';

dotenv.config();

// route for user login
const loginUser = async (req,res) => {

}

// route for user register
const registerUser = async (req,res) => {
    
}

// route for admin login
const loginAdmin = async (req,res) => {
    try {
        const {email, password} = req.body
        
        const list_employees = await employees()
        
        let isemail = false
        let ispassword = false
        for (let i = 0; i < list_employees.length; i++) {
            if (list_employees[i].email === email && list_employees[i].password === password) {
                const token = jwt.sign(email+password,process.env.JWT_SECRET);
                res.json({sucess:true, message: token})
                isemail = true
                ispassword = true
            } 
        }
        if (isemail === false && ispassword === false) {
            res.json({sucess:false, message: process.env.JWT_SECRET})
        }
        
    } catch (error){
        console.log(error)
        res.json({sucess:false, message:error.message})
    }
}

export {loginAdmin, loginUser, registerUser}
