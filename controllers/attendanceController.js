// const Attendance = require("../models/Attendance");

// const COMPANY_IP_PREFIX = "192.168.29.1"; // Change to your company WiFi IP range

// exports.markAttendance = async (req, res) => {
//   try {
//     const { employeeId } = req.body;

// console.log(req.body,"req.bodyyyyyyy");
// console.log(employeeId,"employeeIdddddd");

//     const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

//     console.log("User IP:", ip);

//     if (!ip.includes(COMPANY_IP_PREFIX)) {
//       return res.status(403).json({
//         message: "Attendance failed. Connect to Company WiFi.",
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

// const COMPANY_IP_PREFIX = "192.168.29";

// exports.markAttendance = async (req, res) => {
//   try {
//     const { employeeId } = req.body;

//     console.log("BODY:", req.body);

//     let ip =
//       req.headers["x-forwarded-for"] ||
//       req.connection.remoteAddress ||
//       req.socket.remoteAddress;

//     // Convert IPv6 → IPv4
//     if (ip.includes("::ffff:")) {
//       ip = ip.split("::ffff:")[1];
//     }

//     console.log("User IP:", ip);

//     // Check if connected to office WiFi
//     if (!ip.startsWith(COMPANY_IP_PREFIX)) {
//       return res.status(403).json({
//         message: "Attendance failed. Connect to Company WiFi.",
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
//     console.log("Error:", err);
//     res.status(500).json({ message: "Server Error" });
//   }
// };





const Attendance = require("../models/Attendance");

const COMPANY_IP_PREFIX = "192.168.29.1";

exports.markAttendance = async (req, res) => {
  try {
    const { employeeId } = req.body;

    console.log("BODY:", req.body);

    let ip =
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress;

    // Convert IPv6 mapped IP → IPv4
    if (ip.includes("::ffff:")) {
      ip = ip.split("::ffff:")[1];
    }

    console.log("User IP:", ip);

    // Check company WiFi
    if (!ip.startsWith(COMPANY_IP_PREFIX)) {
      return res.status(403).json({
        message: "Attendance failed. Connect to Company WiFi.",
      });
    }

    const today = new Date().toISOString().split("T")[0];

    const attendance = new Attendance({
      employeeId,
      date: today,
      time: new Date().toLocaleTimeString(),
      status: "Present",
    });

    await attendance.save();

    res.json({
      message: "Attendance Marked Successfully",
      attendance,
    });
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
