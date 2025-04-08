const express = require("express");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");
const Batch = require("../models/Batch");
const router = express.Router();

// Create a Batch (Admin only)
router.post(
  "/",
  /*protect, authorizeRoles("admin"),*/ async (req, res) => {
    try {
      const { name, code } = req.body;
      const batch = await Batch.create({ name, code });
      res.status(201).json(batch);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

// Get All Batches (any logged in user)
router.get("/", protect, async (req, res) => {
  const batches = await Batch.find({});
  res.json(batches);
});

// Update a Batch (Admin only)
router.put("/:id", /*protect, authorizeRoles("admin"),*/ async (req, res) => {
  try {
    const batch = await Batch.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(batch);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a Batch (Admin only)
router.delete("/:id", protect, authorizeRoles("admin"), async (req, res) => {
  try {
    await Batch.findByIdAndDelete(req.params.id);
    res.json({ message: "Batch deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
