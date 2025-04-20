var jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../models");
const User = db.user;
const { sendVerificationEmail } = require("../utils/sendVerificationEmail");
const dotenv = require("dotenv");
dotenv.config();

/* Signup controller  */
const signup = async (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    isVerified: false,
  });

  try {
    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const verifyUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

    await sendVerificationEmail(user.email, user.username, verifyUrl);
    res.status(200).json({
      message: "Signup successful, please check email to verify",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error on registering user" });
  }
};

const verifyEmail = async (req, res) => {
  const { token } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    const user = await User.findById(req.user.userId).select("-password");

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    if (user.isVerified) {
      return res.status(200).send({ message: "User is already verified" });
    }
    // update the verified status
    user.isVerified = true;
    await user.save();
    return res.status(200).send({ message: "Email verified successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Invalid or token is expired" });
  }
};

/* Signin controller */
const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User does not exist" });

    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).json({
        message: "Invalid password",
        token: null,
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    });

    res.json({
      message: "Login successful",
      email,
      token,
      username: user.username,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const signout = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  res.clearCookie(accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
  });

  res.json({ message: "Logged out successfully" });

  next();
};

module.exports = {
  signup: signup,
  signin: signin,
  signout: signout,
  verifyEmail: verifyEmail,
};
