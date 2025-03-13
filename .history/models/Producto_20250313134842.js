const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Importar conexión a la BD

const Producto = sequelize.define('Producto', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    precio: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    }
});

module.exports = Producto;
