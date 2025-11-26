const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  empId: { type: String, required: true, unique: true },
  name: String,
  password: String,
});

module.exports = mongoose.model("Employee", employeeSchema);

