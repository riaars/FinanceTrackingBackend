const express = require('express')
const router = express.Router()
const verifySignUp = require('../middlewares/verifySignUp')
const controller = require('../controllers/auth')

router.post('/', [verifySignUp.checkDuplicateUsernameEmail], controller.signup)

module.exports = router
