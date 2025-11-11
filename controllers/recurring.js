const Transaction = require("../models/Transaction");

const getActiveRecurrings = async (req, res) => {
  try {
    const result = await Transaction.find({
      email: req.user.email,
      isRecurring: true,
    }).sort({
      date: -1,
      createdAt: -1,
    });
    if (result) {
      res.status(200).json({
        code: "GET_ACTIVE_RECURRINGS_SUCCESS",
        message: "Successfully fetched active recurring transactions",
        data: result,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: "GET_ACTIVE_RECURRINGS_ERROR",
      message: "Error on getting all",
    });
  }
};

const deleteRecurring = async (req, res) => {
  try {
    const result = await Transaction.updateOne(
      { transaction_id: req.body.transaction_id, email: req.user.email },
      {
        $set: {
          isRecurring: false,
          nextDate: null,
          interval: null,
        },
      }
    );
    console.log("deleteRecurring result", result);
    if (result) {
      res.status(200).json({
        code: "DELETE_RECURRING_SUCCESS",
        message: "Successfully deleted recurring transaction",
      });
    }
  } catch (error) {
    res.status(500).json({
      code: "DELETE_RECURRING_ERROR",
      message: "Error on deleting recurring transaction",
    });
  }
};

module.exports = {
  getActiveRecurrings,
  deleteRecurring,
};
