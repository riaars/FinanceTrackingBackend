/**
 * @openapi
 * /signUp:
 *   post:
 *     summary: Sign up a new user with username, email, and password
 *     tags: [SignUp]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignUp'
 *     responses:
 *       200:
 *         description: Successful registering user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SignUpSuccessResponse'
 *       400:
 *         description: Email is already registered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SignUpUserExistErrorResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SignUpErrorResponse'
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     SignUp:
 *       type: object
 *       properties:
 *         username: { type: string, example: "admin" }
 *         email: { type: string, example: "admin@trexo.com" }
 *         password: { type: string, example: "123456" }
 *         repassword: { type: string, example: "123456" }
 *     SignUpSuccessResponse:
 *       type: object
 *       properties:
 *         code: { type: string, example: "SIGNUP_SUCCESS" }
 *         message: { type: string, example: "Signup successful, please check email to verify" }
 *     SignUpUserExistErrorResponse:
 *       type: object
 *       properties:
 *         code: { type: string, example: "SIGNUP_ERROR_USER_EXIST" }
 *         message: { type: string, example: "Email is already registered" }
 *     SignUpErrorResponse:
 *       type: object
 *       properties:
 *         code: { type: string, example: "SIGNUP_ERROR" }
 *         message: { type: string, example: "Error on registering user" }
 */
const express = require("express");
const router = express.Router();
const verifySignUp = require("../middlewares/verifySignUp");
const controller = require("../controllers/auth");

router.post(
  "/signUp",
  [verifySignUp.checkDuplicateUsernameEmail],
  controller.signup
);

module.exports = router;
