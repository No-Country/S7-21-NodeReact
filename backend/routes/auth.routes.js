const router = require("express").Router();
const authCtrls = require("../controllers/auth.controllers");
const userSchemaValidator = require("../schemas/userSchema.validator");
const validateFields = require("../schemas/validateFields");

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registro de usuario
 *     description: Registra un nuevo usuario en el sistema
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegistration'
 *     responses:
 *       200:
 *         description: Usuario registrado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Error en la validación de datos del usuario
 *       500:
 *         description: Error en el servidor
 */
router.post(
  "/register",
  [userSchemaValidator, validateFields],
  authCtrls.registerUser
);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Inicio de sesión de usuario
 *     description: Inicia sesión en el sistema con las credenciales del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthToken'
 *       400:
 *         description: Error en la validación de datos del usuario
 *       401:
 *         description: Credenciales de inicio de sesión inválidas
 *       500:
 *         description: Error en el servidor
 */
router.post("/login", authCtrls.loginUser);

/**
 * @swagger
 * /resetPass:
 *   post:
 *     summary: Reinicio de contraseña de usuario
 *     description: Reinicia la contraseña del usuario en el sistema
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserResetPassword'
 *     responses:
 *       200:
 *         description: Contraseña reiniciada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Error en la validación de datos del usuario
 *       401:
 *         description: Credenciales de reinicio de contraseña inválidas
 *       500:
 *         description: Error en el servidor
 */
router.post("/resetPass", authCtrls.changePassword);
module.exports = router;
