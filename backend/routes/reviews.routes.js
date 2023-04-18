const router = require("express").Router();
const reviewCtrls = require("../controllers/reviews.controllers");
const { authenticateUser, authorizeByRole } = require("../middlewares");

/**
 * @openapi
 * /api/v1/reviews/{id}:
 *   get:
 *     tags:
 *       - Reviews
 *     summary: Crear reseña y calificacion a un barbero.
 *     description: Este endpoint crea una reseña a un barbero. Para que funcione, se requiere un token de autorización (Authorization Bearer < token >)
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
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: Reseña creada de manera exitosa
 *                 body:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 9430383e-e7d0-48a0-b974-50e5220176ff
 *                     title:
 *                       type: string
 *                       example: Muy bien el servicio
 *                     rating:
 *                       type: integer
 *                       example: 5
 *                     comment:
 *                       type: string
 *                       example: Buen barbero
 *                     clientId:
 *                       type: string
 *                       example: 1246a6b8-0e6b-4b6f-be5b-8ab9c7feb63b
 *                     barberId:
 *                       type: string
 *                       example: 24dd68ab-4211-4187-9f1f-3b6799f8bae1
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
 *                   example: No hay un token presente
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No se encontro ningun barbero con este id
 */
router.post("/:barberId", authenticateUser, reviewCtrls.postReview);
router.get("/:barberId", reviewCtrls.getReviewsBarber);
router.get("/review/:reviewId", reviewCtrls.getSingleReview);
router.delete(
  "/review/:reviewId",
  [authenticateUser, authorizeByRole("admin")],
  reviewCtrls.deleteSingleReview
);

module.exports = router;
