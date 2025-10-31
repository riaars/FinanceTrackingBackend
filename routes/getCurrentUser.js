const express = require("express");
const authJWT = require("../middlewares/authJwt");
const controllers = require("../controllers/auth");
const router = express.Router();

router.get("/getCurrentUser", authJWT.verifyToken, controllers.getCurrentUser);

module.exports = router;
