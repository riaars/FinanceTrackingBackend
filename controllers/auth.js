var jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../models");
const User = db.user;
const {
  sendVerificationEmail,
  sendConfirmationEmail,
  sendResetPasswordSuccessfulEmail,
  sendResetPasswordRequestEmail,
  sendChangePasswordSuccessfulEmail,
} = require("../utils/emails");
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
    const { email, username } = user;

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    if (user.isVerified) {
      return res.status(200).send({ message: "User is already verified" });
    }
    // update the verified status
    user.isVerified = true;
    await user.save();
    await sendConfirmationEmail(email, username);
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

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password"); // exclude password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error("Error in /me:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const signout = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const COOKIE_NAME = "accessToken";
  const common = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
  };

  res.clearCookie(COOKIE_NAME, common);
  res.set("Cache-Control", "no-store");

  res.json({ message: "Logged out successfully" });

  next();
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(404).send({ message: "User not found" });
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });

  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

  await sendResetPasswordRequestEmail(user.email, resetUrl);

  return res.status(200).send({
    message: "Reset link send to email",
  });
};

const resetPassword = async (req, res) => {
  const { password, token } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    const user = await User.findById(req.user.userId);
    const { email, username } = user;

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const comparewithOldPassword = bcrypt.compareSync(password, user.password);
    if (comparewithOldPassword) {
      return res.status(500).send({
        message: "Password can not be the same as your previous one.",
      });
    }
    // update the password
    user.password = bcrypt.hashSync(password, 8);
    await user.save();
    await sendResetPasswordSuccessfulEmail(email, username);
    return res
      .status(200)
      .send({ message: "Password has been successfully reset" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Invalid or token is expired" });
  }
};

const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const { email, username } = req.user;

  try {
    const user = await User.findById(req.user._id);

    const comparewithOldPassword = bcrypt.compareSync(oldPassword, newPassword);
    if (comparewithOldPassword) {
      return res.status(500).send({
        message: "Password can not be the same as your previous one.",
      });
    }
    // update the password
    user.password = bcrypt.hashSync(newPassword, 8);
    await user.save();
    await sendChangePasswordSuccessfulEmail(email, username);
    return res
      .status(200)
      .send({ message: "Password has been successfully updated" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Invalid or token is expired" });
  }
};

module.exports = {
  signup: signup,
  signin: signin,
  signout: signout,
  verifyEmail: verifyEmail,
  forgotPassword: forgotPassword,
  resetPassword: resetPassword,
  changePassword: changePassword,
  getCurrentUser: getCurrentUser,
};
