const express = require("express");
const notificationController = require("../Controllers/notificationController");

const router = express.Router();

router
  .route("/sendNotification")
  .post(notificationController.createNotification);

router
  .route("/:id")
//   .get(notificationController.getNotification)
  .delete(notificationController.deleteNotification)

router.get("/:userId", notificationController.getNotification);

module.exports = router;
