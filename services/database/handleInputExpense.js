const db = require('./db_api')
const database = require('../../config/database.json')
const expense_collection = database.expense_collection

async function addNewExpense(request) {
  let data = {
    date: Date.now(),
    budget_name: request.budget_name,
    category: request.category,
    detail: request.detail,
    amount: request.amount,
    expense_id: 'EM' + getRandomInt(),
  }

  console.log(data)
  console.log(request.email)

  return await new Promise((resolve, reject) => {
    db.addNewEntry(expense_collection, {
      email: request.email,
      data: data,
    })
      .then((result) => {
        if (result) {
          console.log(result)
          resolve(data)
        }
      })
      .catch((error) => {
        reject(error)
      })
  })
}

function getRandomInt() {
  max = Number.MAX_SAFE_INTEGER
  min = 0
  return Math.floor(Math.random() * (max - min) + min)
}

module.exports = {
  addNewExpense: addNewExpense,
}
