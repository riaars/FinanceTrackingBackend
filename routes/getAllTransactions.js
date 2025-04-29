const express = require("express");
const authJWT = require("../middlewares/authJwt");
const router = express.Router();
const controllers = require("../controllers/transaction");

router.get(
  "/getAllTransactions",
  authJWT.verifyToken,
  controllers.getAllTransactions
);

module.exports = router;
