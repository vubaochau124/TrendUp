import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

// Initialize Sequelize with connection details from .env file
const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    port: process.env.MYSQL_PORT
});

// Define the Order model
const orderModel = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    items: {
        type: DataTypes.JSON, // Use JSON to store an array of items
        allowNull: false
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    address: {
        type: DataTypes.JSON, // Use JSON to store an address object
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Order Placed' // Set default value to 'pending'
    },
    paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false
    },
    payment: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false // Set default value to false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'orders',
    timestamps: true // Add createdAt and updatedAt fields
});

// Sync the model with the database
sequelize.sync()
    .then(() => {
        console.log('Orders table has been successfully created, if one doesn\'t exist');
    })
    .catch(error => {
        console.error('This error occurred:', error);
    });

// for (let i = 1; i < 10; i ++) {
//     if (i % 4 === 0) {
//         userId = 1;
//         items = []
//     }
// }
export default orderModel;