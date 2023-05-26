const express = require('express')
const userController = require('./../Controllers/userController')
const authController = require('./../Controllers/authController')

const router = express.Router()

router.post('/verification', userController.signupVerification)
router.post('/OTP',userController.enter_OTP)
router.post('/signup',userController.getNameAndEmail, authController.signup)

router.post('/login', authController.login)


router
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser)

router.patch(
        "/updateMyPassword",
        authController.protect,
        authController.updatePassword
      );
router.patch(
  "/updateMe",
  authController.protect,
  userController.updateMe
);
router
    .route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser)

module.exports = router