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
         department:user.department,
        salary: user.salary,
        image: user.image,
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
    const { empId, name, password, role,department,salary,image } = req.body;

    const exist = await Employee.findOne({ empId });
    if (exist) {
      return res.status(400).json({ message: "Employee ID already exists" });
    }

    const newEmp = new Employee({
      empId,
      name,
      password,
      department,
      salary,
      image,
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
    const employees = await Employee.find()
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



// exports.updateEmployee = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const {
//       empId,
//       name,
//       password,
//       role,
//       department,
//       salary,
//       image,
//     } = req.body;

//     // 🔒 Optional: prevent empty update
//     if (!name && !department && !role && !teamHead && !password) {
//       return res.status(400).json({ message: "Nothing to update" });
//     }

//     const updatedEmployee = await Employee.findByIdAndUpdate(
//       id,
//       {
//         empId,
//         name,
//         password,
//         role,
//         department,
//         salary,
//         image
        
//       },
//       {
//         new: true,
//         runValidators: true,
//       }
//     ).populate("teamHead"); // ⭐ return team head details

//     if (!updatedEmployee) {
//       return res.status(404).json({ message: "Employee not found" });
//     }

//     res.json({
//       message: "Employee updated successfully",
//       employee: updatedEmployee,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server Error" });
//   }
// };





// 🔁 UPDATE EMPLOYEE
exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const {
      name,
      password,
      role,
      department,
      salary,
      image,
     
    } = req.body;

    // 🔄 Update only sent fields
    if (name !== undefined) employee.name = name;
    if (password !== undefined) employee.password = password;
    if (role !== undefined) employee.role = role;
    if (department !== undefined) employee.department = department;
    if (salary !== undefined) employee.salary = Number(salary);
    if (image !== undefined) employee.image = image;
    

    await employee.save();

    // 🔥 return populated response
    const updatedEmployee = await Employee.findById(id).populate(
      
      "name empId department",
    );

    res.json({
      message: "Employee updated successfully",
      employee: updatedEmployee,
    });
  } catch (err) {
    console.error("Update employee error:", err);
    res.status(500).json({ message: "Server error" });
  }
};