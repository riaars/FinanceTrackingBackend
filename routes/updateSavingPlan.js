const express = require("express");
const authJWT = require("../middlewares/authJwt");
const controllers = require("../controllers/savingPlan");
const router = express.Router();

router.put(
  "/updateSavingPlan",
  authJWT.verifyToken,
  controllers.updateSavingPlan
);

module.exports = router;
