const express = require("express");
const { checkSchema } = require("express-validator");
const { authenticateUser } = require("../middlewares/auth.middleware");
const {
  getAllUsers,
  showMe,
  getUserById,
  updateUserById,
  deleteUser,
} = require("../controllers/users.controllers");

const router = express.Router();

/**
 * @swagger
 * /users/showMe:
 *   get:
 *     summary: Obtener información del usuario autenticado
 *     description: Obtiene la información del usuario autenticado en el sistema
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Información del usuario obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: No se pudo autenticar al usuario
 *       500:
 *         description: Error en el servidor
 */
router.get("/showMe", authenticateUser, showMe);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtener usuario por ID
 *     description: Obtiene la información de un usuario específico en el sistema
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del usuario a buscar
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Información del usuario obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: No se pudo autenticar al usuario
 *       404:
 *         description: El usuario especificado no existe
 *       500:
 *         description: Error en el servidor
 */
router.get("/:id", authenticateUser, getUserById);

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Actualizar usuario por ID
 *     description: Actualiza la información de un usuario específico en el sistema
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del usuario a actualizar
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdate'
 *     responses:
 *       200:
 *         description: Información del usuario actualizada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Error en la validación de datos del usuario
 *       401:
 *         description: No se pudo autenticar al usuario
 *       404:
 *         description: El usuario especificado no existe
 *       500:
 *         description: Error en el servidor
 */
router.patch("/:id", authenticateUser, updateUserById);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Eliminar usuario por ID
 *     description: Elimina la información de un usuario específico en el sistema
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del usuario a eliminar
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario eliminado con éxito
 *       401:
 *         description: No se pudo autenticar al usuario
 *       404:
 *         description: El usuario especificado no existe
 *       500:
 *         description: Error en el servidor
 */

router.delete("/:id", authenticateUser, deleteUser);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     description: Obtiene la información de todos los usuarios registrados en el sistema
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: roleUser
 *         in: path
 *         description: Rol de usuario a buscar (opcional)
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Información de los usuarios obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: No se pudo autenticar al usuario
 *       500:
 *         description: Error en el servidor
 */

router.get("/", authenticateUser, getAllUsers);

module.exports = router;
