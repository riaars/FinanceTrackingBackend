/**
 * @openapi
 * /forgotPassword:
 *   post:
 *     summary: Send reset password link to the user's email
 *     tags: [ForgotPassword]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ForgotPassword'
 *     responses:
 *       200:
 *         description: Successful sent the link to reset password
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ForgotPasswordSuccessResponse'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserNotFoundErrorResponse'
 *       500:
 *         description: Server error or failed to send email
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ForgotPasswordErrorResponse'
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     ForgotPassword:
 *       type: object
 *       properties:
 *         email: { type: string, example: "user@trexo.com" }
 *     ForgotPasswordSuccessResponse:
 *       type: object
 *       properties:
 *         code: { type: string, example: "RESET_LINK_SENT" }
 *         message: { type: string, example: "The reset link is sent to the email" }
 *     UserNotFoundErrorResponse:
 *       type: object
 *       properties:
 *         code: { type: string, example: "USER_NOT_FOUND" }
 *         message: { type: string, example: "User is not registered in the system" }
 *     ForgotPasswordErrorResponse:
 *       type: object
 *       properties:
 *         code: { type: string, example: "SERVER_ERROR" }
 *         message: { type: string, example: "Failed to send reset password link to the email" }
 */
const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth");

router.post("/forgotPassword", controller.forgotPassword);

module.exports = router;
