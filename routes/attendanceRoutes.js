const express = require("express");
const router = express.Router();
const { markAttendance } = require("../controllers/attendanceController");

router.post("/mark-wifi", markAttendance);

module.exports = router;

