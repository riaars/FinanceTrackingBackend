/**
 * @openapi
 * /updateRecurring:
 *   put:
 *     summary: Update a recurring plan for authenticated user
 *     tags: [Recurring]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Recurring'
 *     responses:
 *       200:
 *         description: Successfully updated recurring plan
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateRecurringSuccessResponse'
 *       500:
 *         description: Server error or failed to update the recurring
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateRecurringErrorResponse'
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Recurring:
 *       type: object
 *       properties:
 *         transaction_id: { type: string, example: "trx4856527773209194" }
 *         nextDate: { type: Date, example: "11/11/2025" }
 *         interval: { type: string, example: "monthly" }
 *
 *     UpdateRecurringSuccessResponse:
 *       type: object
 *       properties:
 *         code: { type: string, example: "UPDATE_RECURRING_SUCCESS" }
 *         message: { type: string, example: "Transaction is successfully updated" }
 *         data:
 *             type: object
 *             properties:
 *                  date: { type: Date, example: "11/11/2025" }
 *                  category: { type: string, example: "Food & Dining" }
 *                  type: { type: string, example: "expense" }
 *                  amount: { type: string, example: "120" }
 *                  detail: { type: string, example: "Lunch with coworker" }
 *                  nextDate: { type: Date, example: "11/11/2025" }
 *                  interval: { type: string, example: "monthly" }
 *
 *     UpdateRecurringErrorResponse:
 *       type: object
 *       properties:
 *         code: { type: string, example: "UPDATE_RECURRING_ERROR" }
 *         message: { type: string, example: "Error on updating the recurring plan" }
 */

const express = require("express");
const authJWT = require("../middlewares/authJwt");
const router = express.Router();
const controllers = require("../controllers/recurring");

router.put(
  "/updateRecurring",
  authJWT.verifyToken,
  controllers.updateRecurring
);

module.exports = router;
