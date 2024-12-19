import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

// Initialize Sequelize with connection details from .env file
const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    port: process.env.MYSQL_PORT
});

// Define the User model
const userModel = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cartData: {
        type: DataTypes.JSON,
        defaultValue: {}
    }
}, {
    tableName: 'users', // Specify the table name
    timestamps: false // Disable automatic timestamps
});

// Sync the model with the database
sequelize.sync()
    .then(() => {
        console.log('Users table has been successfully created, if one doesn\'t exist');
    })
    .catch(error => {
        console.error('This error occurred:', error);
    });

export default userModel;