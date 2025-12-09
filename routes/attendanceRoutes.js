const express = require("express");
const router = express.Router();
const { markAttendance,getAllAttendance,getAllDateAttendance,updateAttendance } = require("../controllers/attendanceController");

router.post("/mark-wifi", markAttendance);
// Get all attendance
router.get("/all", getAllAttendance);
router.get("/date", getAllDateAttendance);
router.put("/update", updateAttendance);

module.exports = router;

