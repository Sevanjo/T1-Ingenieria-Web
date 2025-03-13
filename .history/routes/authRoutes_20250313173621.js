const express = require('express');
const bcrypt = require('bcrypt');
const { Usuario } = require('./models'); // Importamos el modelo de la BD

const router = express.Router();

// Ruta para registrar un usuario
router.post('/register', async (req, res) => {
    const { nombre, email, password } = req.body;

    try {
        // Verificar si el usuario ya existe en la BD
        const usuarioExistente = await Usuario.findOne({ where: { email } });
        if (usuarioExistente) {
            return res.status(400).json({ message: "El correo ya está registrado" });
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
        res.status(500).json({ message: "Error en el registro", error });
    }
});

module.exports = router;
