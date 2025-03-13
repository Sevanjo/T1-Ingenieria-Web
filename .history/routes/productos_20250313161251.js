const express = require('express');
const router = express.Router();
const Producto = require('../models/Producto');

// Obtener todos los productos
router.get('/', async (req, res) => {
    try {
        const productos = await Producto.findAll();
        res.json(productos);
    } catch (error) {
        console.error('❌ Error al obtener productos:', error);
        res.status(500).json({ error: 'Error al obtener productos' });
    }
});

// Agregar un nuevo producto
router.post('/', async (req, res) => {
    try {
        const nuevoProducto = await Producto.create(req.body);
        res.status(201).json(nuevoProducto);
    } catch (error) {
        console.error('❌ Error al agregar producto:', error);
        res.status(500).json({ error: 'Error al agregar producto' });
    }
});

// Actualizar un producto por ID
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Producto.update(req.body, { where: { id } });
        if (updated) {
            res.json({ message: '✅ Producto actualizado correctamente' });
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        console.error('❌ Error al actualizar producto:', error);
        res.status(500).json({ error: 'Error al actualizar producto' });
    }
});

// Eliminar un producto por ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Producto.destroy({ where: { id } });
        if (deleted) {
            res.json({ message: '✅ Producto eliminado correctamente' });
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        console.error('❌ Error al eliminar producto:', error);
        res.status(500).json({ error: 'Error al eliminar producto' });
    }
});

module.exports = router;

