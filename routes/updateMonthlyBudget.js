const express = require("express");
const authJWT = require("../middlewares/authJwt");
const controllers = require("../controllers/budget");
const router = express.Router();

router.put(
  "/updateMonthlyBudget",
  authJWT.verifyToken,
  controllers.updateMonthlyBudget
);

module.exports = router;
