const express = require("express");
const authJWT = require("../middlewares/authJwt");
const handleInputExpense = require("../services/database/handleInputExpense");
const router = express.Router();

router.post("/", authJWT.verifyToken, async (req, res) => {
  const request = {
    category: req.body.category,
    type: req.body.type,
    detail: req.body.detail,
    amount: req.body.amount,
    email: req.user.email,
  };

  try {
    const result = await handleInputExpense.updateTransaction(
      { transaction_id: req.body.transaction_id },
      request
    );
    if (result) {
      res.json({
        transaction_id: result.transaction_id,
        ...request,
      });
    }
  } catch (error) {
    res.json({ message: "Error on updating the transaction" });
    console.log(error);
  }
});

module.exports = router;
