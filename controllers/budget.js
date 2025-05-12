const Budget = require("../models/Budget");

const addMonthlyBudget = async (req, res) => {
  const request = {
    email: req.user.email,
    monthly_budget: req.body.monthly_budget,
    monthly_budget_per_categories: {
      food_dining: req.body.monthly_budget_per_categories.food_dining,
      transportation: req.body.monthly_budget_per_categories.transportation,
      housing: req.body.monthly_budget_per_categories.housing,
      entertainment: req.body.monthly_budget_per_categories.entertainment,
      bills_utilities: req.body.monthly_budget_per_categories.bills_utilities,
      health_fitness: req.body.monthly_budget_per_categories.health_fitness,
      shopping: req.body.monthly_budget_per_categories.shopping,
      education: req.body.monthly_budget_per_categories.education,
      personal_care: req.body.monthly_budget_per_categories.personal_care,
      insurance: req.body.monthly_budget_per_categories.insurance,
      miscellaneous: req.body.monthly_budget_per_categories.miscellaneous,
    },
  };

  try {
    const existingBudget = await Budget.findOne({ email: req.user.email });
    if (existingBudget) {
      await Budget.updateOne(request);
    } else {
      await new Budget(request).save();
    }

    const updatedBudget = await Budget.findOne({ email: req.user.email });

    if (updatedBudget) {
      res.json({
        ...request,
      });
    }
  } catch (error) {
    res.json({ message: "Error on creating monthly budget" });
    console.log(error);
  }
};

const updateMonthlyBudget = async (req, res) => {
  const request = {
    monthly_budget: req.body.monthly_budget,
    monthly_budget_per_categories: {
      food_dining: req.body.monthly_budget_per_categories.food_dining,
      transportation: req.body.monthly_budget_per_categories.transportation,
      housing: req.body.monthly_budget_per_categories.housing,
      entertainment: req.body.monthly_budget_per_categories.entertainment,
      bills_utilities: req.body.monthly_budget_per_categories.bills_utilities,
      health_fitness: req.body.monthly_budget_per_categories.health_fitness,
      shopping: req.body.monthly_budget_per_categories.shopping,
      education: req.body.monthly_budget_per_categories.education,
      personal_care: req.body.monthly_budget_per_categories.personal_care,
      insurance: req.body.monthly_budget_per_categories.insurance,
      miscellaneous: req.body.monthly_budget_per_categories.miscellaneous,
    },
  };

  try {
    const result = await Budget.findOne({ email: req.user.email }).updateOne(
      { email: req.user.email },
      request
    );
    if (result) {
      res.json({
        transaction_id: result.transaction_id,
        ...request,
      });
    }
  } catch (error) {
    res.json({ message: "Error on updating the budget" });
    console.log(error);
  }
};

module.exports = {
  addMonthlyBudget: addMonthlyBudget,
  updateMonthlyBudget: updateMonthlyBudget,
};
