const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth");

router.post("/logout", controller.signout);

module.exports = router;
