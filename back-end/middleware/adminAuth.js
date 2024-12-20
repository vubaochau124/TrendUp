import jwt from "jsonwebtoken"
import employees from "../models/employeeModel.js";
import dotenv from 'dotenv';

dotenv.config();

const adminAuth = async (req, res, next) => {
    try {
        const {token} = req.headers
        if (!token) {
            return res.json({sucess:true, message: "Not Authorized Login Again"})
        }
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        const list_employees = await employees()
        
        let isvalid = false
        for (let i = 0; i < list_employees.length; i++) {
            if (token_decode === list_employees[i].email + list_employees[i].password) {
                isvalid = true
            } 
        }
        if (isvalid === false){
            return res.json({sucess:true, message: token_decode})
        }
        next()
        
    } catch (error) {
        console.log(error)
        res.json({sucess:false, message:error.message})
    }
}

export default adminAuth