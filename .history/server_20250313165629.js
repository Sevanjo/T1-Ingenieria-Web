const express = require('express');
const app = express();
const sequelize = require('./config/database');
const productosRoutes = require('./routes/productos');
const authRoutes = require('./routes/authRoutes'); 
const cors = require('cors');

app.use(cors());
app.use(express.json()); 

// Rutas
app.use('/productos', productosRoutes);
app.use('/api/auth', authRoutes); 

// Conecta a la base de datos
async function conectarBD() {
    try {
        await sequelize.authenticate();
        console.log('✅ Conexión a la base de datos exitosa.');
        await sequelize.sync({ alter: true }); // Evita borrar datos
        console.log('✅ Modelos sincronizados con la base de datos.');
    } catch (error) {
        console.error('❌ Error al conectar con la base de datos:', error);
    }
}
conectarBD();

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

