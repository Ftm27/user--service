const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/mvpdb");
    console.log("mongodb connected");
  } catch (error) {
    console.error("mongodb connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
