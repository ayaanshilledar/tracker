# Expense Tracker Backend

Express + MongoDB backend for the Expense Tracker frontend.

Features
- REST endpoints for expenses (CRUD)
- Validation and error middleware
- Dynamic CORS to allow a Vercel-hosted frontend

Environment variables (.env)
- MONGO_URI - required. MongoDB Atlas connection string.
- PORT - optional, defaults to 4000.
- FRONTEND_URL - optional: full URL of frontend (eg http://localhost:5173 or https://my-app.vercel.app)
- VERCEL_URL - set automatically by Vercel in production (like my-app.vercel.app). This is used if FRONTEND_URL is not set.
- CORS_WHITELIST - optional comma-separated list of additional allowed origins.

Quick start
1. copy `.env.example` to `.env` and fill in values.
2. cd backend
3. npm install
4. npm run dev  # for local development (needs nodemon)
   or
   npm start    # production

API Endpoints
- POST /api/expenses  - create expense { title, amount, category, date }
- GET /api/expenses   - list all expenses (sorted newest first)
- GET /api/expenses/:id - get single expense
- PUT /api/expenses/:id - update expense
- DELETE /api/expenses/:id - delete expense

## Deployment

### Heroku Deployment

1. Create a new app on Heroku
2. Connect your GitHub repository or use Heroku CLI
3. Set the following environment variables in Heroku:
   - MONGO_URI: Your MongoDB connection string
   - FRONTEND_URL: Your deployed frontend URL (e.g., https://your-app.vercel.app)
4. Deploy the app

### Railway Deployment

1. Create a new project on Railway
2. Connect your GitHub repository
3. Set the environment variables:
   - MONGO_URI: Your MongoDB connection string
   - FRONTEND_URL: Your deployed frontend URL
4. Deploy the app

### DigitalOcean App Platform

1. Create a new app on DigitalOcean App Platform
2. Connect your GitHub repository
3. Set the environment variables in the "Environment Variables" section:
   - MONGO_URI: Your MongoDB connection string
   - FRONTEND_URL: Your deployed frontend URL
4. Configure the app to run `npm start` as the run command
5. Deploy the app

### Environment Variables for Production

Make sure to set these environment variables in your hosting platform:

```
MONGO_URI=your_mongodb_connection_string
PORT=4000
FRONTEND_URL=https://your-deployed-frontend-url.com
CORS_WHITELIST=additional,allowed,origins,separated,by,commas
```

Render Deployment
- Use the `start` script to run in production. Ensure MONGO_URI and PORT are set in Render environment.
- For CORS when frontend is hosted on Vercel, either set FRONTEND_URL to your Vercel URL or rely on VERCEL_URL which Vercel injects.