const mongoose = require("mongoose");

const employerSchema = new mongoose.Schema({
 
  name: {
    type: String,
    required: true
  },
 department: { type: String, required: true },
 teamHead: {type:String, required:true },
 image : { type: String, default: "" }

});

module.exports = mongoose.model("Employer", employerSchema);