/**
 * @openapi
 * /getMonthlyBudget:
 *   get:
 *     summary: Get the user monthly budget
 *     tags: [Budget]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Successfully on getting the monthly budget data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetBudgetSuccessResponse'
 *       500:
 *         description: Server error or failed to get monthly the budget
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetBudgetErrorResponse'
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     GetBudgetSuccessResponse:
 *       type: object
 *       properties:
 *         code: { type: string, example: "GET_BUDGET_SUCCESS" }
 *         message: { type: string, example: "Successfully on getting the monthly budget data" }
 *         data:
 *             type: object
 *             properties:
 *                budget_per_categories:
 *                  type: object
 *                  properties:
 *                    food_dining: { type: number, example: 100 }
 *                    transportation: { type: number, example: 100 }
 *                    housing: { type: number, example: 100 }
 *                    entertainment: { type: number, example: 100 }
 *                    bill_utilities: { type: number, example: 100 }
 *                    health_fitness: { type: number, example: 100 }
 *                    shopping: { type: number, example: 100 }
 *                    education: { type: number, example: 100 }
 *                    personal_care: { type: number, example: 100 }
 *                    insurance: { type: number, example: 100 }
 *                    miscellaneous: { type: number, example: 100 }
 *
 *     GetBudgetErrorResponse:
 *       type: object
 *       properties:
 *         code: { type: string, example: "GET_BUDGET_ERROR" }
 *         message: { type: string, example: "Error on getting the user monthly budget" }
 */

const express = require("express");
const authJWT = require("../middlewares/authJwt");
const controllers = require("../controllers/budget");
const router = express.Router();

router.get(
  "/getMonthlyBudget",
  authJWT.verifyToken,
  controllers.getMonthlyBudget
);

module.exports = router;
