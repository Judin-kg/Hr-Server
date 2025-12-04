const express = require("express");
const router = express.Router();
const {
  loginEmployee,
  createEmployee,
  getEmployees
} = require("../controllers/employeeController");

// Login (EMPLOYEE + ADMIN)
router.post("/login", loginEmployee);

// Create Employee (Admin only — add auth later)
router.post("/create", createEmployee);

// Get All Employees
router.get("/all", getEmployees);

module.exports = router;


