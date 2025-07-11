const express = require("express");
const authJWT = require("../middlewares/authJwt");
const controllers = require("../controllers/transaction");
const router = express.Router();

router.post("/addTransaction", authJWT.verifyToken, controllers.addTransaction);

module.exports = router;
