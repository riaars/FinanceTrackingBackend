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
  };

  return await new Promise((resolve, reject) => {
    db.addNewEntry(data)
      .then((result) => {
        if (result) {
          console.log(result);
          resolve(data);
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
};
