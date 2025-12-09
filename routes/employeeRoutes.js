const express = require("express");
const router = express.Router();
const {
  loginEmployee,
  createEmployee,
  getEmployees,
  deleteEmployee
} = require("../controllers/employeeController");

// Login (EMPLOYEE + ADMIN)
router.post("/login", loginEmployee);

// Create Employee (Admin only — add auth later)
router.post("/create", createEmployee);

// Get All Employees
router.get("/all", getEmployees);
router.delete("/delete/:empId",deleteEmployee);
module.exports = router;


