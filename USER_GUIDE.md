# Ikonex Academy Student Management System - User Guide

## Welcome! 👋

This guide will walk you through setting up, deploying, and using the Ikonex Academy Student Management System. Whether you're running it locally or deploying to the cloud, we've got you covered.

---

## Table of Contents

1. [System Overview](#system-overview)
2. [Local Setup](#local-setup)
3. [Database Setup](#database-setup)
4. [Running the Application](#running-the-application)
5. [Deployment to Vercel](#deployment-to-vercel)
6. [Using the System](#using-the-system)
7. [Troubleshooting](#troubleshooting)

---

## System Overview

This is a full-stack student management system built with:
- **Frontend**: React (with Vite)
- **Backend**: Node.js (Express)
- **Database**: PostgreSQL

The system helps you manage students, streams (classes), subjects, scores, and generate reports.

---

## Local Setup

### Prerequisites

Before you begin, make sure you have installed:
- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **PostgreSQL** - [Download here](https://www.postgresql.org/download/)
- **Git** (optional, for version control) - [Download here](https://git-scm.com/downloads)

### Step 1: Get the Code

If you have the code already, great! If not, clone it from your repository:
```bash
git clone <your-repository-url>
cd student-management-system
```

### Step 2: Install Dependencies

Install the backend dependencies:
```bash
npm install
```

Install the frontend dependencies:
```bash
cd frontend
npm install
cd ..
```

---

## Database Setup

### Step 1: Create the Database

Open your terminal or command prompt and create a new PostgreSQL database:
```bash
createdb ikonex_db
```

You'll be prompted for your PostgreSQL password. Enter the password you set when installing PostgreSQL.

### Step 2: Run the Database Schema

This creates all the necessary tables:
```bash
psql -U postgres -d ikonex_db -f database/schema.sql
```

### Step 3: Seed the Database with Sample Data

This adds sample students, streams, and subjects:
```bash
psql -U postgres -d ikonex_db -f database/seed.sql
```

### Step 4: Configure Database Connection

Open `backend/.env` and update the database URL with your PostgreSQL password:
```
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/ikonex_db
PORT=5000
```

Replace `YOUR_PASSWORD` with your actual PostgreSQL password.

---

## Running the Application

### Option 1: Run Both Frontend and Backend Together

This is the easiest way - it starts both servers at once:
```bash
npm run dev
```

- **Backend**: http://localhost:5000
- **Frontend**: http://localhost:5173

### Option 2: Run Separately

If you prefer to run them in separate terminals:

**Terminal 1 - Backend:**
```bash
npm run backend
```

**Terminal 2 - Frontend:**
```bash
npm run frontend
```

### Access the Application

Open your browser and go to:
```
http://localhost:5173
```

You should see the Ikonex Academy dashboard with your student data!

---

## Deployment to Vercel

Vercel is a great platform for deploying web applications. Here's how to deploy your system:

### Step 1: Prepare Your Code for Deployment

1. **Push your code to GitHub** (if not already done)
   - Create a repository on GitHub
   - Push your code to the repository
   - Make sure to exclude sensitive files (like `.env` with real passwords)

2. **Update your `.env` for production**
   - You'll need a cloud database (see below)
   - Don't commit your local `.env` file with real passwords

### Step 2: Set Up a Cloud Database

Since Vercel doesn't host databases, you'll need a cloud PostgreSQL service. Popular options:

- **Supabase** (Free tier available) - [supabase.com](https://supabase.com)
- **Neon** (Free tier available) - [neon.tech](https://neon.tech)
- **Railway** (Has database hosting) - [railway.app](https://railway.app)
- **Render** (Has database hosting) - [render.com](https://render.com)

**Example with Supabase:**
1. Create a free account at supabase.com
2. Create a new project
3. Go to Settings → Database
4. Copy the connection string
5. It will look like: `postgresql://postgres:[YOUR-PASSWORD]@db.supabase.co:5432/postgres`

### Step 3: Deploy to Vercel

1. **Create a Vercel account** at [vercel.com](https://vercel.com) (it's free!)

2. **Import your project**
   - Click "Add New Project"
   - Import from GitHub
   - Select your repository

3. **Configure environment variables**
   - In Vercel project settings, go to "Environment Variables"
   - Add `DATABASE_URL` with your cloud database connection string
   - Add `PORT` with value `5000`

4. **Deploy!**
   - Click "Deploy"
   - Vercel will build and deploy your application
   - Wait for the deployment to complete (usually 2-3 minutes)

5. **Access your deployed app**
   - Vercel will give you a URL like `https://your-app.vercel.app`
   - Share this URL with others!

### Step 4: Set Up Your Cloud Database

After deploying, you need to set up your cloud database tables:

1. Connect to your cloud database using their SQL editor or a tool like DBeaver
2. Run the contents of `database/schema.sql`
3. Run the contents of `database/seed.sql` (if you want sample data)

### Alternative: Railway (All-in-One)

If you want an easier option that hosts both your app and database together, try [Railway](https://railway.app):

1. Create a Railway account
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Railway will detect your Node.js app and PostgreSQL
5. Add a PostgreSQL service
6. Configure environment variables
7. Deploy!

Railway handles everything in one place - no separate database setup needed.

---

## Using the System

### Dashboard

The dashboard gives you a quick overview:
- **Enrolled Students**: Total number of students
- **Active Streams**: Number of classes/streams
- **Tracked Subjects**: Number of subjects being taught

### Student Directory

**View Students**: See all enrolled students in a table
- Shows student ID, name, stream, and registration date

**Add New Student**:
1. Click "Student Directory" in the sidebar
2. Fill in the form with student details
3. Select the stream (class)
4. Click "Register Student"

**Edit/Delete Students**:
- Click the edit button next to a student to update their information
- Click the delete button to remove a student (be careful - this can't be undone!)

### Streams Management

**View Streams**: See all available streams (classes)
- Each stream shows the number of enrolled students

**Add New Stream**:
1. Click "Streams" in the sidebar
2. Enter the stream name (e.g., "Grade 10", "Science Stream")
3. Click "Add Stream"

### Score Management

**Enter Scores**:
1. Click "Scores" in the sidebar
2. Select a stream (class)
3. Select a subject
4. You'll see all students in that stream
5. Enter CA (Continuous Assessment) scores (0-40)
6. Enter Exam scores (0-60)
7. Click "Submit Scores"

**Score Limits**:
- CA: Maximum 40 points
- Exam: Maximum 60 points
- Total: 100 points

### Reports & Rankings

**View Rankings**:
1. Click "Rankings" in the sidebar
2. Select a stream
3. See students ranked by their total scores
4. Shows position, student name, and total score

---

## Troubleshooting

### Dashboard shows 0 data

**Problem**: Dashboard shows zeros even though backend is running.

**Solution**:
1. Check that your backend is connected to the database
2. Restart the backend server after updating `.env`
3. Open browser console (F12) to see error messages
4. Verify database has data by running: `psql -U postgres -d ikonex_db -c "SELECT COUNT(*) FROM students;"`

### Backend won't start

**Problem**: Backend fails to start with database connection errors.

**Solution**:
1. Verify PostgreSQL is running
2. Check your `.env` file has correct database credentials
3. Make sure the database `ikonex_db` exists
4. Test database connection: `psql -U postgres -d ikonex_db`

### Frontend shows blank pages

**Problem**: Clicking navigation buttons shows blank pages.

**Solution**:
1. Ensure backend is running on port 5000
2. Check browser console (F12) for API errors
3. Verify CORS is configured in backend
4. Make sure you're not blocking localhost in your browser

### Database connection errors

**Problem**: "password authentication failed" or similar errors.

**Solution**:
1. Double-check your PostgreSQL password in `.env`
2. Make sure PostgreSQL service is running
3. Try connecting manually: `psql -U postgres -d ikonex_db`
4. Reset PostgreSQL password if needed

### Deployment issues

**Problem**: Vercel deployment fails.

**Solution**:
1. Check Vercel build logs for specific errors
2. Ensure all dependencies are in `package.json`
3. Verify environment variables are set correctly in Vercel
4. Make sure your cloud database is accessible

### Need more help?

If you're still stuck:
1. Check the browser console (F12) for error messages
2. Check the backend terminal for error logs
3. Review the database connection in `.env`
4. Make sure PostgreSQL is running

---

## Tips for Success

💡 **Always restart the backend** after changing `.env` file

💡 **Use the browser console** (F12) to debug frontend issues

💡 **Keep your database password secure** - never commit it to GitHub

💡 **Test locally first** before deploying to production

💡 **Back up your database** regularly if using it for real student data

💡 **Use meaningful stream and subject names** for better organization

---

## Security Notes

⚠️ **Never commit your `.env` file** with real passwords to GitHub

⚠️ **Use strong passwords** for your database

⚠️ **Consider adding authentication** if deploying for real school use

⚠️ **Regularly update dependencies** for security patches

---

## What's Next?

Now that you have your system running, you might want to:
- Add user authentication (login system)
- Export data to Excel/CSV
- Add more detailed reports
- Integrate with other school systems
- Add parent/teacher portals

---

## Support

If you need help or find bugs, feel free to reach out or check the project repository.

---

**Happy managing! 🎓**

*This guide was created to make your experience as smooth as possible. If anything is unclear, don't hesitate to ask for help!*
