const db = require("./db_api");
const dotenv = require("dotenv");
dotenv.config();

async function addNewExpense(request) {
  let data = {
    date: Date.now(),
    category: request.category,
    type: request.type,
    detail: request.detail,
    amount: request.amount,
    transaction_id: "trx" + getRandomInt(),
    email: request.email,
  };

  return await new Promise((resolve, reject) => {
    db.addNewEntry(data)
      .then((result) => {
        if (result) {
          resolve(data);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

async function getAllTransactions(query) {
  return await new Promise((resolve, reject) => {
    db.getEntriesByQuery(query)
      .then((result) => {
        if (result) {
          resolve(result);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

async function updateTransaction(filter, query) {
  return await new Promise((resolve, reject) => {
    db.updateEntryByQuery(filter, query)
      .then((result) => {
        if (result) {
          resolve(result);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function getRandomInt() {
  max = Number.MAX_SAFE_INTEGER;
  min = 0;
  return Math.floor(Math.random() * (max - min) + min);
}

module.exports = {
  addNewExpense: addNewExpense,
  getAllTransactions: getAllTransactions,
  updateTransaction: updateTransaction,
};
