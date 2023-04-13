const router = require("express").Router();
const apptCtrls = require("../controllers/appointments.controllers");
const { authenticateUser } = require("../middlewares/auth.middleware");

/**
 * @swagger
 * /api/v1/appointments/{barberId}:
 *   post:
 *     summary: Crear un turno para un barbero
 *     description: REQUIERE TOKEN DE AUTENTICACIÓN. Formato de fecha -> YYYY-MM-DD. Formato de hora -> HH:MM
 *     tags:
 *       - Appointments
 *     parameters:
 *       - in: path
 *         name: barberId
 *         required: true
 *         description: El ID del barbero para el cual se creará el turno.
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       description: La información del turno a crear.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2023-04-13
 *               hour:
 *                 type: string
 *                 format: time
 *                 example: 17:30
 *     responses:
 *       200:
 *         description: Turno creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: Turno creado
 *                 body:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       example: 30670166-1dbe-4d47-a40f-9cf0169b887e
 *                     appointmentDate:
 *                       type: string
 *                       format: date-time
 *                       example: 2023-04-13T03:00:00.000Z
 *                     appointmentHour:
 *                       type: string
 *                       format: time
 *                       example: 17:30
 *                     clientId:
 *                       type: string
 *                       format: uuid
 *                       example: c0799d28-d8eb-4419-a019-46b080f24424
 *                     barberId:
 *                       type: string
 *                       format: uuid
 *                       example: c0799d28-d8eb-4419-a019-46b080f24424
 *                     status:
 *                       type: string
 *                       example: notAllow
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2023-04-13T07:56:33.103Z
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2023-04-13T07:56:33.103Z
 *       400:
 *         description: Turno repetido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Este turno ya se encuentra asignado
 *       404:
 *         description: Barbero no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No se encontró ningún barbero con ese ID
 *       500:
 *         description: ID inválida o datos inválidos en el body.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: La sintaxis de entrada no es válida para tipo UUID
 *   get:
 *     summary: Obtener los turnos de un barbero.
 *     description: REQUIERE TOKEN DE AUTENTICACIÓN
 *     tags:
 *       - Appointments
 *     parameters:
 *       - in: path
 *         name: barberId
 *         required: true
 *         description: El ID del barbero para el cual se buscarán los turnos.
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Turnos encontrados exitosamente.
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
 *                   example: Turnos encontrados
 *                 body:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                         example: 30670166-1dbe-4d47-a40f-9cf0169b887e
 *                       appointmentDate:
 *                         type: string
 *                         format: date-time
 *                         example: 2023-04-13T03:00:00.000Z
 *                       appointmentHour:
 *                         type: string
 *                         format: time
 *                         example: 17:30
 *                       clientId:
 *                         type: string
 *                         format: uuid
 *                         example: c0799d28-d8eb-4419-a019-46b080f24424
 *                       barberId:
 *                         type: string
 *                         format: uuid
 *                         example: c0799d28-d8eb-4419-a019-46b080f24424
 *                       status:
 *                         type: string
 *                         example: notAllow
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2023-04-13T07:56:33.103Z
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2023-04-13T07:56:33.103Z
 *       404:
 *         description: Barbero no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No se encontró ningún barbero con ese ID
 *       500:
 *         description: ID inválida.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: La sintaxis de entrada no es válida para tipo UUID
 */

//Endpoints para crear/obtener turnos
router
  .route("/:barberId")
  .post(authenticateUser, apptCtrls.postAppointment)
  .get(authenticateUser, apptCtrls.getAppointments);

/**
 * @swagger
 * /api/v1/appointments/{appointmentId}:
 *   delete:
 *     summary: Elimina un turno de la base de datos
 *     description: REQUIERE TOKEN DE AUTORIZACIÓN
 *     tags:
 *       - Appointments
 *     parameters:
 *       - in: path
 *         name: appointmentId
 *         required: true
 *         description: El ID del turno a eliminar
 *         schema:
 *           type: string
 *           format: uuid
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Turno eliminado exitosamente
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
 *                   example: Turno 30670166-1dbe-4d47-a40f-9cf0169b887e eliminado
 *       401:
 *         description: Token inválido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: El token no es valido
 *       404:
 *         description: Turno no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No se encontro ningun turno con este Id
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Ha ocurrido un error interno del servidor
 *     securitySchemes:
 *       BearerAuth:
 *         type: http
 *         scheme: bearer
 *         bearerFormat: JWT
 */

//Queda pendiente la documentación del endpoint en PATCH

//Endpoints para actualizar/eliminar turnos.
router
  .route("/:appointmentId")
  .patch(authenticateUser, apptCtrls.patchAppointment)
  .delete(authenticateUser, apptCtrls.deleteAppointment);

module.exports = router;
