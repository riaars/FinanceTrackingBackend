const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config();

verifyToken = (req, res, next) => {
  let token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res
      .status(403)
      .send({ message: "Access denied. No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

const authJwt = {
  verifyToken,
};

module.exports = authJwt;
