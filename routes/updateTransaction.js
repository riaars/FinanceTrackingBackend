/**
 * @openapi
 * /updateTransaction:
 *   put:
 *     summary: Update a transaction for authenticated user
 *     tags: [Transaction]
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
 *         description: Successfully updated transaction
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateTransactionSuccessResponse'
 *       500:
 *         description: Server error or failed to update the transaction
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateTransactionErrorResponse'
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Transaction:
 *       type: object
 *       properties:
 *         transaction_id: { type: string, example: "trx4856527773209194" }
 *         date: { type: Date, example: "11/11/2025" }
 *         category: { type: string, example: "Food & Dining" }
 *         type: { type: string, example: "expense" }
 *         amount: { type: string, example: "120" }
 *         detail: { type: string, example: "Lunch with coworker" }
 *
 *     UpdateTransactionSuccessResponse:
 *       type: object
 *       properties:
 *         code: { type: string, example: "UPDATE_TRANSACTION_SUCCESS" }
 *         message: { type: string, example: "Transaction is successfully updated" }
 *         data:
 *             type: object
 *             properties:
 *                  date: { type: Date, example: "11/11/2025" }
 *                  category: { type: string, example: "Food & Dining" }
 *                  type: { type: string, example: "expense" }
 *                  amount: { type: string, example: "120" }
 *                  detail: { type: string, example: "Lunch with coworker" }
 *
 *     UpdateTransactionErrorResponse:
 *       type: object
 *       properties:
 *         code: { type: string, example: "UPDATE_TRANSACTION_ERROR" }
 *         message: { type: string, example: "Error on updating the transaction" }
 */

const express = require("express");
const authJWT = require("../middlewares/authJwt");
const router = express.Router();
const controllers = require("../controllers/transaction");

router.put(
  "/updateTransaction",
  authJWT.verifyToken,
  controllers.updateTransaction
);

module.exports = router;
