const Notification = require("../models/Notification");


const createNotification = async (req, res) => {
  try {
    const { batch, title, message } = req.body;

    const notification = new Notification({
      batch,
      title,
      message,
    });

    const createdNotification = await notification.save();
    res.status(201).json(createdNotification);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const getNotificationsForBatch = async (req, res) => {
  try {
    const notifications = await Notification.find({
      batch: req.params.batchId,
    }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createNotification,
  getNotificationsForBatch,
};
