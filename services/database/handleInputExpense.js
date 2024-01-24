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
  }

  return await new Promise((resolve, reject) => {
    db.addNewEntry(expense_collection, {
      expense_id: request.expense_id,
      email: query.email,
      data: data,
    })
      .then((result) => {
        if (result) {
          resolve(data)
        }
      })
      .catch((error) => {
        reject(error)
      })
  })
}
