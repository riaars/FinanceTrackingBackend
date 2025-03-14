const handleInputExpense = require("../services/database/handleInputExpense");

const addTransaction = async (req, res) => {
  const request = {
    date: req.body.date,
    category: req.body.category,
    type: req.body.type,
    detail: req.body.detail,
    amount: req.body.amount,
    email: req.user.email,
  };

  try {
    const result = await handleInputExpense.addNewExpense(request);
    if (result) {
      res.json({
        transaction_id: result.transaction_id,
        ...request,
      });
    }
  } catch (error) {
    res.json({ message: "Error on adding new transaction" });
    console.log(error);
  }
};

const deleteTransaction = async (req, res) => {
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
};

const getAllTransactions = async (req, res) => {
  try {
    const result = await handleInputExpense.getAllTransactions({
      email: req.user.email,
    });
    if (result) {
      res.json(result);
    }
  } catch (error) {
    res.json({ message: "Error on getting all transactions" });
    console.log(error);
  }
};

const updateTransaction = async (req, res) => {
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
};

module.exports = {
  addTransaction: addTransaction,
  deleteTransaction: deleteTransaction,
  getAllTransactions: getAllTransactions,
  updateTransaction: updateTransaction,
};
