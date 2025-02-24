const express = require("express");
const authJWT = require("../middlewares/authJwt");
const handleInputExpense = require("../services/database/handleInputExpense");
const router = express.Router();

router.post("/", authJWT.verifyToken, async (req, res) => {
  try {
    const result = await handleInputExpense.deleteTransaction({
      transaction_id: req.body.transaction_id,
    });
    if (result) {
      res.json({
        message: `Transaction with id ${req.body.transaction_id} is successfully deleted`,
      });
    }
  } catch (error) {
    res.json({ message: "Error on deleting the transaction" });
    console.log(error);
  }
});

module.exports = router;
