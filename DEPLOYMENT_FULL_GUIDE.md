# Complete Deployment Guide

This guide covers the complete deployment process for both the backend and frontend of the Expense Tracker application.

## Prerequisites

- Node.js and npm installed
- MongoDB database (local or cloud)
- Git installed
- Accounts on chosen deployment platforms

## Backend Deployment

### 1. Choose a Hosting Platform

Recommended platforms:
- Heroku (good for simple deployments)
- Railway (modern alternative to Heroku)
- DigitalOcean App Platform (scalable solution)

### 2. Set Environment Variables

Configure these environment variables in your hosting platform:

```
MONGO_URI=your_mongodb_connection_string
PORT=4000
FRONTEND_URL=https://your-deployed-frontend-url.com
CORS_WHITELIST=additional,allowed,origins,separated,by,commas
```

### 3. Deploy the Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Initialize git repository (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial backend commit"
   ```

3. Push to your preferred hosting platform following their deployment instructions.

## Frontend Deployment

### 1. Update Environment Variables

Update the [.env.production](file:///c:/Users/ayaan/OneDrive/Desktop/Code/Tracker/frontend/.env.production) file with your deployed backend URL:

```bash
# In frontend/.env.production
VITE_API_URL=https://your-deployed-backend-url.com
```

### 2. Build the Application

```bash
cd frontend
npm run build:prod
```

### 3. Deploy to a Static Hosting Service

Recommended platforms:
- Vercel (seamless React integration)
- Netlify (great for static sites)
- GitHub Pages (free option)

### 4. Deployment Steps for Vercel

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to your Vercel account:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   cd frontend
   vercel --prod
   ```

### 5. Deployment Steps for Netlify

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Login to your Netlify account:
   ```bash
   netlify login
   ```

3. Deploy:
   ```bash
   cd frontend
   netlify deploy --prod
   ```

## Git Repository Setup

Since the frontend was cloned from another repository, you'll need to set up a new repository for this project:

### 1. Initialize New Repositories

```bash
# For backend
cd backend
git init
git add .
git commit -m "Initial backend commit"

# For frontend
cd ../frontend
git init
git add .
git commit -m "Initial frontend commit"
```

### 2. Create New Repositories on GitHub/GitLab

1. Create separate repositories for backend and frontend on your preferred platform
2. Add the remote origins:
   ```bash
   # For backend
   git remote add origin https://github.com/yourusername/expense-tracker-backend.git
   
   # For frontend
   git remote add origin https://github.com/yourusername/expense-tracker-frontend.git
   ```

### 3. Push to Remote Repositories

```bash
# For backend
git push -u origin main

# For frontend
git push -u origin main
```

## Post-Deployment Checklist

- [ ] Verify CORS settings are correct
- [ ] Test authentication flows
- [ ] Ensure all API calls are using the correct URLs
- [ ] Check if environment variables are properly loaded
- [ ] Test the application in production mode
- [ ] Verify that the frontend and backend can communicate

## Additional Tips

### Environment Variables
Always use `import.meta.env.VITE_API_URL` to access environment variables in your frontend code.

### API Calls
The frontend now uses the [api.ts](file:///c:/Users/ayaan/OneDrive/Desktop/Code/Tracker/frontend/src/services/api.ts) service to make API calls to the backend:
```javascript
import { expenseApi } from '@/services/api';

// Get all expenses
const expenses = await expenseApi.getAll();

// Create new expense
const newExpense = await expenseApi.create(expenseData);
```

### Security
- Never commit .env files to version control (they're already in .gitignore)
- Use HTTPS for all production URLs
- Implement proper error handling for API calls

### Monitoring
- Set up error tracking (e.g., Sentry)
- Implement logging for backend services
- Monitor API performance and availability

## Troubleshooting

### CORS Issues
If you encounter CORS issues:
1. Check that `FRONTEND_URL` is correctly set in your backend environment variables
2. Verify that `CORS_WHITELIST` includes your frontend URL if it's different
3. Restart your backend server after making environment variable changes

### API Connection Issues
If the frontend can't connect to the backend:
1. Verify that `VITE_API_URL` is correctly set in your frontend environment
2. Check that the backend is running and accessible
3. Ensure that the backend URL doesn't have a trailing slash

### Build Issues
If you encounter build issues:
1. Ensure all dependencies are installed: `npm install`
2. Check that environment variables are set correctly
3. Verify that there are no TypeScript errors: `npm run build`

## Deployment Scripts

The frontend now includes these helpful scripts in [package.json](file:///c:/Users/ayaan/OneDrive/Desktop/Code/Tracker/frontend/package.json):
- `npm run build:prod` - Build for production
- `npm run deploy` - Prepare for deployment