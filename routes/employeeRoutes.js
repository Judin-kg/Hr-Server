const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");

// Employee Login
router.post("/login", async (req, res) => {
  const { empId, password } = req.body;

  const user = await Employee.findOne({ empId });

  if (!user || user.password !== password) {
    return res.status(400).json({ message: "Invalid Credentials" });
  }

  res.json({ message: "Login Successful", employee: user });
});

module.exports = router;

