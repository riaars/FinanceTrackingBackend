const db = require("../../models");
const Transaction = db.transaction;

const getAllEntries = async () => {
  try {
    const transactions = await Transaction.find({});
    return transactions;
  } catch (error) {
    console.log(error);
  }
};

const addNewEntry = async (query) => {
  try {
    const newTransaction = new Transaction(query);
    const savedTransaction = await newTransaction.save();

    return savedTransaction;
  } catch (error) {
    console.error("Error on adding new entry");
    throw error;
  }
};

const getEntriesByQuery = async (query) => {
  try {
    const transactions = await Transaction.find(query).sort({ date: -1 });
    return transactions;
  } catch (error) {
    console.log(error);
  }
};

const updateEntryByQuery = async (filter, query) => {
  try {
    const transactions = await Transaction.updateOne(filter, { $set: query });
    return transactions;
  } catch (error) {
    console.log(error);
  }
};

const deleteEntryByQuery = async (filter) => {
  try {
    const transactions = await Transaction.deleteOne(filter);
    return transactions;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllEntries: getAllEntries,
  getEntriesByQuery: getEntriesByQuery,
  addNewEntry: addNewEntry,
  updateEntryByQuery: updateEntryByQuery,
  deleteEntryByQuery: deleteEntryByQuery,
};
