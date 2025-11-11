/**
 * @openapi
 * /getActiveRecurrings:
 *   get:
 *     summary: Get all active recurring transactions plan for authenticated user
 *     tags: [Recurring]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Successfully get recurring plans
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetRecurringsSuccessResponse'
 *       500:
 *         description: Server error or failed to fetch list of recurrings
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetRecurringsErrorResponse'
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     GetRecurringsSuccessResponse:
 *       type: object
 *       properties:
 *         code: { type: string, example: "GET_ACTIVE_RECURRINGS_SUCCESS" }
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
 *                  nextDate: {type:string, example: "11-12-2025"}
 *                  interval: {type: string, example: "monthly"}
 *     GetRecurringsErrorResponse:
 *       type: object
 *       properties:
 *         code: { type: string, example: "GET_ACTIVE_RECURRINGS_ERROR" }
 *         message: { type: string, example: "Error on getting all active recurrings" }
 */
const express = require("express");
const authJWT = require("../middlewares/authJwt");
const controllers = require("../controllers/recurring");
const router = express.Router();

router.get(
  "/getActiveRecurrings",
  authJWT.verifyToken,
  controllers.getActiveRecurrings
);

module.exports = router;
