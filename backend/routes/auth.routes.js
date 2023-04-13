const router = require("express").Router();
const authCtrls = require("../controllers/auth.controllers");
const userSchemaValidator = require("../schemas/userSchema.validator");
const validateFields = require("../schemas/validateFields");
const { authenticateUser } = require("../middlewares/auth.middleware");

/**
 * @openapi
 * /api/v1/auth/register:
 *   post:
 *     summary: Registrar cuenta nueva
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               firstName: Francisco
 *               lastName: Rodriguez
 *               email: Franrod47@gmail.com
 *               phone: 54911582341
 *               password: Francisco123
 *     responses:
 *       201:
 *         description: Nuevo usuario registrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: Nuevo usuario registrado
 *                 body:
 *                   type: string
 *                   example: Usuario registrado de manera exitosa
 *       400:
 *         description: Error por correo inválido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  error:
 *                    type: string
 *                    example: "Este mail ya esta registrado."
 */

router.post(
  "/register",
  [userSchemaValidator, validateFields],
  authCtrls.registerUser
);

/**
 * @openapi
 * /api/v1/auth/login:
 *   post:
 *     summary: Iniciar sesion
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *             example:
 *               email: Franrod47@gmail.com
 *               password: Francisco123
 *     responses:
 *       200:
 *         description: Login exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Login exitoso
 *                 body:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: 9430383e-e7d0-48a0-b974-50e5220176ff
 *                         firstName:
 *                           type: string
 *                           example: Francisco
 *                         lastName:
 *                           type: string
 *                           example: Rodriguez
 *                         email:
 *                           type: string
 *                           example: Franrod47@gmail.com
 *                         phone:
 *                           type: string
 *                           example: 54911582341
 *                         profileImage:
 *                           type: string
 *                           example: https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk0MzAzODNlLWU3ZDAtNDhhMC1iOTc0LTUwZTUyMjAxNzZmZiIsInJvbGUiOiJjbGllbnQiLCJpYXQiOjE2ODA4NTQyNTEsImV4cCI6MTY4MDg1NDYxMX0.v3-x-VzHdch3aEvHSNliZyQFHnVHaZORbePolMp8ZmQ
 *       401:
 *         description: Credenciales inválidas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Credenciales inválidas
 */

router.post("/login", authCtrls.loginUser);

/**
 * @openapi
 * /api/v1/auth/resetPassword:
 *   post:
 *     summary: Resetear la contraseña del usuario
 *     tags:
 *       - Authentication
 *     requestBody:
 *       description: Datos para resetear la contraseña del usuario
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *               confirmNewPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contraseña actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Contraseña actualizada.
 *                 body:
 *                   type: string
 *                   example: La contraseña ha sido actualizada.
 *       400:
 *         description: Error por datos invalidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error. Verificar Email y Contraseña
 */

router.post("/resetPass", authenticateUser, authCtrls.changePassword);

// Ruta para verificar usuario por email
router.post("/verifyEmail", authCtrls.verifyEmail);

module.exports = router;
