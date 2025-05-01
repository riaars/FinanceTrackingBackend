const mongoose = require("mongoose");

const SavingPlan = mongoose.model(
  "SavingPlan",
  new mongoose.Schema(
    {
      email: String,
      saving_plans: [
        {
          saving_id: String,
          saving_name: String,
          saving_target: Number,
        },
      ],
    },
    { timestamps: true }
  )
);

module.exports = SavingPlan;
