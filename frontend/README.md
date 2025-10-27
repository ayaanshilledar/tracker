# Expense Tracker Frontend

This is the frontend for the Expense Tracker application, built with React, TypeScript, and Vite.

## Project info

**URL**: https://lovable.dev/projects/ff631b6e-aa35-4119-8959-0ba3c46ebe49

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/ff631b6e-aa35-4119-8959-0ba3c46ebe49) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/ff631b6e-aa35-4119-8959-0ba3c46ebe49) and click on Share -> Publish.

## Deployment

### Vercel Deployment

1. Sign up or log in to Vercel
2. Create a new project and import your frontend repository
3. Configure the project settings:
   - Framework: Vite
   - Build Command: `npm run build:prod`
   - Output Directory: `dist`
4. Add environment variables:
   - VITE_API_URL: Your deployed backend URL (e.g., https://your-backend-app.herokuapp.com)
5. Deploy the project

### Netlify Deployment

1. Sign up or log in to Netlify
2. Click "New site from Git" and select your repository
3. Configure the build settings:
   - Build command: `npm run build:prod`
   - Publish directory: `dist`
4. Add environment variables in the "Environment variables" section:
   - VITE_API_URL: Your deployed backend URL
5. Deploy the site

### GitHub Pages Deployment

1. Install the gh-pages package:
   ```bash
   npm install gh-pages --save-dev
   ```

2. Add deployment scripts to [package.json](file:///c:/Users/ayaan/OneDrive/Desktop/Code/Tracker/frontend/package.json):
   ```json
   "scripts": {
     "predeploy": "npm run build:prod",
     "deploy": "gh-pages -d dist"
   }
   ```

3. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```

### Environment Variables

For production deployment, create a [.env.production](file:///c:/Users/ayaan/OneDrive/Desktop/Code/Tracker/frontend/.env.production) file with:
```
VITE_API_URL=https://your-deployed-backend-url.com
```

For development, the [.env](file:///c:/Users/ayaan/OneDrive/Desktop/Code/Tracker/frontend/.env) file should contain:
```
VITE_API_URL=http://localhost:4000
```

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)