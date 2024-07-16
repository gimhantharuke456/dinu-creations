const { MongoClient } = require("mongodb");
const bcrypt = require("bcryptjs");
require("dotenv").config(); // Add this line to load environment variables

async function createAdminUser() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI is not defined in the environment variables");
    process.exit(1);
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db();

    const adminUsername = "admin";
    const adminPassword = "adminpassword"; // Change this to a secure password

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const result = await db.collection("users").updateOne(
      { username: adminUsername },
      {
        $set: {
          username: adminUsername,
          password: hashedPassword,
          role: "admin",
        },
      },
      { upsert: true }
    );

    if (result.upsertedCount > 0) {
      console.log("Admin user created successfully");
    } else if (result.modifiedCount > 0) {
      console.log("Admin user updated successfully");
    } else {
      console.log("No changes made to admin user");
    }
  } catch (error) {
    console.error("Error creating admin user:", error);
  } finally {
    await client.close();
  }
}

createAdminUser();
