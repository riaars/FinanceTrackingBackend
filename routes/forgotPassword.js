const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth");

router.post("/forgotPassword", controller.forgotPassword);

module.exports = router;
