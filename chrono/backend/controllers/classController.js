const Class = require("../models/Class");

// Create a class
const createClass = async (req, res) => {
  try {
    const {
      subject,
      teacher,
      location,
      day,
      date,
      timeSlot,
      durationMinutes,
      batch,
    } = req.body;

    if (req.user.role !== "admin" && req.user.role !== "teacher") {
      return res.status(403).json({ message: "Access denied" });
    }

    const newClass = await Class.create({
      subject,
      teacher,
      location,
      day,
      date,
      timeSlot,
      durationMinutes,
      batch,
    });

    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a class
const updateClass = async (req, res) => {
  try {
    const classToUpdate = await Class.findById(req.params.id);

    if (!classToUpdate) {
      return res.status(404).json({ message: "Class not found" });
    }

    if (req.user.role !== "admin" && req.user.role !== "teacher") {
      return res.status(403).json({ message: "Access denied" });
    }

    const updatedClass = await Class.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedClass);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a class
const deleteClass = async (req, res) => {
  try {
    const classToDelete = await Class.findById(req.params.id);

    if (!classToDelete) {
      return res.status(404).json({ message: "Class not found" });
    }

    if (req.user.role !== "admin" && req.user.role !== "teacher") {
      return res.status(403).json({ message: "Access denied" });
    }

    await Class.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Class deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get classes by batch
const getClassesByBatch = async (req, res) => {
  try {
    const batchId = req.params.batchId;

    const classes = await Class.find({ batch: batchId }).populate(
      "teacher",
      "username"
    );

    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createClass,
  updateClass,
  deleteClass,
  getClassesByBatch,
};
