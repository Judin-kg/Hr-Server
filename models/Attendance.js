const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  employeeId: String,
   employeeName: String,
  date: String,
  time: String,
   timestamp: Date,
  status: String,
 wifiIp: String, // ⬅️ Add this field
});

module.exports = mongoose.model("Attendance", attendanceSchema);

