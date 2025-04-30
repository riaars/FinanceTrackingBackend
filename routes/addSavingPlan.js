const express = require("express");
const authJWT = require("../middlewares/authJwt");
const controllers = require("../controllers/savingPlan");
const router = express.Router();

router.post("/addSavingPlan", authJWT.verifyToken, controllers.addSavingPlan);

module.exports = router;
