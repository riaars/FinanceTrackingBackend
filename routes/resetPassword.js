const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth");

router.post("/resetPassword", controller.resetPassword);

module.exports = router;
