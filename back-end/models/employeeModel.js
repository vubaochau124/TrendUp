import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

// Initialize Sequelize with connection details from .env file
const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    port: process.env.MYSQL_PORT
});

// Define the Employee model
const employeeModel = sequelize.define('Employee', {
    employee_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    dob: {
        type: DataTypes.DATE,
        allowNull: true
    },
    phone: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    position: {
        type: DataTypes.ENUM('sale', 'warehouse_staff', 'shipper', 'admin'),
        allowNull: false
    }
}, {
    tableName: 'Employees',
    timestamps: false
});

sequelize.sync()
    .then(() => {
        console.log('Employees table has been successfully created, if one doesn\'t exist');
    })
    .catch(error => {
        console.error('This error occurred:', error);
    });

export default employeeModel;