const  Employee= require("./models/Employee");

async function seedEmployee() {
  try {
    const exists = await Employee.findOne({ empId: "rj123" });
    console.log(exists,"existssssss");
    if (exists) {
      console.log("⚠️ Admin already exists, skipping seeding");
      return;
    }

     const admin = new Employee({
      name: "superadmin",  // 👈 required field
       empId: "rj123",
      password: "securepassword123",
     });

    console.log(admin,"adminnnnnnnn");

    await admin.save();
    console.log("✅ Admin user created successfully!");
  } catch (err) {
    console.error("❌ Error creating admin:", err.message);
  }
}

module.exports = seedEmployee;