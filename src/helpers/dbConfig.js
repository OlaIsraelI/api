const mongoose = require('mongoose');


// Connect to MongoDB database

const connectDB = async () => {
  await mongoose.connect("mongodb://localhost:27017/blog-api").then(() => console.log("database connected") ).catch((error) => console.log(error));
}

module.exports = connectDB;