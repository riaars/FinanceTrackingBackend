/**
 * @openapi
 * /deleteTransaction:
 *   delete:
 *     summary: Delete a transaction for authenticated user
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
 *         description: Successfully deleted transaction
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteTransactionSuccessResponse'
 *       500:
 *         description: Server error or failed to delete transaction
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteTransactionErrorResponse'
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Transaction:
 *       type: object
 *       properties:
 *         transaction_id: { type: string, example: "trx4856527773209194" }
 *     DeleteTransactionSuccessResponse:
 *       type: object
 *       properties:
 *         code: { type: string, example: "DELETE_TRANSACTION_SUCCESS" }
 *         message: { type: string, example: "Transaction with id trx4856527773209194 is successfully deleted`" }
 *     DeleteTransactionErrorResponse:
 *       type: object
 *       properties:
 *         code: { type: string, example: "DELETE_TRANSACTION_ERROR" }
 *         message: { type: string, example: "Error on deleting the transaction" }
 */

const express = require("express");
const authJWT = require("../middlewares/authJwt");
const controllers = require("../controllers/transaction");

const router = express.Router();

router.delete(
  "/deleteTransaction",
  authJWT.verifyToken,
  controllers.deleteTransaction
);

module.exports = router;
