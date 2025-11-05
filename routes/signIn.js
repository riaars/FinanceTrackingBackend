/**
 * @openapi
 * /signIn:
 *   post:
 *     summary: Sign in a user with email and password
 *     tags: [SignIn]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Successful sign in
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       400:
 *         description: Unauthorized - User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginNoUserErrorResponse'
 *       401:
 *         description: Invalid password
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginInvalidCrendetialErrorResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginErrorResponse'
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       properties:
 *         email: { type: string, example: "admin" }
 *         password: { type: string, example: "123456" }
 *     LoginResponse:
 *       type: object
 *       properties:
 *         code: { type: string, example: "LOGIN_SUCCESS" }
 *         message: { type: string, example: "Login successful" }
 *         email: { type: string, example: "admin" }
 *         token: { type: string, example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }
 *         username: { type: string, example: "admin" }
 *     LoginErrorResponse:
 *       type: object
 *       properties:
 *         code: { type: string, example: "LOGIN_ERROR" }
 *         message: { type: string, example: "Server error" }
 *     LoginInvalidCrendetialErrorResponse:
 *       type: object
 *       properties:
 *         code: { type: string, example: "INVALID_PASSWORD" }
 *         message: { type: string, example: "Password is incrrect" }
 *     LoginNoUserErrorResponse:
 *       type: object
 *       properties:
 *         code: { type: string, example: "USER_NOT_FOUND" }
 *         message: { type: string, example: "User does not exist in the system" }
 */

const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth");

router.post("/signIn", controller.signin);

module.exports = router;
