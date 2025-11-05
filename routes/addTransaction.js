/**
 * @openapi
 * /addTransaction:
 *   post:
 *     summary: Sign in a user with email and password
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
 *         description: Successfully added transaction
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AddTransactionSuccessResponse'
 *       500:
 *         description: Server error or failed to add transaction
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AddTransactionErrorResponse'
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Transaction:
 *       type: object
 *       properties:
 *         date: { type: Date, example: "11/11/2025" }
 *         category: { type: string, example: "Food & Dining" }
 *         type: { type: string, example: "expense" }
 *         amount: { type: string, example: "120" }
 *         detail: { type: string, example: "Lunch with coworker" }
 *
 *     AddTransactionSuccessResponse:
 *       type: object
 *       properties:
 *         code: { type: string, example: "ADD_TRANSACTION_SUCCESS" }
 *         message: { type: string, example: "New transaction is successfully added" }
 *         data:
 *             type: object
 *             properties:
 *                  date: { type: Date, example: "11/11/2025" }
 *                  category: { type: string, example: "Food & Dining" }
 *                  type: { type: string, example: "expense" }
 *                  amount: { type: string, example: "120" }
 *                  detail: { type: string, example: "Lunch with coworker" }
 *     AddTransactionErrorResponse:
 *       type: object
 *       properties:
 *         code: { type: string, example: "ADD_TRANSACTION_ERROR" }
 *         message: { type: string, example: "Error on adding the transaction" }
 */

const express = require("express");
const authJWT = require("../middlewares/authJwt");
const controllers = require("../controllers/transaction");
const router = express.Router();

router.post("/addTransaction", authJWT.verifyToken, controllers.addTransaction);

module.exports = router;
