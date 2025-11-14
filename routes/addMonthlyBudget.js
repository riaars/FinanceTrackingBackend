/**
 * @openapi
 * /addMonthlyBudget:
 *   post:
 *     summary: Add the user monthly budget
 *     tags: [Budget]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Budget'
 *     responses:
 *       200:
 *         description: Successfully on updating the budget
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AddBudgetSuccessResponse'
 *       500:
 *         description: Server error or failed to add the budget
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AddBudgetErrorResponse'
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Budget:
 *       type: object
 *       properties:
 *         budget_per_categories:
 *             type: object
 *             properties:
 *                food_dining: { type: number, example: 100 }
 *                transportation: { type: number, example: 100 }
 *                housing: { type: number, example: 100 }
 *                entertainment: { type: number, example: 100 }
 *                bill_utilities: { type: number, example: 100 }
 *                health_fitness: { type: number, example: 100 }
 *                shopping: { type: number, example: 100 }
 *                education: { type: number, example: 100 }
 *                personal_care: { type: number, example: 100 }
 *                insurance: { type: number, example: 100 }
 *                miscellaneous: { type: number, example: 100 }
 *
 *     AddBudgetSuccessResponse:
 *       type: object
 *       properties:
 *         code: { type: string, example: "ADD_BUDGET_SUCCESS" }
 *         message: { type: string, example: "New transaction is successfully added" }
 *         data:
 *             type: object
 *             properties:
 *                email: {type: string, example: "user@trexo.com"}
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
 *     AddBudgetErrorResponse:
 *       type: object
 *       properties:
 *         code: { type: string, example: "ADD_BUDGET_ERROR" }
 *         message: { type: string, example: "Error on adding the budget" }
 */

const express = require("express");
const authJWT = require("../middlewares/authJwt");
const controllers = require("../controllers/budget");
const router = express.Router();

router.post(
  "/addMonthlyBudget",
  authJWT.verifyToken,
  controllers.addMonthlyBudget
);

module.exports = router;
