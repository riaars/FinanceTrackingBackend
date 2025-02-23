const mongoose = require("mongoose");

const MongoClient = require("mongodb").MongoClient;
const dotenv = require("dotenv");
dotenv.config();

const db = require("../../models");
const Transaction = db.transaction;

const db_url = process.env.DATABASE_URL;
const db_name = process.env.DATABASE_NAME;

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
    const transactions = await Transaction.find(query);
    return transactions;
  } catch (error) {
    console.log(error);
  }
};

async function updateEntry(collectionName, filter, data) {
  return await new Promise((resolve, reject) => {
    MongoClient.connect(
      db_url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      function (err, client) {
        if (err !== null) {
          reject(err);
        } else {
          const db = client.db(db_name);
          const collection = db.collection(collectionName);

          collection
            .updateOne(filter, { $set: data })
            .then((res) => {
              if (client) {
                client.close();
              }
              resolve(res.result);
            })
            .catch((error) => {
              if (client) {
                client.close();
              }
              reject(error);
            });
        }
      }
    );
  });
}

module.exports = {
  getAllEntries: getAllEntries,
  getEntriesByQuery: getEntriesByQuery,
  addNewEntry: addNewEntry,
  updateEntry: updateEntry,
};
