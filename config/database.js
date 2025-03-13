const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nombre_bd', 'usuario', 'contraseña', {
    host: 'localhost',
    dialect: 'mysql'
});

async function conectarBD() {
    try {
        await sequelize.authenticate();
        console.log('✅ Conexión a la base de datos exitosa.');
    } catch (error) {
        console.error('❌ Error al conectar con la base de datos:', error);
    }
}

module.exports = sequelize;
