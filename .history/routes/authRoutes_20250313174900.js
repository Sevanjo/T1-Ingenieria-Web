const express = require('express');
const bcrypt = require('bcrypt');
const { Usuario } = require('../models/Usuario'); // Importamos el modelo de la BD
const jwt = require('jsonwebtoken'); // Importa JWT para autenticación

const router = express.Router();

// Ruta para registrar un usuario
router.post('/register', async (req, res) => {
    const { nombre, email, password } = req.body;

    try {
        // Verificar si el usuario ya existe en la BD
        const usuarioExistente = await Usuario.findOne({ where: { email } });
        if (usuarioExistente) {
            return res.status(400).json({ message: "El usuario ya está registrado" });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Guardar en la base de datos
        const usuario = await Usuario.create({
            nombre,
            email,
            password: hashedPassword
        });

        res.status(201).json({ message: "Usuario registrado con éxito", usuario });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error });
    }
});

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verificar si el usuario existe
        const user = await Usuario.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Verificar la contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // Generar token JWT
        const token = jwt.sign({ id: user.id, email: user.email }, 'secreto', { expiresIn: '1h' });

        res.json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error });
    }
});

module.exports = router;
