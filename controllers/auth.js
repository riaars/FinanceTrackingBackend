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
      code: "SIGNUP_SUCCESS",
      message: "Signup successful, please check email to verify",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ code: "SIGNUP_ERROR", message: "Error on registering user" });
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
      return res
        .status(404)
        .send({ code: "USER_NOT_REGISTERED", message: "User not found" });
    }
    if (user.isVerified) {
      return res.status(200).send({
        code: "USER_IS_ALREADY_VERIFIED",
        message: "User is already verified",
      });
    }
    // update the verified status
    user.isVerified = true;
    await user.save();
    await sendConfirmationEmail(email, username);
    return res.status(200).send({
      code: "VERIFY_USER_SUCCESS",
      message: "Email verified successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      code: "VERIFY_USER_ERROR",
      message: "Invalid or token is expired",
    });
  }
};

/* Signin controller */
const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ code: "USER_NOT_FOUND", message: "User does not exist" });

    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).json({
        code: "INVALID_PASSWORD",
        message: "Password is incorrect",
        token: null,
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const isProd = process.env.NODE_ENV === "production";
    const isSecure = isProd && process.env.FORCE_HTTPS === "true";

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: isSecure, // stays false unless FORCE_HTTPS=true
      sameSite: "Lax",
    });

    res.status(200).json({
      code: "LOGIN_SUCCESS",
      message: "Login successful",
      email,
      token,
      username: user.username,
    });
  } catch (error) {
    res.status(500).json({
      code: "LOGIN_ERROR",
      message: "Server error",
      error: error.message,
    });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password"); // exclude password
    if (!user) {
      return res
        .status(404)
        .json({ code: "USER_NOT_FOUND", message: "User not found" });
    }
    res.json({
      code: "GET_CURRENT_USER_SUCCESS",
      data: user,
    });
  } catch (err) {
    console.error("Error in /me:", err);
    res
      .status(500)
      .json({ code: "GET_CUURENT_USER_ERROR", message: "Server error" });
  }
};

const signout = async (req, res, next) => {
  const COOKIE_NAME = "accessToken";
  const common = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
  };

  res.clearCookie(COOKIE_NAME, common);
  res.set("Cache-Control", "no-store");

  res
    .status(200)
    .json({ code: "LOGOUT_SUCCESS", message: "Logged out successful" });

  next();
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user)
    return res.status(404).send({
      code: "USER_NOT_FOUND",
      message: "User is not registered in the system",
    });
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });

  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

  try {
    await sendResetPasswordRequestEmail(user.email, resetUrl);

    return res.status(200).send({
      code: "RESET_LINK_SENT",
      message: "The reset link is sent to the email",
    });
  } catch (error) {
    return res.status(500).send({
      code: "SERVER_ERROR",
      message: "Failed to send reset password link to the email",
    });
  }
};

const resetPassword = async (req, res) => {
  const { password, token } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    const user = await User.findById(req.user.userId);
    const { email, username } = user;

    if (!user) {
      return res
        .status(404)
        .send({ code: "USER_NOT_FOUND", message: "User not found" });
    }

    const comparewithOldPassword = bcrypt.compareSync(password, user.password);
    if (comparewithOldPassword) {
      return res.status(500).send({
        code: "SAME_AS_OLD_PASSWORD",
        message: "Password can not be the same as your previous one.",
      });
    }
    // update the password
    user.password = bcrypt.hashSync(password, 8);
    await user.save();
    await sendResetPasswordSuccessfulEmail(email, username);
    return res.status(200).send({
      code: "PASSWORD_RESET_SUCCESS",
      message: "Password has been successfully reset",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      code: "SERVER_ERROR",
      message: "Server error or token expired",
    });
  }
};

const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const { email, username } = req.user;
  const hashOldPassword = bcrypt.hashSync(oldPassword, 8);

  try {
    const user = await User.findById(req.user._id);

    const comparewithOldPassword = bcrypt.compareSync(
      newPassword,
      hashOldPassword
    );

    if (comparewithOldPassword) {
      return res.status(400).send({
        code: "SAME_AS_OLD_PASSWORD",
        message: "Password can not be the same as your previous one.",
      });
    }
    // update the password
    user.password = bcrypt.hashSync(newPassword, 8);
    await user.save();
    await sendChangePasswordSuccessfulEmail(email, username);
    return res.status(200).send({
      code: "PASSWORD_CHANGE_SUCCESS",
      message: "Password has been successfully updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      code: "INVALID_OR_EXPIRED_TOKEN",
      message: "Invalid or token is expired",
    });
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
