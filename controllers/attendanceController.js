



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





const Attendance = require("../models/Attendance");

// Company WiFi IP
const COMPANY_IP_PREFIX = "49.47.197.59";

// Time restrictions (10:00 AM to 10:15 AM)
const START_TIME = "10:00";
const END_TIME = "10:15";

function isWithinTimeRange() {
  const now = new Date();

  // Current time as HH:MM (24 hr format)
  const current = now.toTimeString().slice(0, 5);

  return current >= START_TIME && current <= END_TIME;
}

exports.markAttendance = async (req, res) => {
  try {
    const { employeeId } = req.body;

    // Extract real IP
    let ip =
      req.headers["x-forwarded-for"]?.split(",")[0].trim() ||
      req.socket.remoteAddress ||
      req.connection.remoteAddress;

    ip = ip.replace("::ffff:", "");

    console.log("User IP:", ip);

    // WiFi check
    if (!ip.startsWith(COMPANY_IP_PREFIX)) {
      return res.status(403).json({
        message: "Attendance failed. Connect to Company WiFi.",
      });
    }

    // Time check
    if (!isWithinTimeRange()) {
      return res.status(403).json({
        message: "Attendance can only be marked between 10:00 AM and 10:15 AM.",
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
    res.status(500).json({ message: "Server Error" });
  }
};


