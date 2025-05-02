const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Connect to MongoDB using the connection string from the .env file
    await mongoose.connect(process.env.MONGODB_URI);  // No need for useNewUrlParser and useUnifiedTopology

    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1); // Exit the process if connection fails
  }
};

module.exports = connectDB;
