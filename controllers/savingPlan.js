const SavingPlan = require("../models/SavingPlan");

const addSavingPlan = async (req, res) => {
  const request = {
    email: req.user.email,
    saving_plans: [
      {
        saving_name: req.body.saving_name,
        saving_target: req.body.saving_target,
      },
    ],
  };

  try {
    const result = await new SavingPlan(request).save();
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

module.exports = {
  addSavingPlan: addSavingPlan,
};
