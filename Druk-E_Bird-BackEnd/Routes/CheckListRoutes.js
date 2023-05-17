const express = require('express')
const checkListController = require('./../Controllers/CheckListController')

const router = express.Router()


router
    .route('/')
    .get(checkListController.getAllCheckList)
    .post(checkListController.createCheckList)

router
    .route('/:id')
    .patch(checkListController.updateCheckList)
    .delete(checkListController.deleteCheckList)
    .delete(checkListController.deleteAllCheckList)

module.exports = router