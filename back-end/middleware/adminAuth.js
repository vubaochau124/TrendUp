import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const adminAuth = async (req, res, next) => {
    try {
        const temp = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluQGFkbWluLmNvbWFkbWluMTIzIiwiaWF0IjoxNzM0OTAyNjIwLCJleHAiOjE3MzQ5MDYyMjB9.tk96fN5xuMrbbCg6ZsQJdfW1Afrk5yeQzJm2KKpLGJg";

        const {token} = req.headers;
        if (!token) {
            return res.json({success:false, message: "Not Authorized Login Again: No Token"})
        }
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        const temp_decode = jwt.verify(temp, process.env.JWT_SECRET);
        console.log(token_decode);
        // const list_employees = await employees()
        
        // for (let i = 0; i < list_employees.length; i++) {
        //     if (token_decode !== list_employees[i].email + list_employees[i].password) {
        //         return res.json({sucess:true, message: "Not Authorized Login Again"})
        //     } 
        // }

        // if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD ) {
        if (token !== temp) {
            return res.json({success:false, message: "Not Authorized Login Again: Invalid Token"})
        } 
        next()
    } catch (error) {
        console.log(error)
        res.json({sucess:false, message:error.message})
    }
}

export default adminAuth