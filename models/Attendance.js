const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  employeeId: String,
  date: String,
  time: String,
  status: String,
});

module.exports = mongoose.model("Attendance", attendanceSchema);

