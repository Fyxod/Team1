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
const authorizeRoles = require("../middleware/authorizeRole");




router.post("/", authenticateToken, authorizeRoles("Teacher"), createClass);
router.put("/:id", authenticateToken, authorizeRoles("Teacher"), updateClass);
router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles("Teacher"),
  deleteClass
);
router.get(
  "/batch/:batchId",
  authenticateToken,
  authorizeRoles("Teacher"),
  getClassesByBatch
);

module.exports = router;
