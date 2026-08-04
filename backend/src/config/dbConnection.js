const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("database is connected");
  } catch (err) {
    console.log("mongo db connection error is:", err.stack);
    throw err
  }
};

module.exports = connectToDb;
