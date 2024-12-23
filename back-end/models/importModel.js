import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

// Initialize Sequelize with connection details from .env file
const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    port: process.env.MYSQL_PORT
});

// Define the Import model
const importModel = sequelize.define('Import', {
    import_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    receipt: {
        type: DataTypes.JSON,
        allowNull: false
    },
}, {
    tableName: 'imports', // Specify the table name
    timestamps: false // Disable automatic timestamps
});

// Sync the model with the database
sequelize.sync()
    .then(() => {
        console.log('Imports table has been successfully created, if one doesn\'t exist');
    })
    .catch(error => {
        console.error('This error occurred:', error);
    });

export default importModel;