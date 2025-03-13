const express = require('express');
const app = express();
const sequelize = require('./config/database'); // Importar conexión a la BD

async function conectarBD() {
    try {
        await sequelize.authenticate();
        console.log('✅ Conexión a la base de datos exitosa.');
    } catch (error) {
        console.error('❌ Error al conectar con la base de datos:', error);
    }
}

// Ejecutar la conexión antes de definir rutas
conectarBD();

// Ruta para probar la conexión con la base de datos
app.get('/test-db', async (req, res) => {
    try {
        await sequelize.authenticate();
        res.send('✅ Conexión con la base de datos funcionando.');
    } catch (error) {
        res.status(500).send('❌ Error en la conexión con la base de datos.');
    }
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

