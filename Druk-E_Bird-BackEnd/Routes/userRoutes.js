const express = require('express')
const userController = require('./../Controllers/userController')
const authController = require('./../Controllers/authController')

const router = express.Router()

router.post('/signup', authController.signup)
router.post('/login', authController.login)


router.get(userController.getAllUsers)
router.post(userController.createUser)

router
    .route('/:id')
    .get(userController.getUser)
    .delete(userController.deleteUser)

module.exports = router