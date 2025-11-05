/**
 * @openapi
 * /resetPassword:
 *   post:
 *     summary: Reset password for unauthenticated user using reset link
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetPassword'
 *     responses:
 *       200:
 *         description: Successful reset the password
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResetPasswordSuccessResponse'
 *       400:
 *         description: Same as old password
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SameAsOldPasswordErrorResponse'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserNotFoundErrorResponse'
 *       500:
 *         description: Server error or token exired
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResetPasswordErrorResponse'
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     ResetPassword:
 *       type: object
 *       properties:
 *         password: { type: string, example: "123456" }
 *     ResetPasswordSuccessResponse:
 *       type: object
 *       properties:
 *         code: { type: string, example: "PASSWORD_RESET_SUCCESS" }
 *         message: { type: string, example: "Password has been successfully reset" }
 *     SameAsOldPasswordErrorResponse:
 *       type: object
 *       properties:
 *         code: { type: string, example: "SAME_AS_OLD_PASSWORD" }
 *         message: { type: string, example: "Password can not be the same as your previous one." }
 *     ResetPasswordErrorResponse:
 *       type: object
 *       properties:
 *         code: { type: string, example: "SERVER_ERROR" }
 *         message: { type: string, example: "Server error or token expired" }
 */
const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth");

router.post("/resetPassword", controller.resetPassword);

module.exports = router;
