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
