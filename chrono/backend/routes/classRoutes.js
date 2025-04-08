// routes/classRoutes.js
const express = require("express");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");
const Class = require("../models/Class");

const router = express.Router();

// Create a new class (admin only)
router.post("/", protect, authorizeRoles("admin"), async (req, res) => {
  try {
    const newClass = await Class.create(req.body);
    res.status(201).json(newClass);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all classes (optionally filtered by day)
router.get("/", protect, async (req, res) => {
  try {
    const { day } = req.query;
    const filter = day ? { day } : {};

    const classes = await Class.find(filter).populate("teacher", "name email");
    res.json(classes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a class (admin only)
router.put("/:id", protect, authorizeRoles("admin"), async (req, res) => {
  try {
    const updatedClass = await Class.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedClass) {
      return res.status(404).json({ message: "Class not found" });
    }
    res.json(updatedClass);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a class (admin only)
router.delete("/:id", protect, authorizeRoles("admin"), async (req, res) => {
  try {
    const deletedClass = await Class.findByIdAndDelete(req.params.id);
    if (!deletedClass) {
      return res.status(404).json({ message: "Class not found" });
    }
    res.json({ message: "Class deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
