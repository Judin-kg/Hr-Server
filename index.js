// const express = require("express");
// const cors = require("cors");
// const connectDB = require("./config/db");
// const seedEmployee = require('./seedEmployee'); 
// require("dotenv").config();

// const attendanceRoutes = require("./routes/attendanceRoutes");
// const employeeRoutes = require("./routes/employeeRoutes");

// const app = express();
// app.use(cors());
// app.use(express.json());

// // DB
// connectDB();

// // Routes
// app.use("/api/attendance", attendanceRoutes);
// app.use("/api/employee", employeeRoutes);

// app.get("/", (req, res) => res.send("HR Attendance API Running"));

// // Start Server
// app.listen(5000, () => console.log("✅ Server running on port 5000"));


const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const attendanceRoutes = require("./routes/attendanceRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const seedEmployee = require("./seedEmployee");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// DB Connection
connectDB();

// Seed Employees (Run only once)
seedEmployee()
  .then(() => console.log("🟢 Employee seeding check completed"))
  .catch((err) => console.error("❌ Error seeding employees:", err));

// Routes
app.use("/api/attendance", attendanceRoutes);
app.use("/api/employee", employeeRoutes);

// Root Check
app.get("/", (req, res) => res.send("HR Attendance API Running"));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
