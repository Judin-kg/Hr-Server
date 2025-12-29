const express = require("express");
const router = express.Router();
const {
 
  createEmployer,
  getEmployer,
  deleteEmployer
  ,updateEmployer
} = require("../controllers/employerController");

// Login (EMPLOYEE + ADMIN)


// Create Employee (Admin only — add auth later)
router.post("/create", createEmployer);
router.put("/update/:id", updateEmployer);
// Get All Employees
router.get("/getAll", getEmployer);
router.delete("/delete/:id",deleteEmployer);
module.exports = router;