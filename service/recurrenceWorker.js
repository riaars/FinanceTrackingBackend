const Transaction = require("../models/Transaction.js");
const TransactionOccurrence = require("../models/TransactionOccurence.js");
const { periodKey, addInterval } = require("../utils/helpers.js");
const { v4: uuidv4 } = require("uuid");

const BATCH = 100;

const processDueRecurrences = async () => {
  const now = new Date();

  const duePlans = await Transaction.find({
    isRecurring: true,
    nextDate: { $lte: now },
  })
    .sort({ nextDate: 1 })
    .limit(BATCH);

  for (const plan of duePlans) {
    const pkey = periodKey(plan.nextDate, plan.interval, plan.timezone);

    try {
      await TransactionOccurrence.create({ planId: plan._id, periodKey: pkey });
    } catch (e) {
      await maybeAdvance(plan);
      continue;
    }

    await Transaction.create({
      transaction_id: uuidv4(),
      email: plan.email,
      category: plan.category,
      type: plan.type,
      detail: `[Recurring] ${plan.detail || ""}`.trim(),
      amount: plan.amount,
      date: new Date(),
      isRecurring: false, // switch to non-recurring
    });

    // Advance the nextDate after successful occurrence creation
    await Transaction.updateOne(
      { _id: plan._id },
      {
        $set: {
          nextDate: addInterval(plan.nextDate, plan.interval, plan.timezone),
        },
      }
    );
  }
};

const maybeAdvance = async (plan) => {
  // If an occurrence already existed but nextDate somehow didn’t move forward
  await Transaction.updateOne(
    { _id: plan._id },
    {
      $set: {
        nextDate: addInterval(plan.nextDate, plan.interval, plan.timezone),
      },
    }
  );
};

module.exports = {
  processDueRecurrences: processDueRecurrences,
};
