const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error('MONGO_URI not set in environment');
  }

  // Use mongoose connect and return the connection promise
  await mongoose.connect(uri, {
    // these options are current defaults in mongoose v6+, but keeping for clarity
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('MongoDB connected');
}

module.exports = connectDB;
