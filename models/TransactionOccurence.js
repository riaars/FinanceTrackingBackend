const mongoose = require("mongoose");

const TransactionOccurrence = mongoose.model(
  "TransactionOccurrence",
  new mongoose.Schema(
    {
      planId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true,
      },
      periodKey: { type: String, required: true, index: true },
    },
    { timestamps: true }
  ).index({ planId: 1, periodKey: 1 }, { unique: true })
);

module.exports = TransactionOccurrence;
