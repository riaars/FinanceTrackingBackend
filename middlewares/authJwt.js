const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
const User = require("../models/User");
dotenv.config();

verifyToken = async (req, res, next) => {
  let token = req.cookies.accessToken;
  if (!token) {
    return res
      .status(403)
      .send({ message: "Access denied. No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    //find user info

    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

const authJwt = {
  verifyToken,
};

module.exports = authJwt;
