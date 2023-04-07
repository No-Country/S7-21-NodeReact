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
 * @openapi
 * /api/v1/users/showMe:
 *   get:
 *     tags:
 *       - Users
 *     summary: Obtener información del usuario activo
 *     description: Este endpoint devuelve la información del usuario autenticado. Para que funcione, se requiere un token de autorización (Authorization Bearer < token >)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
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
 *                   example: Información del usuario
 *                 body:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 9430383e-e7d0-48a0-b974-50e5220176ff
 *                     firstName:
 *                       type: string
 *                       example: Francisco
 *                     lastName:
 *                       type: string
 *                       example: Rodriguez
 *                     email:
 *                       type: string
 *                       example: Franrod47@gmail.com
 *                     profileImage:
 *                       type: string
 *                       example: https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png
 *                     phone:
 *                       type: string
 *                       example: 54911582341
 *                     role:
 *                       type: string
 *                       example: client
 *                     createdAt:
 *                       type: string
 *                       example: 2023-04-07T07:45:58.130Z
 *                     updatedAt:
 *                       type: string
 *                       example: 2023-04-07T08:04:05.380Z
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: El token no es válido
 */
router.get("/showMe", authenticateUser, showMe);

/**
 * @openapi
 * /api/v1/users/all/{rol}:
 *   get:
 *     tags:
 *       - All
 *     summary: Retorna todos los usuarios registrados por rol (Cliente, Administrador, Barbero)
 *     description: Retorna una lista con todos los usuarios registrados en el sistema que tienen el rol especificado. Se requiere autorización
 *     parameters:
 *       - name: role
 *         in: path
 *         description: Rol de los usuarios que se quieren buscar (client, admin, barber)
 *         required: true
 *         schema:
 *           type: string
 *           enum: [client, admin, barber]
 *     responses:
 *       '200':
 *         description: Retorna una lista con todos los usuarios registrados en el sistema que tienen el rol especificado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   description: El número de usuarios encontrados con el rol especificado
 *                 rows:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: El ID del usuario.
 *                         example: ae7b7460-c565-4dae-9933-a202528ae157
 *                       firstName:
 *                         type: string
 *                         description: El nombre del usuario.
 *                         example: Franco
 *                       lastName:
 *                         type: string
 *                         description: El apellido del usuario.
 *                         example: Vera
 *                       email:
 *                         type: string
 *                         description: El correo electrónico del usuario.
 *                         example: fran@gmail.com
 *                       profileImage:
 *                         type: string
 *                         description: La URL de la imagen de perfil del usuario.
 *                         example: https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png
 *                       phone:
 *                         type: string
 *                         description: El número de teléfono del usuario.
 *                         example: 3213451234
 *                       role:
 *                         type: string
 *                         description: El rol del usuario.
 *                         example: client
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha y hora de creación del usuario.
 *                         example: "2023-04-03T21:16:56.050Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha y hora de última actualización del usuario.
 *                         example: "2023-04-03T21:27:20.246Z"
 *               example:
 *                 count: 2
 *                 rows:
 *                   - id: ae7b7460-c565-4dae-9933-a202528ae157
 *                     firstName: Franco
 *                     lastName: Vera
 *                     email: fran@gmail.com
 *                     profileImage: https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png
 *                     phone: 3213451234
 *                     role: client
 *                     createdAt: "2023-04-03T21:16:56.050Z"
 *                     updatedAt: "2023-04-03T21:27:20.246Z"
 *                   - id: 73f3a3c9-e64d-4f1e-9dc6-f5b6691dd802
 *                     firstName: Avi
 *                     lastName: Pestarica
 *                     email: avipestarica@gmail.com
 *                     profileImage: https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png
 *                     phone: 115515462
 *                     role: client
 *                     createdAt: "2023-04-06T22:10:15.050Z"
 *                     updatedAt: "2023-04-06T22:10:15.050Z"
 *
 *       '400':
 *         description: Solicitud incorrecta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: la sintaxis de entrada no es válida para el enum \enum_Users_role\
 *       '401':
 *         description: Solicitud incorrecta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: El token no es valido
 */
router.get("/all/:roleUser", authenticateUser, getAllUsers);

