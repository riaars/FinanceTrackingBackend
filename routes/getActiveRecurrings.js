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
