const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createClass,
  updateClass,
  deleteClass,
  getClassesByBatch,
} = require("../controllers/classController");
const authenticateToken = require("../middleware/authenticateToken");




router.post("/", authenticateToken, createClass);
router.put("/:id", authenticateToken, updateClass);
router.delete("/:id", authenticateToken, deleteClass);
router.get("/batch/:batchId", authenticateToken, getClassesByBatch);

module.exports = router;
