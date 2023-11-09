const express = require('express')
const { Login, register } = require('../controllers/auth')
const router= express.Router()

router.post('/register',register)
router.post('/login',Login)

module.exports = router