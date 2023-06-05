const express = require('express')
const checkListController = require('./../Controllers/CheckListController')
const cors = require("cors");

const router = express.Router()


router
    .route('/')
    .get(checkListController.getAllCheckList, cors({
        origin: '*',
      }))
    .post(checkListController.createCheckList)

router
    .route('/:id')
    .get(checkListController.getCheckList)
    .patch(checkListController.updateCheckList)
    .delete(checkListController.deleteCheckList)
    .delete(checkListController.deleteAllCheckList)

module.exports = router