const express = require("express");
const router = express.Router();
const { markAttendance,getAllAttendance,getAllDateAttendance,updateAttendance,getAttendanceById } = require("../controllers/attendanceController");

router.post("/mark-wifi", markAttendance);
// Get all attendance
router.get("/all", getAllAttendance);
router.get("/date", getAllDateAttendance);
router.put("/update", updateAttendance);
router.get("/employee/:employeeId",getAttendanceById);
module.exports = router;

