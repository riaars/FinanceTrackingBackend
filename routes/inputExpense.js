const express = require('express')
const authJWT = require('../middlewares/authJwt')
const handleInputExpense = require('../services/handleInputExpense')

router.post('/', authJWT.verifyToken, (req, res) => {
  const request = {
    budget_name: req.budget_name,
    category: req.category,
    detail: req.detail,
    amount: req.amount,
  }
  handleInputExpense
    .addNewExpense(request)
    .then((result) => {
      if (result) {
        res.json({
          status: 'success',
          data: request,
          expense_id: 'EM' + getRandomInt(),
        })
      } else {
        res.json({
          status: 'failed',
          message: 'Failed to input new expense',
        })
      }
    })
    .catch((error) => {
      console.log(error)
    })
})
