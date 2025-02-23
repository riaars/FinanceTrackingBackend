const express = require("express");
const authJWT = require("../middlewares/authJwt");
const handleInputExpense = require("../services/database/handleInputExpense");
const router = express.Router();

router.get("/", authJWT.verifyToken, async (req, res) => {
  try {
    const result = await handleInputExpense.getAllTransactions();
    if (result) {
      res.json(result);
    }
  } catch (error) {
    res.json({ message: "Error on getting all transactions" });
    console.log(error);
  }
});

module.exports = router;