/**
 * @openapi
 * /api/v1/users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Obtener información de un usuario por ID
 *     description: Retorna la información de un usuario por su ID. Se requiere autenticación.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a buscar
 *         schema:
 *           type: string
 *           format: uuid
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Información del usuario encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 200
 *                   description: Código de respuesta HTTP
 *                 message:
 *                   type: string
 *                   example: Usuario encontrado
 *                   description: Mensaje descriptivo de la respuesta
 *                 body:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       example: 9430383e-e7d0-48a0-b974-50e5220176ff
 *                       description: ID del usuario
 *                     firstName:
 *                       type: string
 *                       example: Francisco
 *                       description: Nombre del usuario
 *                     lastName:
 *                       type: string
 *                       example: Rodriguez
 *                       description: Apellido del usuario
 *                     email:
 *                       type: string
 *                       example: Franrod47@gmail.com
 *                       description: Correo electrónico del usuario
 *                     profileImage:
 *                       type: string
 *                       example: https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png
 *                       description: URL de la imagen de perfil del usuario
 *                     phone:
 *                       type: string
 *                       example: 54911582341
 *                       description: Número de teléfono del usuario
 *                     role:
 *                       type: string
 *                       example: client
 *                       description: Rol del usuario en la aplicación
 *                     createdAt:
 *                       type: string
 *                       example: 2023-04-07T07:45:58.130Z
 *                       description: Fecha y hora de creación del usuario
 *                     updatedAt:
 *                       type: string
 *                       example: 2023-04-07T08:04:05.380Z
 *                       description: Fecha y hora de la última actualización del usuario
 *       400:
 *         description: Solicitud incorrecta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: la sintaxis de entrada no es válida para tipo uuid
 *                   description: Mensaje de error descriptivo
 *       401:
 *         description: Acceso no autorizado
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: El token no es valido
 *                  description: Mensaje de error descriptivo
 */
router.get("/:id", authenticateUser, getUserById);

/**
 * @openapi
 * /api/v1/users/{id}:
 *   put:
 *     tags:
 *       - Users
 *     summary: Actualizar información de un usuario por ID
 *     description: Actualiza la información de un usuario por su ID. Se requiere autenticación.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a buscar
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: body
 *         name: body
 *         description: Datos del usuario a actualizar
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               example: usuario@gmail.com
 *               description: Correo electrónico del usuario
 *             firstName:
 *               type: string
 *               example: Juan
 *               description: Nombre del usuario
 *             lastName:
 *               type: string
 *               example: Perez
 *               description: Apellido del usuario
 *             profileImage:
 *               type: string
 *               example: https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png
 *               description: URL de la imagen de perfil del usuario
 *             phone:
 *               type: string
 *               example: 54911582341
 *               description: Número de teléfono del usuario
 *             password:
 *               type: string
 *               example: passwordsegura
 *               description: Contraseña del usuario en texto plano
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Información del usuario actualizada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 200
 *                   description: Código de respuesta HTTP
 *                 message:
 *                   type: string
 *                   example: Usuario actualizado de manera exitosa
 *                   description: Mensaje descriptivo de la respuesta
 *                 body:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk0MzAzODNlLWU3ZDAtNDhhMC1iOTc0LTUwZTUyMjAxNzZmZiIsInJvbGUiOiJjbGllbnQiLCJpYXQiOjE2ODA4NTk3NTUsImV4cCI6MTY4MDg2MDExNX0._GWZgGAV9lcd3Ai_R-UpCRvxO4Yar0Ot_Qls6_i8Lv4
 *                   description: Token de autenticación actualizado del usuario
 *       400:
 *         description: Solicitud incorrecta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: la sintaxis de entrada no es válida para tipo uuid
 *                   description: Mensaje de error descriptivo
 *       401:
 *         description: Acceso no autorizado
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: El token no es valido
 *                  description: Mensaje de error descriptivo
 */
router.patch("/:id", authenticateUser, updateUserById);

/**
 * @openapi
 * /api/v1/users/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Eliminar un usuario por ID
 *     description: Elimina un usuario por su ID. Se requiere autenticación.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a eliminar
 *         schema:
 *           type: string
 *           format: uuid
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Usuario eliminado de manera exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 200
 *                   description: Código de respuesta HTTP
 *                 message:
 *                   type: string
 *                   example: Usuario 9430383e-e7d0-48a0-b974-50e5220176ff eliminado
 *                   description: Mensaje descriptivo de la respuesta
 *       400:
 *         description: Solicitud incorrecta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: la sintaxis de entrada no es válida para tipo uuid
 *                   description: Mensaje de error descriptivo
 *       401:
 *         description: Acceso no autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: El token no es válido
 *                   description: Mensaje de error descriptivo
 */
router.delete("/:id", authenticateUser, deleteUser);

module.exports = router;
