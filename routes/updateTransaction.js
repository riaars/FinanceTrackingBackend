const express = require("express");
const authJWT = require("../middlewares/authJwt");
const router = express.Router();
const controllers = require("../controllers/transaction");

router.put("/", authJWT.verifyToken, controllers.updateTransaction);

module.exports = router;
