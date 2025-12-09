



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

// // ----------------------------------------------
// // GET IST TIME MINUTES
// // ----------------------------------------------
// function getISTMinutes() {
//   const now = new Date();

//   // Convert UTC → IST
//   const istOffset = 5.5 * 60 * 60 * 1000;
//   const istTime = new Date(now.getTime() + istOffset);

//   return istTime.getHours() * 60 + istTime.getMinutes();
// }

// // ----------------------------------------------
// // MARK ATTENDANCE (Present + Halfday)
// // ----------------------------------------------
// exports.markAttendance = async (req, res) => {
//   try {
//     const { employeeId } = req.body;

//     if (!employeeId || employeeId.trim() === "") {
//       return res.status(400).json({ message: "Employee ID is required." });
//     }

//     // Check if employee exists
//     const employee = await Employee.findOne({ empId: employeeId });
//     if (!employee) {
//       return res.status(404).json({ message: "Invalid Employee ID!" });
//     }

//     // Extract IP
//     let ip =
//       req.headers["x-forwarded-for"]?.split(",")[0].trim() ||
//       req.socket.remoteAddress ||
//       req.connection.remoteAddress;

//     ip = ip.replace("::ffff:", "");
//     console.log("User IP:", ip);

//     // WiFi check
//     if (!ip.startsWith(COMPANY_IP_PREFIX)) {
//       return res.status(403).json({
//         message: "Attendance failed. Connect to Company WiFi.",
//       });
//     }

//     // --- TIME RANGE LOGIC ---
//     const current = getISTMinutes();

//     const startPresent = 9 * 60;        // 9:00 AM
//     const endPresent = 10 * 60 + 10;     // 10:10 AM
//     const endHalfDay = 10 * 60 + 30;     // 10:30 AM

//     let status = "";

//     if (current >= startPresent && current <= endPresent) {
//       status = "Present";
//     } else if (current > endPresent && current <= endHalfDay) {
//       status = "Half Day";
//     } else {
//       return res.status(403).json({
//         message: "Attendance allowed only until 10:30 AM.",
//       });
//     }

//     const today = new Date().toISOString().split("T")[0];

//     // Prevent duplicate marking
//     const alreadyMarked = await Attendance.findOne({
//       employeeId,
//       date: today,
//     });

//     if (alreadyMarked) {
//       return res.status(400).json({
//         message: "Attendance already marked for today!",
//       });
//     }

//     // Save attendance
//     const attendance = new Attendance({
//       employeeId,
//       date: today,
//       time: new Date().toLocaleTimeString(),
//       status,
//       wifiIp: ip,
//     });

//     await attendance.save();

//     res.json({
//       message: `Attendance Marked Successfully (${status})`,
//       attendance,
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server Error" });
//   }
// };








const Attendance = require("../models/Attendance");
const Employee = require("../models/Employee");

// Company WiFi IP
const COMPANY_IP_PREFIX = "49.47.197.59";

// Convert to IST Minutes
function getISTMinutes() {
  const now = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000;
  const ist = new Date(now.getTime() + istOffset);
  return ist.getHours() * 60 + ist.getMinutes();
}

