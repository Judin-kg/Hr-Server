const express = require("express");
const router = express.Router();
const { markAttendance,getAllAttendance } = require("../controllers/attendanceController");

router.post("/mark-wifi", markAttendance);
// Get all attendance
router.get("/all", getAllAttendance);
module.exports = router;

