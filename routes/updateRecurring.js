const express = require("express");
const authJWT = require("../middlewares/authJwt");
const router = express.Router();
const controllers = require("../controllers/recurring");

router.put(
  "/updateRecurring",
  authJWT.verifyToken,
  controllers.updateRecurring
);

module.exports = router;