exports.markAttendance = async (req, res) => {
  try {
    const { employeeId } = req.body;

    if (!employeeId || employeeId.trim() === "") {
      return res.status(400).json({ message: "Employee ID is required." });
    }

    // Check employee exists
    const employee = await Employee.findOne({ empId: employeeId });
    if (!employee) {
      return res.status(404).json({ message: "Invalid Employee ID!" });
    }

    // --- WiFi IP Check ---
    let ip =
      req.headers["x-forwarded-for"]?.split(",")[0].trim() ||
      req.socket.remoteAddress ||
      req.connection.remoteAddress;

    ip = ip.replace("::ffff:", "");
    console.log("User IP:", ip);

    if (!ip.startsWith(COMPANY_IP_PREFIX)) {
      return res.status(403).json({
        message: "Attendance failed. Connect to Company WiFi.",
      });
    }

    // --- TIME RANGE CALCULATION ---
    const now = getISTMinutes();

    const startPresent = 9 * 60;             // 9:00 AM
    const endPresent = 10 * 60 + 10;         // 10:10 AM

    const startLate = endPresent;            // 10:10 AM
    const endLate = 10 * 60 + 30;            // 10:30 AM

    const startHalf = endLate;               // 10:30 AM
    const endHalf = 16 * 60;                 // 4:00 PM

    let status = "";

    if (now >= startPresent && now <= endPresent) {
      status = "Present";
    } 
    else if (now > startLate && now <= endLate) {
      status = "Late";
    } 
    else if (now > startHalf && now <= endHalf) {
      status = "Half Day";
    } 
    else {
      return res.status(403).json({
        message: "Attendance allowed only between 9:00 AM and 4:00 PM",
      });
    }

    const today = new Date().toISOString().split("T")[0];

    // Check duplicate attendance
    const exists = await Attendance.findOne({
      employeeId,
      date: today,
    });

    if (exists) {
      return res.status(400).json({
        message: "Attendance already marked for today!",
      });
    }

    // Save attendance
    const attendance = new Attendance({
      employeeId,
      date: today,
      time: new Date().toLocaleTimeString(),
      status,
      wifiIp: ip,
    });

    await attendance.save();

    res.json({
      message: `Attendance Marked (${status})`,
      attendance,
    });

  } catch (err) {
    console.error("Attendance Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
















// -----------------------------------------------------
// GET ALL ATTENDANCE (with ABSENT)
// -----------------------------------------------------
// exports.getAllAttendance = async (req, res) => {
//   try {
//     const today = new Date().toISOString().split("T")[0];

//     const employees = await Employee.find();
//     const attendanceToday = await Attendance.find({ date: today });

//     const presentMap = {};
//     attendanceToday.forEach((a) => {
//       presentMap[a.employeeId] = a;
//     });

//     const finalRecords = [];

//     finalRecords.push(...attendanceToday);

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

//     finalRecords.sort((a, b) =>
//       a.employeeId.localeCompare(b.employeeId)
//     );

//     res.json(finalRecords);

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Server Error" });
//   }
// };






// UPDATE ATTENDANCE (Admin Edit)
// -----------------------------------------------------
exports.updateAttendance = async (req, res) => {
  try {
    const { employeeId, date, status, time } = req.body;

    if (!employeeId || !date || !status) {
      return res.status(400).json({ message: "Employee ID, Date, and Status are required" });
    }

    // Check employee exists
    const employee = await Employee.findOne({ empId: employeeId });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Check attendance for that day
    let record = await Attendance.findOne({ employeeId, date });

    // If not exist → create new attendance
    if (!record) {
      record = new Attendance({
        employeeId,
        date,
        time: time || "00:00",
        status,
        wifiIp: "MANUAL_UPDATE"
      });

      await record.save();

      return res.json({
        message: "Attendance created successfully",
        record
      });
    }

    // Update existing record
    record.status = status;
    if (time) record.time = time;

    await record.save();

    res.json({
      message: "Attendance updated successfully",
      record
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};








exports.getAllAttendance = async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    // Get all employees
    const employees = await Employee.find();

    // Get today's attendance
    const attendanceToday = await Attendance.find({ date: today });

    const presentMap = {};
    attendanceToday.forEach((a) => {
      presentMap[a.employeeId] = a;
    });

    const finalRecords = [];

    // Add Present employees with employeeName
    attendanceToday.forEach((rec) => {
      const emp = employees.find((e) => e.empId === rec.employeeId);

      finalRecords.push({
        employeeId: rec.employeeId,
        employeeName: emp ? emp.name : "Unknown",
        date: rec.date,
        time: rec.time,
        status: rec.status,
      });
    });

    // Add Absent employees
    employees.forEach((emp) => {
      if (!presentMap[emp.empId]) {
        finalRecords.push({
          employeeId: emp.empId,
          employeeName: emp.name,
          date: today,
          time: "00:00",
          status: "Absent",
        });
      }
    });

    // Sort by employeeId
    finalRecords.sort((a, b) =>
      a.employeeId.localeCompare(b.employeeId)
    );

    res.json(finalRecords);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};



// exports.getAllDateAttendance = async (req, res) => {
//   try {
//     const employees = await Employee.find();
//     const attendanceRecords = await Attendance.find();

//     if (!attendanceRecords.length) {
//       return res.json([]);
//     }

//     // STEP 1: Get all unique dates available in attendance DB
//     const allDates = [
//       ...new Set(attendanceRecords.map((r) => r.date)),
//     ].sort();

//     const finalOutput = [];

//     // STEP 2: Loop through each date
//     for (let date of allDates) {
//       const dailyRecords = attendanceRecords.filter(
//         (r) => r.date === date
//       );

//       const presentMap = {};
//       dailyRecords.forEach((r) => {
//         presentMap[r.employeeId] = r;
//       });

//       // Add present records
//       finalOutput.push(...dailyRecords);

//       // Add absent employees
//       employees.forEach((emp) => {
//         if (!presentMap[emp.empId]) {
//           finalOutput.push({
//             employeeId: emp.empId,
            
//             date,
//             time: "00:00",
//             status: "Absent",
//           });
//         }
//       });
//     }

//     // STEP 3: Sort final output by date + employeeId
//     finalOutput.sort((a, b) => {
//       if (a.date !== b.date) {
//         return new Date(a.date) - new Date(b.date);
//       }
//       return a.employeeId.localeCompare(b.employeeId);
//     });

//     res.json(finalOutput);

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Server Error" });
//   }
// };






exports.getAllDateAttendance = async (req, res) => {
  try {
    const employees = await Employee.find();
    const attendanceRecords = await Attendance.find();

    if (!attendanceRecords.length) {
      return res.json([]);
    }

    // STEP 1: Get all unique dates available in attendance DB
    const allDates = [...new Set(attendanceRecords.map((r) => r.date))].sort();

    const finalOutput = [];

    // STEP 2: Loop through each date
    for (let date of allDates) {
      const dailyRecords = attendanceRecords.filter((r) => r.date === date);

      const presentMap = {};
      dailyRecords.forEach((r) => {
        presentMap[r.employeeId] = r;
      });

      // Add present records with employeeName
      dailyRecords.forEach((rec) => {
        const emp = employees.find((e) => e.empId === rec.employeeId);

        finalOutput.push({
          employeeId: rec.employeeId,
          employeeName: emp ? emp.name : "Unknown",
          date: rec.date,
          time: rec.time,
          status: rec.status
        });
      });

      // Add absent employees
      employees.forEach((emp) => {
        if (!presentMap[emp.empId]) {
          finalOutput.push({
            employeeId: emp.empId,
            employeeName: emp.name,
            date,
            time: "00:00",
            status: "Absent"
          });
        }
      });
    }

    // STEP 3: Sort by date, then employeeId
    finalOutput.sort((a, b) => {
      if (a.date !== b.date) return new Date(a.date) - new Date(b.date);
      return a.employeeId.localeCompare(b.employeeId);
    });

    res.json(finalOutput);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};


