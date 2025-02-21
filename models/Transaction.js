const mongoose = require("mongoose");

const Transaction = mongoose.model(
  "Transaction",
  new mongoose.Schema({
    transaction_id: String,
    category: String,
    type: String,
    detail: String,
    amount: Number,
    date: { type: Date, default: Date.now },
  })
);

module.exports = Transaction;
