const Employee = require("../models/Employee");

exports.loginEmployee = async (req, res) => {
  try {
    const { empId, password } = req.body;

    const user = await Employee.findOne({ empId });

    if (!user) {
      return res.status(400).json({ message: "Invalid ID or Password" });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid ID or Password" });
    }

    res.json({
      message: "Login Successful",
      role: user.role,
      user: {
        empId: user.empId,
        name: user.name,
        role: user.role
      }
    });

  } catch (err) {
    console.log("Login Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};


// Create Employee (admin only)
exports.createEmployee = async (req, res) => {
  try {
    const { empId, name, password, role,department } = req.body;

    const exist = await Employee.findOne({ empId });
    if (exist) {
      return res.status(400).json({ message: "Employee ID already exists" });
    }

    const newEmp = new Employee({
      empId,
      name,
      password,
      department,
      role
    });

    await newEmp.save();

    res.json({ message: "Employee created successfully", employee: newEmp });
  } catch (err) {
    console.log("Create Employee Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get all employees (admin)
exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete Employee (Admin only)
// exports.deleteEmployee = async (req, res) => {
//   try {
//     const { empId } = req.params;
//       console.log(req.params,"empIdddddd");
//       console.log("Deleting Employee with ID:", empId);
//     const emp = await Employee.findOneAndDelete({ empId });
//      console.log(emp,"pppppppppppppppppppp");
     
//     if (!emp) {
//       return res.status(404).json({ message: "Employee not found" });
//     }

//     res.json({ message: "Employee deleted successfully" });

//   } catch (err) {
//     console.log("Delete Employee Error:", err);
//     res.status(500).json({ message: "Server Error" });
//   }
// };
exports.deleteEmployee = async (req, res) => {
  try {
    const { empId } = req.params;

    const deleted = await Employee.findOneAndDelete({ _id: empId });

    if (!deleted) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({ message: "Employee deleted successfully" });

  } catch (err) {
    console.log("Delete Employee Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};