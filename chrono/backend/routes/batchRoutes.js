const express = require("express");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");
const Batch = require("../models/Batch");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");






router.post(
  "/",
  authenticateToken, async (req, res) => {
    try {
      const { name, code } = req.body;
      const batch = await Batch.create({ name, code });
      res.status(201).json(batch);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);


router.get("/", authenticateToken, async (req, res) => {
  const batches = await Batch.find({});
  res.json(batches);
});


router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const batch = await Batch.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(batch);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.delete("/:id", authenticateToken, authorizeRoles("admin"), async (req, res) => {
  try {
    await Batch.findByIdAndDelete(req.params.id);
    res.json({ message: "Batch deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
