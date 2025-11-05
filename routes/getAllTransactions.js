/**
 * @openapi
 * /getAllTransactions:
 *   get:
 *     summary: Get all transactions for authenticated user
 *     tags: [Transaction]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Successfully added transaction
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetTransactionsSuccessResponse'
 *       500:
 *         description: Server error or failed to fetch list of transaction
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetTransactionsErrorResponse'
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     GetTransactionsSuccessResponse:
 *       type: object
 *       properties:
 *         code: { type: string, example: "GET_TRANSACTIONS_SUCCESS" }
 *         message: { type: string, example: "Successfully fetched the transactions" }
 *         data:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *                  date: { type: Date, example: "11/11/2025" }
 *                  category: { type: string, example: "Food & Dining" }
 *                  type: { type: string, example: "expense" }
 *                  amount: { type: string, example: "120" }
 *                  detail: { type: string, example: "Lunch with coworker" }
 *     GetTransactionsErrorResponse:
 *       type: object
 *       properties:
 *         code: { type: string, example: "GET_TRANSACTIONS_ERROR" }
 *         message: { type: string, example: "Error on getting all transactions" }
 */

const express = require("express");
const authJWT = require("../middlewares/authJwt");
const router = express.Router();
const controllers = require("../controllers/transaction");

router.get(
  "/getAllTransactions",
  authJWT.verifyToken,
  controllers.getAllTransactions
);

module.exports = router;
