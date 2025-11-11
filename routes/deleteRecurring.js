const express = require("express");
const authJWT = require("../middlewares/authJwt");
const controllers = require("../controllers/recurring");

const router = express.Router();

router.delete(
  "/deleteRecurring",
  authJWT.verifyToken,
  controllers.deleteRecurring
);

module.exports = router;
