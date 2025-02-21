const config = require("../config/auth");
const db = require("../models");
const User = db.user;
const Role = db.role;

const dotenv = require("dotenv");
dotenv.config();

var jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const signup = async (req, res) => {
  const user = new User({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  try {
    await user.save();
    res.status(201).json({ message: "User save successfully" });
    return;
  } catch (error) {
    console.log("Error registering the user");
    res.status(500).json({ message: "Error on registering user" });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).json({
        accessToken: null,
        message: "Invalid email or password!",
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }

  // User.findOne({
  //   email: req.body.email,
  // })
  //   .populate("roles", "-___v")
  //   .then((user) => {
  //     if (err) {
  //       res.status(500).send({ message: err });
  //       return;
  //     }
  //     if (!user) {
  //       return res.status(404).send({ message: "User not found" });
  //     }

  //     var passwordIsValid = bcrypt.compareSync(
  //       req.body.password,
  //       user.password
  //     );

  //     if (!passwordIsValid) {
  //       return res.status(401).send({
  //         accessToken: null,
  //         message: "Invalid Password!",
  //       });
  //     }

  //     const expirationTime = 86400;
  //     var dateNow = new Date();
  //     var calculatedExpiresIn =
  //       dateNow.getTime() +
  //       expirationTime * 100 -
  //       (dateNow.getTime() - dateNow.getMiliseconds()) / 1000;
  //     var token = jwt.sign({ id: user.id }, config.secret, {
  //       expiresIn: calculatedExpiresIn,
  //     });

  //     var authorities = [];
  //     for (let i = 0; i < user.roles.length; i++) {
  //       authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
  //     }
  //     res.status(200).send({
  //       id: user._id,
  //       username: user.username,
  //       email: user.email,
  //       roles: authorities,
  //       accessToken: token,
  //     });
  //   })
  //   .catch((err) => {
  //     if (err) {
  //       res.status(500).send({ message: err });
  //     }
  //   });
};

module.exports = {
  signup: signup,
  signin: signin,
};
