/**
 * @openapi
 * /changePassword:
 *   post:
 *     summary: Change password for authenticated user
 *     tags: [ChangePassword]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChangePassword'
 *     responses:
 *       200:
 *         description: Successful changing password
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChangePasswordSuccessResponse'
 *       400:
 *         description: Same as old password
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChangePasswordSameAsOldErrorResponse'
 *       500:
 *         description: Server error or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChangePasswordErrorResponse'
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     ChangePassword:
 *       type: object
 *       properties:
 *         oldPassword: { type: string, example: "123456" }
 *         newPassword: { type: string, example: "123456" }
 *     ChangePasswordSuccessResponse:
 *       type: object
 *       properties:
 *         code: { type: string, example: "PASSWORD_CHANGE_SUCCESS" }
 *         message: { type: string, example: "Password has been successfully updated" }
 *     ChangePasswordSameAsOldErrorResponse:
 *       type: object
 *       properties:
 *         code: { type: string, example: "SAME_AS_OLD_PASSWORD" }
 *         message: { type: string, example: "Password can not be the same as your previous one." }
 *     ChangePasswordErrorResponse:
 *       type: object
 *       properties:
 *         code: { type: string, example: "INVALID_OR_EXPIRED_TOKEN" }
 *         message: { type: string, example: "Invalid or token is expired" }
 */

const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth");
const authJwt = require("../middlewares/authJwt");

router.post("/changePassword", authJwt.verifyToken, controller.changePassword);

module.exports = router;
