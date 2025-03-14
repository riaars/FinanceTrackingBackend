const express = require("express");
const authJWT = require("../middlewares/authJwt");
const router = express.Router();
const controllers = require("../controllers/transaction");

router.post("/", authJWT.verifyToken, controllers.updateTransaction);

module.exports = router;
