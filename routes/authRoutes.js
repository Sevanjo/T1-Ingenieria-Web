const express = require("express");
const { registrarUsuario, iniciarSesion } = require("../controllers/authController");
const { body } = require("express-validator");

const router = express.Router();

// Rutas
router.post(
    "/registro",
    [
        body("email").isEmail().normalizeEmail(),
        body("nombre").trim().escape(),
        body("password").isLength({ min: 6 }).escape(),
    ],
    registrarUsuario
);

router.post("/login", iniciarSesion);

module.exports = router;
