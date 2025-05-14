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
