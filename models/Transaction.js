const mongoose = require("mongoose");

const Transaction = mongoose.model(
  "Transaction",
  new mongoose.Schema(
    {
      transaction_id: String,
      email: String,
      category: String,
      type: { type: String, enum: ["Income", "Expense"] },
      detail: String,
      amount: Number,
      date: { type: Date, default: Date.now },
      isRecurring: { type: Boolean, default: false },
      interval: {
        type: String,
        enum: ["daily", "weekly", "monthly", "yearly"],
      },
      nextDate: { type: Date },
      timezone: { type: String, default: "UTC" },
    },
    { timestamps: true }
  ).index({ isRecurring: 1, nextDate: 1 })
);

module.exports = Transaction;
