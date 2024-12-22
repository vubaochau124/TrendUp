import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

// Initialize Sequelize with connection details from .env file
const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    port: process.env.MYSQL_PORT
});

// Define the Product model
const productModel = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    image: {
        type: DataTypes.JSON, // Use JSON to store an array
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    subCategory: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sizes: {
        type: DataTypes.JSON, // Use JSON to store an array
        allowNull: false,
        defaultValue: []
    },
    bestseller: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
}, {
    tableName: 'products', // Specify the table name
    timestamps: false // Disable automatic timestamps
});

// Sync the model with the database
sequelize.sync()
    .then(() => {
        console.log('Products table has been successfully created, if one doesn\'t exist');
    })
    .catch(error => {
        console.error('This error occurred:', error);
    });

export default productModel;