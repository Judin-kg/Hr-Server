const express = require("express");
const router = express.Router();
const Department = require("../models/Department");

// ADD
router.post("/add", async (req, res) => {
  try {
    const dept = new Department(req.body);
    await dept.save();
    res.json({ message: "Department Added" });
  } catch (err) {
    res.status(500).json({ message: "Error adding department" });
  }
});

// GET ALL
router.get("/all", async (req, res) => {
  try {
    const list = await Department.find();
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: "Error fetching departments" });
  }
});

// ---------------------------------------------
// UPDATE DEPARTMENT
// ---------------------------------------------
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await Department.findByIdAndUpdate(id, req.body);

    res.json({ message: "Department Updated Successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error updating department" });
  }
});

// ---------------------------------------------
// DELETE DEPARTMENT
// ---------------------------------------------
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await Department.findByIdAndDelete(id);

    res.json({ message: "Department Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting department" });
  }
});

module.exports = router;
