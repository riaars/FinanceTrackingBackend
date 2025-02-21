const db = require("../models");
const User = db.user;

checkDuplicateUsernameEmail = (req, res, next) => {
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (user) {
        res
          .status(400)
          .send({ message: "Failed! Email is already registered!" });
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
};

const verifySignUp = {
  checkDuplicateUsernameEmail,
};

module.exports = verifySignUp;
