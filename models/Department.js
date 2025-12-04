const mongoose = require("mongoose");

const DepartmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  hod: { type: String, default: "" },
});

module.exports = mongoose.model("Department", DepartmentSchema);
