const Budget = require("../models/Budget");

const addMonthlyBudget = async (req, res) => {
  const request = {
    email: req.user.email,
    monthly_budget: req.body.monthly_budget,
    monthly_budget_per_categories: {
      food_dining: req.body.food_dining,
      transportation: req.body.transportation,
      housing: req.body.housing,
      entertainment: req.body.entertainment,
      bills_utilities: req.body.bills_utilities,
      health_fitness: req.body.health_fitness,
      shopping: req.body.shopping,
      education: req.body.education,
      personal_care: req.body.personal_care,
      insurance: req.body.insurance,
      miscellaneous: req.body.miscellaneous,
    },
  };

  try {
    const result = await new Budget(request).save();
    if (result) {
      res.json({
        id: result._id,
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
    email: req.user.email,
    monthly_budget: req.body.monthly_budget,
    monthly_budget_per_categories: {
      food_dining: req.body.food_dining,
      transportation: req.body.transportation,
      housing: req.body.housing,
      entertainment: req.body.entertainment,
      bills_utilities: req.body.bills_utilities,
      health_fitness: req.body.health_fitness,
      shopping: req.body.shopping,
      education: req.body.education,
      personal_care: req.body.personal_care,
      insurance: req.body.insurance,
      miscellaneous: req.body.miscellaneous,
    },
  };

  try {
    const result = await Budget.updateOne({ _id: req.body.id }, request);
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
