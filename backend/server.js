const express = require('express');
const cors = require('cors');
const { connectDB, sequelize } = require('./config/db');
require('dotenv').config();

const app = express();
const adminRoutes = require("./routes/admin");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/exams', require('./routes/exams'));
app.use('/api/results', require('./routes/results'));


app.use("/api/admin", adminRoutes);

// Basic health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date() });
});

// Global error handler
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;

// Connect to DB and sync models
const startServer = async () => {
  try {
    await connectDB();
    
    // Sync models - in dev we can use { alter: true } or { force: false }
    // sync() will create tables if they do not exist
    await sequelize.sync({ force: false });
    console.log('Database models synced successfully.');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Server startup failed:', error);
    process.exit(1);
  }
};

startServer();
