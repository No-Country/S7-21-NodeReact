const router = require("express").Router();
const authCtrls = require("../controllers/auth.controllers");
const userSchemaValidator = require('../schemas/userSchema.validator');
const validateFields = require('../schemas/validateFields');

// Ruta de registro de usuario
router.post("/register", [userSchemaValidator, validateFields], authCtrls.registerUser);

// Ruta de inicio de sesión de usuario
router.post("/login", authCtrls.loginUser);

// Ruta de reinicio de contraseña de usuario
router.post("/resetPass", authCtrls.changePassword);

module.exports = router;
