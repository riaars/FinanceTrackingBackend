const mongoose = require("mongoose");

const MongoClient = require("mongodb").MongoClient;
const dotenv = require("dotenv");
dotenv.config();

const db = require("../../models");
const Transaction = db.transaction;

const db_url = process.env.DATABASE_URL;
const db_name = process.env.DATABASE_NAME;

const expense_db = db_url + "/" + db_name;

async function getAllEntries(collectionName) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(
      db_url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      function (err, client) {
        const db = client.db(db_name);
        const collection = db.collection(collectionName);

        collection
          .find()
          .toArray()
          .then((doc) => {
            if (client) {
              client.close();
            }
            resolve(doc);
          })
          .catch((error) => {
            if (client) {
              client.close();
            }
            reject(error);
          });
      }
    );
  });
}

async function getEntriesByQuery(collectionName, query) {
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
            .find(query)
            .toArray()
            .then((doc) => {
              if (client) {
                client.close();
              }
              resolve(doc);
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

const connectDB = async () => {
  try {
    await db.mongoose.connect(expense_db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB failed to connect");
    process.exit(1);
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
