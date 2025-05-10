const SavingPlan = require("../models/SavingPlan");
const { getRandomInt } = require("../utils/helpers");

const addSavingPlan = async (req, res) => {
  const newSavingPlan = {
    saving_id: "sp" + getRandomInt(),
    saving_name: req.body.saving_name,
    saving_target: req.body.saving_target,
  };

  try {
    const existingSavingPlans = await SavingPlan.findOne({
      email: req.user.email,
    });

    if (existingSavingPlans) {
      await SavingPlan.updateOne(
        {
          email: req.user.email,
        },
        {
          $set: {
            saving_plans: [newSavingPlan, ...existingSavingPlans.saving_plans],
          },
        }
      );
    } else {
      await SavingPlan.create({
        email: req.user.email,
        saving_plans: [newSavingPlan],
      });
    }

    const updatedDoc = await SavingPlan.findOne({ email: req.user.email });
    res.json({
      id: updatedDoc._id,
      ...newSavingPlan,
    });
  } catch (error) {
    res.json({ message: "Error on adding saving plan" });
    console.log(error);
  }
};

const updateSavingPlan = async (req, res) => {
  const newSavingPlan = {
    saving_name: req.body.saving_name,
    saving_amount: req.body.saving_amount,
  };

  try {
    const result = await SavingPlan.updateOne(
      { _id: req.body.id },
      newSavingPlan
    );
    if (result) {
      res.json({
        id: result._id,
        ...newSavingPlan,
      });
    }
  } catch (error) {
    res.json({ message: "Error on adding saving plan" });
    console.log(error);
  }
};

module.exports = {
  addSavingPlan: addSavingPlan,
  updateSavingPlan: updateSavingPlan,
};
