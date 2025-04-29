const mongoose = require("mongoose");

const Budget = mongoose.model(
  "Budget",
  new mongoose.Schema(
    {
      email: String,
      monthly_budget: Number,
      monthly_budget_per_categories: {
        food_dining: Number,
        transportation: Number,
        housing: Number,
        entertainment: Number,
        bills_utilities: Number,
        health_fitness: Number,
        shopping: Number,
        education: Number,
        personal_care: Number,
        insurance: Number,
        miscellaneous: Number,
      },
    },
    { timestamps: true }
  )
);

module.exports = Budget;
