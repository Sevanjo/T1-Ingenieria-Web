const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Usuario } = require("../models"); // Asegúrate de que el modelo está bien importado
const { body, validationResult } = require("express-validator");

// Registro de usuarios
exports.registrarUsuario = async (req, res) => {
    // Validación de datos
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { nombre, email, password } = req.body;

        // Verifica si el usuario ya existe
        let usuarioExiste = await Usuario.findOne({ where: { email } });
        if (usuarioExiste) {
            return res.status(400).json({ msg: "El usuario ya existe" });
        }

        // Hashea la contraseña
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Crea el usuario
        const usuario = await Usuario.create({
            nombre,
            email,
            password: passwordHash,
        });

        res.status(201).json({ msg: "Usuario registrado exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error en el servidor" });
    }
};

// Inicio de sesión
exports.iniciarSesion = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar usuario por email
        const usuario = await Usuario.findOne({ where: { email } });

        if (!usuario) {
            return res.status(400).json({ msg: "Credenciales incorrectas" });
        }

        // Comparar contraseñas
        const esCorrecto = await bcrypt.compare(password, usuario.password);
        if (!esCorrecto) {
            return res.status(400).json({ msg: "Credenciales incorrectas" });
        }

        // Generar JWT
        const token = jwt.sign(
            { id: usuario.id, email: usuario.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error en el servidor" });
    }
};
