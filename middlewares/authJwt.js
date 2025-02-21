const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config();

verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];
  if (!token) {
    return res.status(403).send({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
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
