const jwt = require("jsonwebtoken");
const config = require("../config/auth");

verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];
  if (!token) {
    return res.status(403).send({ message: "No token provided" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    if (Date.now() >= decoded.exp) {
      return res.status(403).send({ auth: false, message: "Token expired" });
    }
    req.userId = decoded.userId;
    next();
  });
};

const authJwt = {
  verifyToken,
};

module.exports = authJwt;
