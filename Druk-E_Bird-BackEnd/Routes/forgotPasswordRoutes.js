const express = require('express')
const forgotPasswordCtrl = require('../Controllers/forgotPasswordControllers')

const router = express.Router()

router.post('/forgotPassword', forgotPasswordCtrl.forgotPassword)
router.post('/resetPassword/:id', forgotPasswordCtrl.setPassword )

module.exports = router