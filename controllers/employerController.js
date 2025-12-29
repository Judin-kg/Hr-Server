const Employer = require("../models/Employer");


// Create Employee (admin only)
exports.createEmployer = async (req, res) => {
  try {
    const { name,teamHead,department,image } = req.body;

    const exist = await Employer.findOne({ name });
    if (exist) {
      return res.status(400).json({ message: "Employee ID already exists" });
    }

    const newEmp = new Employer({
      name,
      teamHead,
      department,
      image
     });

    await newEmp.save();

    res.json({ message: "Employee created successfully", employee: newEmp });
  } catch (err) {
    console.log("Create Employee Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};













// Get all employees (admin)
exports.getEmployer = async (req, res) => {
  try {
    const employees = await Employer.find()
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
exports.deleteEmployer = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Employer.findOneAndDelete({ _id: id });

    if (!deleted) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({ message: "Employee deleted successfully" });

  } catch (err) {
    console.log("Delete Employee Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};



exports.updateEmployer = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      empId,
      name,
      password,
      role,
      department,
      teamHead, // ObjectId of TeamHead
    } = req.body;

    // 🔒 Optional: prevent empty update
    if (!name && !department && !role && !teamHead && !password) {
      return res.status(400).json({ message: "Nothing to update" });
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      {
        empId,
        name,
        password,
        role,
        department,
        teamHead: teamHead || null, // allow remove team head
      },
      {
        new: true,
        runValidators: true,
      }
    ).populate("teamHead"); // ⭐ return team head details

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({
      message: "Employee updated successfully",
      employee: updatedEmployee,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};