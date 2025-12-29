const mongoose = require("mongoose");

const TeamHeadSchema = new mongoose.Schema({
  name: String,
  department: String,
});

module.exports = mongoose.model("TeamHead", TeamHeadSchema);
