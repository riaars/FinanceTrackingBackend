const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameEmail = (req, res, next) => {
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (user) {
        res.status(400).send({ message: "Failed! Username is already exist!" });
        return;
      }
      User.findOne({
        email: req.body.email,
      })
        .then((user) => {
          if (user) {
            res
              .status(400)
              .send({ message: "Failed! Email is already exist!" });
            return;
          }

          next();
        })
        .catch((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
        });
    })
    .catch((err) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
    });
};

const verifySignUp = {
  checkDuplicateUsernameEmail,
};

module.exports = verifySignUp;
