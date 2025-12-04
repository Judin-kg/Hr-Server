// const mongoose = require("mongoose");

// const employeeSchema = new mongoose.Schema({
//   empId: { type: String, required: true, unique: true },
//   name: String,
//   password: String,
// });

// module.exports = mongoose.model("Employee", employeeSchema);

const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  empId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["admin", "employee"],
    default: "employee"
  },
  department: { type: String, required: true }

});

module.exports = mongoose.model("Employee", employeeSchema);
