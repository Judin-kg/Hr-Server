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
  department: { type: String, required: true },
  salary: { type: Number, default: 0 },
  image : { type: String, default: "" }

});

module.exports = mongoose.model("Employee", employeeSchema);



// models/Employee.js
// const mongoose = require("mongoose");

// const employeeSchema = new mongoose.Schema({
//   empId: String,
//   name: String,
//   password: String,
//   role: String,
//   department: String,
//   // 🔥 NEW
//   teamHead: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "TeamHead",
//     default: null,
//   },
// });

// module.exports = mongoose.model("Employee", employeeSchema);
