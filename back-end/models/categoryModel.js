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
const categoryModel = sequelize.define('Category', {
    category_id: {
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
    type: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'categories', // Specify the table name
    timestamps: false // Disable automatic timestamps
});

// Sync the model with the database
sequelize.sync()
    .then(() => {
        console.log('categories table has been successfully created, if one doesn\'t exist');
    })
    .catch(error => {
        console.error('This error occurred:', error);
    });

export default categoryModel;