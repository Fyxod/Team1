const express = require("express");
const {
  createNotification,
  getNotificationsForBatch,
} = require("../controllers/notificationController");

const router = express.Router();

// Create a notification
router.post("/", createNotification);

// Get all notifications for a specific batch
router.get("/:batchId", getNotificationsForBatch);

module.exports = router;
