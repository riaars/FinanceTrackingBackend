/**
 * @openapi
 * /deleteRecurring:
 *   delete:
 *     summary: Delete a recurring plan for authenticated user
 *     tags: [Recurring]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transaction'
 *     responses:
 *       200:
 *         description: Successfully deleted recurring plan
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteRecurringSuccessResponse'
 *       500:
 *         description: Server error or failed to delete recurring plan
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteRecurringErrorResponse'
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Transaction:
 *       type: object
 *       properties:
 *         transaction_id: { type: string, example: "trx4856527773209194" }
 *     DeleteRecurringSuccessResponse:
 *       type: object
 *       properties:
 *         code: { type: string, example: "DELETE_RECURRING_SUCCESS" }
 *         message: { type: string, example: "Successfully deleted recurring transaction" }
 *     DeleteRecurringErrorResponse:
 *       type: object
 *       properties:
 *         code: { type: string, example: "DELETE_RECURRING_ERROR" }
 *         message: { type: string, example: "Error on deleting the recurring plan" }
 */

const express = require("express");
const authJWT = require("../middlewares/authJwt");
const controllers = require("../controllers/recurring");

const router = express.Router();

router.delete(
  "/deleteRecurring",
  authJWT.verifyToken,
  controllers.deleteRecurring
);

module.exports = router;
