const Transaction = require("../models/Transaction");
const { v4: uuidv4 } = require("uuid");
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
      message: "Error on getting active recurrings",
    });
  }
};

const deleteRecurring = async (req, res) => {
  try {
    const result = await Transaction.updateOne(
      { transaction_id: req.body.transaction_id },
      {
        $set: {
          isRecurring: false,
          nextDate: null,
          interval: null,
        },
      }
    );
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

const updateRecurring = async (req, res) => {
  const newRecurring = {
    interval: req.body.interval,
    nextDate: req.body.nextDate,
  };

  try {
    const existingRecurring = await Transaction.findOne({
      transaction_id: req.body.transaction_id,
      isRecurring: true,
    });

    Object.assign(existingRecurring, newRecurring);

    // save existing recurring as a new object after with updated data
    const result = await existingRecurring.save();

    if (result) {
      res.status(200).json({
        code: "UPDATE_RECURRING_TRANSACTION_SUCCESS",
        message: "Recurring transaction is successfully updated",
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      code: "UPDATE_TRANSACTION_ERROR",
      message: "Error on updating the transaction",
    });
    console.log(error);
  }
};

module.exports = {
  getActiveRecurrings,
  deleteRecurring,
  updateRecurring,
};
