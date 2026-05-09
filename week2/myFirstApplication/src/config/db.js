const mongoose = require('mongoose');

// Replace 'mongodb://localhost:27017/mydatabasename' with your MongoDB connection string
const mongoURI = 'mongodb+srv://nirmal:12345@coderfacultycluster.q0wekcm.mongodb.net/myFirstApplication?appName=coderfacultyCluster';

// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
  
 module.exports = mongoose;