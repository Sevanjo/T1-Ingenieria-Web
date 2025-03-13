const express = require('express');
const app = express();
const sequelize = require('./config/database');
const Producto = require('./models/Producto');
const Usuario = require('./models/Usuario');
const Pedido = require('./models/Pedido');

// Middleware para procesar JSON
app.use(express.json());

// Conectar y sincronizar modelos con la base de datos
async function conectarBD() {
    try {
        await sequelize.authenticate();
        console.log('✅ Conexión a la base de datos exitosa.');
        await sequelize.sync(); // Sincroniza los modelos con la BD
        console.log('✅ Modelos sincronizados con la base de datos.');
    } catch (error) {
        console.error('❌ Error al conectar con la base de datos:', error);
    }
}
conectarBD();

// Rutas para manejar productos
app.get('/productos', async (req, res) => {
    const productos = await Producto.findAll();
    res.json(productos);
});

app.post('/productos', async (req, res) => {
    const nuevoProducto = await Producto.create(req.body);
    res.json(nuevoProducto);
});

app.put('/productos/:id', async (req, res) => {
    const { id } = req.params;
    await Producto.update(req.body, { where: { id } });
    res.json({ message: 'Producto actualizado correctamente' });
});

app.delete('/productos/:id', async (req, res) => {
    const { id } = req.params;
    await Producto.destroy({ where: { id } });
    res.json({ message: 'Producto eliminado correctamente' });
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
