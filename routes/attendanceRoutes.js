const express = require("express");
const router = express.Router();
const { markAttendance,getAllAttendance,getAllDateAttendance } = require("../controllers/attendanceController");

router.post("/mark-wifi", markAttendance);
// Get all attendance
router.get("/all", getAllAttendance);
router.get("/date", getAllDateAttendance);
module.exports = router;

