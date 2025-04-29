const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth");
const authJwt = require("../middlewares/authJwt");

router.post("/changePassword", authJwt.verifyToken, controller.changePassword);

module.exports = router;
