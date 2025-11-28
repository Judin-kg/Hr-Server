const Attendance = require("../models/Attendance");

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


const COMPANY_IP_PREFIX = "49.47.197.59";

exports.markAttendance = async (req, res) => {
  try {
    const { employeeId } = req.body;

    // let ip =
    //   req.headers["x-forwarded-for"] ||
    //   req.connection.remoteAddress ||
    //   req.socket.remoteAddress;

    // ip = ip.replace("::ffff:", ""); // Fix IPv6

    let ip = req.headers["x-forwarded-for"]?.split(",")[0].trim()
        || req.socket.remoteAddress
        || req.connection.remoteAddress;

ip = ip.replace("::ffff:", "");
console.log("User IP:", ip);


    console.log("User IP:", ip);

    if (!ip.startsWith(COMPANY_IP_PREFIX)) {
      return res.status(403).json({
        message: "Attendance failed. Connect to Company WiFi."
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

    res.json({ message: "Attendance Marked Successfully", attendance });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};


