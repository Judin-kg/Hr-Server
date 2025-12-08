



// const Attendance = require("../models/Attendance");

// const COMPANY_IP_PREFIX = "49.47.197.59";

// exports.markAttendance = async (req, res) => {
//   try {
//     const { employeeId } = req.body;

//     // let ip =
//     //   req.headers["x-forwarded-for"] ||
//     //   req.connection.remoteAddress ||
//     //   req.socket.remoteAddress;

//     // ip = ip.replace("::ffff:", ""); // Fix IPv6

//     let ip = req.headers["x-forwarded-for"]?.split(",")[0].trim()
//         || req.socket.remoteAddress
//         || req.connection.remoteAddress;

// ip = ip.replace("::ffff:", "");
// console.log("User IP:", ip);


//     console.log("User IP:", ip);

//     if (!ip.startsWith(COMPANY_IP_PREFIX)) {
//       return res.status(403).json({
//         message: "Attendance failed. Connect to Company WiFi."
//       });
//     }

//     const today = new Date().toISOString().split("T")[0];

//     const attendance = new Attendance({
//       employeeId,
//       date: today,
//       time: new Date().toLocaleTimeString(),
//       status: "Present",
//     });

//     await attendance.save();

//     res.json({ message: "Attendance Marked Successfully", attendance });
//   } catch (err) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };













// const Attendance = require("../models/Attendance");
// const Employee = require("../models/Employee"); // ⬅️ Import employee model

// // Company WiFi IP
// const COMPANY_IP_PREFIX = "49.47.197.59";

// // Time restrictions (10:00 AM to 10:15 AM)
// const START_TIME = "10:00";
// const END_TIME = "15:00";

// function isWithinTimeRange() {
//   const now = new Date();
//   const current = now.toTimeString().slice(0, 5);
//   return current >= START_TIME && current <= END_TIME;
// }

// exports.markAttendance = async (req, res) => {
//   try {
//     const { employeeId } = req.body;

//     // 🔥 1️⃣ Check if Employee ID is empty
//     if (!employeeId || employeeId.trim() === "") {
//       return res.status(400).json({
//         message: "Employee ID is required.",
//       });
//     }

//     // 🔥 2️⃣ Validate Employee exists
//     const employee = await Employee.findOne({ empId: employeeId });

//     if (!employee) {
//       return res.status(404).json({
//         message: "Invalid Employee ID. Employee not found.",
//       });
//     }

//     // Extract IP
//     let ip =
//       req.headers["x-forwarded-for"]?.split(",")[0].trim() ||
//       req.socket.remoteAddress ||
//       req.connection.remoteAddress;

//     ip = ip.replace("::ffff:", "");

//     console.log("User IP:", ip);

//     // 🔥 3️⃣ WiFi IP check
//     if (!ip.startsWith(COMPANY_IP_PREFIX)) {
//       return res.status(403).json({
//         message: "Attendance failed. Connect to Company WiFi.",
//       });
//     }

//     // 🔥 4️⃣ Time check
//     if (!isWithinTimeRange()) {
//       return res.status(403).json({
//         message: "Attendance can only be marked between 10:00 AM and 10:15 AM.",
//       });
//     }

//     const today = new Date().toISOString().split("T")[0];

//     const attendance = new Attendance({
//       employeeId,
//       date: today,
//       time: new Date().toLocaleTimeString(),
//       status: "Present",
//     });

//     await attendance.save();

//     res.json({
//       message: "Attendance Marked Successfully",
//       attendance,
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };


// exports.getAllAttendance = async (req, res) => {
//   try {
//     const attendance = await Attendance.find().sort({ date: -1, time: -1 });
//     res.json(attendance);
//   } catch (err) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };















// const Attendance = require("../models/Attendance");
// const Employee = require("../models/Employee");

// // Company WiFi IP
// const COMPANY_IP_PREFIX = "49.47.197.59";

// // Time restrictions (10:00 AM to 10:30 AM)
// const START_TIME = "10:00";
// const END_TIME = "10:20";

// function isWithinTimeRange() {
//   const now = new Date();
//   const current = now.toTimeString().slice(0, 5);
//   return current >= START_TIME && current <= END_TIME;
// }

// exports.markAttendance = async (req, res) => {
//   try {
//     const { employeeId } = req.body;

//     // 1️⃣ Validate empId
//     if (!employeeId || employeeId.trim() === "") {
//       return res.status(400).json({ message: "Employee ID is required." });
//     }

//     // 2️⃣ Check if employee exists
//     const employee = await Employee.findOne({ empId: employeeId });
//     if (!employee) {
//       return res.status(404).json({ message: "Invalid Employee ID!" });
//     }

//     // 3️⃣ Get IP (clean format)
//     let ip =
//       req.headers["x-forwarded-for"]?.split(",")[0].trim() ||
//       req.socket.remoteAddress ||
//       req.connection.remoteAddress;

