const express = require('express')
const router = express.Router()
const viewsController = require('./../Controllers/viewControllers')


router.get('/ResetPassword/:id', viewsController.getResetPassword)

module.exports = router