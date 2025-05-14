const express = require("express");
const authJWT = require("../middlewares/authJwt");
const controllers = require("../controllers/savingPlan");
const router = express.Router();

router.get("/getSavingPlans", authJWT.verifyToken, controllers.getSavingPlans);

module.exports = router;