//     ip = ip.replace("::ffff:", "");
//     console.log("User IP:", ip);

//     // 4️⃣ Check WiFi IP
//     if (!ip.startsWith(COMPANY_IP_PREFIX)) {
//       return res
//         .status(403)
//         .json({ message: "Attendance failed. Connect to Company WiFi." });
//     }

//     // 5️⃣ Check time range
//     if (!isWithinTimeRange()) {
//       return res.status(403).json({
//         message: "Attendance allowed only between 10:00 AM and 10:30 AM.",
//       });
//     }

//     const today = new Date().toISOString().split("T")[0];

//     // 6️⃣ Prevent multiple attendance in same day
//     const alreadyMarked = await Attendance.findOne({
//       employeeId,
//       date: today,
//     });

//     if (alreadyMarked) {
//       return res.status(400).json({
//         message: "Attendance already marked for today!",
//       });
//     }

//     // 7️⃣ Prevent multiple attendance from same IP on same day (optional)
//     const sameIpMarked = await Attendance.findOne({
//       date: today,
//       wifiIp: ip,
//     });

//     if (sameIpMarked) {
//       return res.status(400).json({
//         message: "Attendance already marked from this WiFi IP today!",
//       });
//     }

//     // 8️⃣ Save attendance
//     const attendance = new Attendance({
//       employeeId,
//       date: today,
//       time: new Date().toLocaleTimeString(),
//       status: "Present",
//       wifiIp: ip,
//     });

//     await attendance.save();

//     res.json({
//       message: "Attendance Marked Successfully",
//       attendance,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// // Fetch all attendance records
// exports.getAllAttendance = async (req, res) => {
//   try {
//     const attendance = await Attendance.find().sort({ date: -1, time: -1 });
//     res.json(attendance);
//   } catch (err) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };








// const Attendance = require("../models/Attendance");
// const Employee = require("../models/Employee");

// // Company WiFi IP
// const COMPANY_IP_PREFIX = "49.47.197.59";

// // Time restrictions (10:00 AM to 10:20 AM)
// const START_TIME = "10:00";
// const END_TIME = "10:20";

// function isWithinTimeRange() {
//   const now = new Date();
//   const current = now.toTimeString().slice(0, 5);
//   return current >= START_TIME && current <= END_TIME;
// }

// // -------------------------------------------
// // MARK ATTENDANCE
// // -------------------------------------------
// exports.markAttendance = async (req, res) => {
//   try {
//     const { employeeId } = req.body;

//     // 1️⃣ Validate empId
//     if (!employeeId || employeeId.trim() === "") {
//       return res.status(400).json({ message: "Employee ID is required." });
//     }

//     // 2️⃣ Check if employee exists
//     const employee = await Employee.findOne({ empId: employeeId });
//     if (!employee) {
//       return res.status(404).json({ message: "Invalid Employee ID!" });
//     }

//     // 3️⃣ Extract user IP
//     let ip =
//       req.headers["x-forwarded-for"]?.split(",")[0].trim() ||
//       req.socket.remoteAddress ||
//       req.connection.remoteAddress;

//     ip = ip.replace("::ffff:", "");
//     console.log("User IP:", ip);

//     // 4️⃣ WiFi IP check
//     if (!ip.startsWith(COMPANY_IP_PREFIX)) {
//       return res.status(403).json({
//         message: "Attendance failed. Connect to Company WiFi.",
//       });
//     }

//     // 5️⃣ Time check
//     if (!isWithinTimeRange()) {
//       return res.status(403).json({
//         message: "Attendance allowed only between 10:00 AM and 10:20 AM.",
//       });
//     }

//     const today = new Date().toISOString().split("T")[0];

//     // 6️⃣ Prevent marking multiple times
//     const alreadyMarked = await Attendance.findOne({
//       employeeId,
//       date: today,
//     });

//     if (alreadyMarked) {
//       return res.status(400).json({
//         message: "Attendance already marked for today!",
//       });
//     }

//     // 7️⃣ Prevent multiple attendance from same IP
//     const sameIpMarked = await Attendance.findOne({
//       date: today,
//       wifiIp: ip,
//     });

//     if (sameIpMarked) {
//       return res.status(400).json({
//         message: "Attendance already marked from this WiFi IP today!",
//       });
//     }

//     // 8️⃣ Save attendance
//     const attendance = new Attendance({
//       employeeId,
//       date: today,
//       time: new Date().toLocaleTimeString(),
//       status: "Present",
//       wifiIp: ip,
//     });

//     await attendance.save();

//     res.json({
//       message: "Attendance Marked Successfully",
//       attendance,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// // -------------------------------------------
// // GET ALL ATTENDANCE (with ABSENT auto-detect)
// // -------------------------------------------
// exports.getAllAttendance = async (req, res) => {
//   try {
//     const today = new Date().toISOString().split("T")[0];

