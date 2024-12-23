import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import employeeModel from "../models/employeeModel.js";

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Route for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ where: { email } });

        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Route for user register
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const exists = await userModel.findOne({ where: { email: email } });
        if (exists) {
            return res.json({ success: false, message: 'Email already exists' });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: 'Invalid Email' });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: 'Password must be at least 8 characters' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await userModel.create({ name, email, password: hashedPassword });
        const token = createToken(newUser.id);
        res.json({ success: true, token });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Route for admin login
// const loginAdmin = async (req, res) => {
//     try {
//         const {email, password} = req.body
        
//         const list_employees = await employees()
        
//         let isemail = false
//         let ispassword = false
//         for (let i = 0; i < list_employees.length; i++) {
//             if (list_employees[i].email === email && list_employees[i].password === password) {
//                 const token = jwt.sign(email+password,process.env.JWT_SECRET);
//                 res.json({sucess:true, message: token})
//                 isemail = true
//                 ispassword = true
//             } 
//         }
//         if (isemail === false && ispassword === false) {
//             res.json({sucess:false, message: process.env.JWT_SECRET})
//         }
        
//     } catch (error){
//         console.log(error)
//         res.json({sucess:false, message:error.message})
//     }
// };

const loginEmployee = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await employeeModel.findOne({ where: { email: email } });
        if (email === process.env.ADMIN_EMAIL && password == process.env.ADMIN_PASSWORD) {
            const user_id = 0
            const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, { expiresIn: '1h' });
            const mess = {"token": token, "role": "admin"}
            return res.json({ success: true, message: mess});
        }
        if (!user) {
            return res.json({ success: false, message: 'Invalid email' });
        }

        const isMatch = (password === user.password);

        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid password' });
        }

        const token = createToken(user.position);
        const mess = {"token": token, "role": user.position}
        return res.json({ success: true, message: mess})
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Route for user register
const registerEmployee = async (req, res) => {
    try {
        const { name, dob, phone, email, password, position } = req.body;

        const exists = await employeeModel.findOne({ where: { email: email } });
        if (exists) {
            return res.json({ success: false, message: 'Email already exists' });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: 'Invalid Email' });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: 'Password must be at least 8 characters' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newEmployee = await employeeModel.create({ name, dob, phone, email, password: hashedPassword, position });
        const token = jwt.sign({ id: newEmployee.employee_id }, process.env.JWT_SECRET);
        res.json({ success: true, token });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export { loginUser, registerUser, loginEmployee, registerEmployee };