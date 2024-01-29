const express = require('express')
const authJWT = require('../middlewares/authJwt')
const handleInputExpense = require('../services/database/handleInputExpense')
const router = express.Router()

router.post('/', (req, res) => {
  const request = {
    budget_name: req.body.budget_name,
    category: req.body.category,
    detail: req.body.detail,
    amount: req.body.amount,
    email: req.body.email,
  }
  handleInputExpense
    .addNewExpense(request)
    .then((result) => {
      console.log(result)
      if (result) {
        res.json({
          status: 'success',
          data: request,
          expense_id: result.expense_id,
        })
      } else {
        res.json({
          status: 'failed',
          message: 'Failed to input new expense',
        })
      }
    })
    .catch((error) => {
      res.json('error saving input')
      console.log(error)
    })
})

module.exports = router