//     // Fetch all employees
//     const employees = await Employee.find();

//     // Fetch marked attendance
//     const attendanceToday = await Attendance.find({ date: today });

//     const presentMap = {};
//     attendanceToday.forEach((a) => {
//       presentMap[a.employeeId] = a;
//     });

//     const finalRecords = [];

//     // Add PRESENT records
//     finalRecords.push(...attendanceToday);

//     // Add ABSENT records (not stored in DB)
//     employees.forEach((emp) => {
//       if (!presentMap[emp.empId]) {
//         finalRecords.push({
//           employeeId: emp.empId,
//           date: today,
//           time: "00:00",
//           status: "Absent",
//         });
//       }
//     });

//     // Sort by employee ID
//     finalRecords.sort((a, b) =>
//       a.employeeId.localeCompare(b.employeeId)
//     );

//     res.json(finalRecords);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Server Error" });
//   }
// };












const Attendance = require("../models/Attendance");
const Employee = require("../models/Employee");

// Company WiFi IP
const COMPANY_IP_PREFIX = "49.47.197.59";

// Attendance allowed time (10:00 AM → 1:00 PM)
const START_TIME = "10:00";
const END_TIME = "15:00";

// Convert "HH:MM" → total minutes
function toMinutes(timeStr) {
  const [h, m] = timeStr.split(":").map(Number);
  return h * 60 + m;
}

// Time range check (fixed)
function isWithinTimeRange() {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const startMinutes = toMinutes(START_TIME);
  const endMinutes = toMinutes(END_TIME);

  return currentMinutes >= startMinutes && currentMinutes <= endMinutes;
}

// -----------------------------------------------------
// MARK ATTENDANCE
// -----------------------------------------------------
exports.markAttendance = async (req, res) => {
  try {
    const { employeeId } = req.body;

    // 1️⃣ Validate empId
    if (!employeeId || employeeId.trim() === "") {
      return res.status(400).json({ message: "Employee ID is required." });
    }

    // 2️⃣ Check if employee exists
    const employee = await Employee.findOne({ empId: employeeId });
    if (!employee) {
      return res.status(404).json({ message: "Invalid Employee ID!" });
    }

    // 3️⃣ Extract real IP
    let ip =
      req.headers["x-forwarded-for"]?.split(",")[0].trim() ||
      req.socket.remoteAddress ||
      req.connection.remoteAddress;

    ip = ip.replace("::ffff:", "");
    console.log("User IP:", ip);

    // 4️⃣ WiFi IP check
    if (!ip.startsWith(COMPANY_IP_PREFIX)) {
      return res.status(403).json({
        message: "Attendance failed. Connect to Company WiFi.",
      });
    }

    // 5️⃣ Time check (10:00 AM → 1:00 PM)
    if (!isWithinTimeRange()) {
      return res.status(403).json({
        message: "Attendance allowed only between 10:00 AM and 1:00 PM.",
      });
    }

    const today = new Date().toISOString().split("T")[0];

    // 6️⃣ Prevent multiple marking same employee
    const alreadyMarked = await Attendance.findOne({
      employeeId,
      date: today,
    });

    if (alreadyMarked) {
      return res.status(400).json({
        message: "Attendance already marked for today!",
      });
    }

    // 7️⃣ Prevent multiple marks from same IP
    const sameIpMarked = await Attendance.findOne({
      date: today,
      wifiIp: ip,
    });

    if (sameIpMarked) {
      return res.status(400).json({
        message: "Attendance already marked from this WiFi IP today!",
      });
    }

    // 8️⃣ Save attendance
    const attendance = new Attendance({
      employeeId,
      date: today,
      time: new Date().toLocaleTimeString(),
      status: "Present",
      wifiIp: ip,
    });

    await attendance.save();

    res.json({
      message: "Attendance Marked Successfully",
      attendance,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// -----------------------------------------------------
// GET ALL ATTENDANCE (with ABSENT auto-detect)
// -----------------------------------------------------
exports.getAllAttendance = async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    // Get all employees
    const employees = await Employee.find();

    // Get today's marked attendance
    const attendanceToday = await Attendance.find({ date: today });

    const presentMap = {};
    attendanceToday.forEach((a) => {
      presentMap[a.employeeId] = a;
    });

    const finalRecords = [];

    // Add PRESENT records
    finalRecords.push(...attendanceToday);

    // Add ABSENT records (not stored in DB)
    employees.forEach((emp) => {
      if (!presentMap[emp.empId]) {
        finalRecords.push({
          employeeId: emp.empId,
          date: today,
          time: "00:00",
          status: "Absent",
        });
      }
    });

    // Sort by employee ID
    finalRecords.sort((a, b) =>
      a.employeeId.localeCompare(b.employeeId)
    );

    res.json(finalRecords);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};
