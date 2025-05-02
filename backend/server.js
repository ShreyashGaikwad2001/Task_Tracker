const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');
const errorMiddleware = require('./middlewares/errorMiddleware');
const authMiddleware = require('./middlewares/authMiddleware'); // <-- Added authMiddleware

// Load environment variables
dotenv.config();

const app = express();

// Middleware Setup
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
app.use(express.json()); // Middleware to parse incoming JSON data

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Exit process with failure code
  });

// Routes Setup
app.use('/api/auth', authRoutes); // Auth-related routes
app.use('/api/projects', authMiddleware, projectRoutes); // Projects routes (protected by authMiddleware)
app.use('/api/tasks', authMiddleware, taskRoutes); // Tasks routes (protected by authMiddleware)

// Global error handling middleware
app.use(errorMiddleware);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
