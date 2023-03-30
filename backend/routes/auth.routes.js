const router = require("express").Router();
const authCtrls = require("../controllers/auth.controllers");

// Ruta de registro de usuario
router.post("/register", authCtrls.registerUser);

// Ruta de inicio de sesión de usuario
router.post("/login", authCtrls.loginUser);

module.exports = router;
