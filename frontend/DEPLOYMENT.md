# Deployment Guide

## Backend Deployment

1. Choose a hosting platform (Heroku, Railway, DigitalOcean, etc.)
2. Set the following environment variables in your hosting platform:
   - MONGO_URI: Your MongoDB connection string
   - FRONTEND_URL: Your frontend URL (e.g., https://your-app.vercel.app)
   - CORS_WHITELIST: Any additional allowed origins (comma-separated)
3. Ensure MongoDB connection is properly configured
4. Note down the deployed URL to use in frontend configuration

## Frontend Deployment

1. Update `.env.production` with the backend URL:
   ```
   VITE_API_URL=https://your-backend-url.com
   ```
2. Build the project using:
   ```bash
   npm run build:prod
   ```
3. Deploy the `dist` folder to platforms like Vercel, Netlify, or GitHub Pages

## Post-Deployment Checklist

- [ ] Verify CORS settings are correct
- [ ] Test authentication flows
- [ ] Ensure all API calls are using the correct URLs
- [ ] Check if environment variables are properly loaded
- [ ] Test the application in production mode

## Additional Tips

### Environment Variables
Always use `import.meta.env.VITE_API_URL` to access environment variables in your frontend code.

### API Calls
Update your API calls to use the environment variable:
```javascript
const response = await fetch(`${import.meta.env.VITE_API_URL}/api/expenses`, {
  // ... options
});
```

### Security
- Never commit .env files to version control
- Add .env and .env.production to your .gitignore (already done)
- Use HTTPS for all production URLs
- Implement proper error handling for API calls

### Monitoring
- Set up error tracking (e.g., Sentry)
- Implement logging for backend services
- Monitor API performance and availability

## Deployment Scripts

- `npm run build:prod` - Build for production
- `npm run deploy` - Prepare for deployment