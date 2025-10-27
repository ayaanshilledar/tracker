require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');
const expensesRouter = require('./routes/expenses');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();

// middleware
app.use(express.json());
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Dynamic CORS configuration to allow Vercel-hosted frontend
const allowedOriginResolver = (origin, callback) => {
  // If no origin (server-to-server or same-origin request), allow
  if (!origin) return callback(null, true);

  const vercelUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null;
  const defaultFrontend = process.env.FRONTEND_URL || vercelUrl || 'http://localhost:5173';

  const whitelist = (process.env.CORS_WHITELIST || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  const allowed = [defaultFrontend, ...whitelist];
  if (allowed.includes(origin)) {
    callback(null, true);
  } else {
    callback(new Error('Not allowed by CORS'));
  }
};

app.use(
  cors({
    origin: allowedOriginResolver,
    credentials: true,
  })
);

// routes
app.use('/api/expenses', expensesRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// error handlers
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to DB:', err.message || err);
    process.exit(1);
  });
