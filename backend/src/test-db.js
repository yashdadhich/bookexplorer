require('dotenv').config();
const mongoose = require('mongoose');

async function testDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(" Connected to MongoDB Atlas!");
    await mongoose.connection.close();
    console.log(" Connection closed successfully.");
    process.exit(0);
  } catch (err) {
    console.error(" MongoDB connection error:", err.message);
    process.exit(1);
  }
}

testDB();
