const Budget = require("../models/Budget");

const addMonthlyBudget = async (req, res) => {
  const request = {
    email: req.user.email,
    budget_per_categories: req.body.budget_per_categories,
  };

  try {
    const existingBudget = await Budget.findOne({ email: req.user.email });
    let updatedBudget;
    if (existingBudget) {
      updatedBudget = await Budget.findOneAndUpdate(
        {
          email: req.user.email,
        },
        {
          $set: {
            budget_per_categories: req.body.budget_per_categories,
          },
        },
        { runValidators: true, new: true }
      );
    } else {
      updatedBudget = await new Budget(request).save();
    }

    if (updatedBudget) {
      res.status(200).json({
        code: "ADD_BUDGET_SUCCESS",
        message: "Successfully on updating the budget",
        data: { ...request },
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Error on creating monthly budget" });
    console.log(error);
  }
};

const getMonthlyBudget = async (req, res) => {
  try {
    const result = await Budget.findOne({ email: req.user.email });
    if (result) {
      res.status(200).json({
        code: "GET_BUDGET_SUCCESS",
        message: "Successfully on getting the monthly budget data",
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      code: "GET_BUDGET_ERROR",
      message: "Error on getting the user monthly budget",
    });
  }
};

module.exports = {
  addMonthlyBudget: addMonthlyBudget,
  getMonthlyBudget: getMonthlyBudget,
};
