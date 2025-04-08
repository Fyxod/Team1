const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createClass,
  updateClass,
  deleteClass,
  getClassesByBatch,
} = require("../controllers/classController");

// Only admin and teacher can create, update, delete
router.post("/", protect, createClass);
router.put("/:id", protect, updateClass);
router.delete("/:id", protect, deleteClass);

// All users can view classes for their batch
router.get("/batch/:batchId", protect, getClassesByBatch);

module.exports = router;
