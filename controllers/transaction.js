const Transaction = require("../models/Transaction");
const { v4: uuidv4 } = require("uuid");
const { addInterval } = require("../utils/helpers");

const addTransaction = async (req, res) => {
  const request = {
    transaction_id: uuidv4(),
    date: req.body.date ? new Date(req.body.date) : new Date(),
    category: req.body.category,
    type: req.body.type,
    detail: req.body.detail,
    amount: req.body.amount,
    email: req.user.email,
    isRecurring: req.body.isRecurring || false,
  };

  if (request.isRecurring) {
    request.interval = req.body.interval;
    request.timezone = req.body.timezone || "UTC";
    request.nextDate = req.body.nextDate
      ? new Date(req.body.nextDate)
      : addInterval(request.date, request.interval, request.timezone);
  }

  try {
    const result = await new Transaction(request).save();
    if (result) {
      res.status(200).json({
        code: "ADD_TRANSACTION_SUCCESS",
        message: "New transaction is added",
        data: request,
      });
    }
  } catch (error) {
    res.status(500).json({
      code: "ADD_TRANSACTION_ERROR",
      message: "Error on adding new transaction",
    });
    console.log(error);
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const result = await Transaction.deleteOne({
      transaction_id: req.body.transaction_id,
    });
    if (result) {
      res.status(200).json({
        code: "DELETE_TRANSACTION_SUCCESS",
        message: `Transaction with id ${req.body.transaction_id} is successfully deleted`,
      });
    }
  } catch (error) {
    res.status(500).json({
      code: "DELETE_TRANSACTION_ERROR",
      message: "Error on deleting the transaction",
    });
    console.log(error);
  }
};

const getAllTransactions = async (req, res) => {
  try {
    const result = await Transaction.find({ email: req.user.email }).sort({
      date: -1,
      createdAt: -1,
    });
    if (result) {
      res.status(200).json({
        code: "GET_TRANSACTIONS_SUCCESS",
        message: "Successfully fetched the transactions",
        data: result,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: "GET_TRANSACTIONS_ERROR",
      message: "Error on getting all transactions",
    });
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
    const result = await Transaction.updateOne(
      { transaction_id: req.body.transaction_id },
      request
    );
    if (result) {
      res.status(200).json({
        code: "UPDATE_TRANSACTION_SUCCESS",
        message: "Transaction is successfully updated",
        data: {
          transaction_id: result.transaction_id,
          ...request,
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      code: "UPDATE_TRANSACTION_ERROR",
      message: "Error on updating the transaction",
    });
    console.log(error);
  }
};

module.exports = {
  addTransaction: addTransaction,
  deleteTransaction: deleteTransaction,
  getAllTransactions: getAllTransactions,
  updateTransaction: updateTransaction,
};
