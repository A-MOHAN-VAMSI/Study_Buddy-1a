# Quick Start Guide - StudyBuddy

## ⚡ Get Running in 5 Minutes

### Step 1: Configure Database (.env file)

The project is configured to use a remote Railway database. If you don't have access, update the `.env` file:

```
# backend/.env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=studybuddy
JWT_SECRET=StudyBuddy@2026
PORT=5000
```

If using local MySQL:
1. Start MySQL server
2. Create database: `CREATE DATABASE studybuddy;`

### Step 2: Start Backend

```bash
cd backend
npm install
npm start
```

Expected output:
```
Database models synced successfully.
Server running on port 5000
```

### Step 3: Start Frontend (New Terminal)

```bash
cd frontend
npm install
npm run dev
```

Expected output:
```
Local:   http://localhost:5000
```

### Step 4: Access Application

Open browser to: **http://localhost:5000**

---

## 🧪 Test the Application

### Create Admin Account
1. Click "Sign Up"
2. Fill form with:
   - Name: Admin User
   - Email: admin@test.com
   - Password: Test123
   - Select "Admin" role (if available in dropdown, or change to admin after registration)
3. Click Register

### Create Exam
1. Go to Admin Dashboard
2. Click "+ Create Exam"
3. Add exam details:
   - Title: "Math Quiz"
   - Duration: 30 minutes
   - Questions: Add 2-3 questions
4. Save

### Test as Student
1. Create new account with "student" role
2. Log in as student
3. View available exams
4. Click "Take Exam"
5. Answer questions
6. Submit and view results

---

## 🔧 Project Structure

```
backend/
  ├── server.js          ← Main server file
  ├── .env               ← Database config (update this!)
  ├── routes/            ← API endpoints
  ├── controllers/       ← Business logic
  ├── models/            ← Database schemas
  └── middleware/        ← Authentication

frontend/
  ├── src/
  │   ├── pages/        ← Page components
  │   ├── components/   ← Reusable components
  │   ├── index.css     ← Styles
  │   └── App.jsx       ← Routes
  └── vite.config.js    ← Proxy config
```

---

## ❌ Common Issues

### "Cannot GET /" after starting frontend
- Frontend should run on port 3000, backend on 5000
- Check that both servers are running
- Clear browser cache and refresh

### "Database connection failed"
- Check `.env` file credentials
- Ensure MySQL server is running
- Verify database exists: `CREATE DATABASE studybuddy;`

### "Cannot find token" errors
- Clear localStorage: `localStorage.clear()` in console
- Log out and log back in

### Port already in use
```bash
# Kill process on port 5000 (backend)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Kill process on port 3000 (frontend)
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

---

## ✨ Features to Try

### Student Features
- ✅ Take timed exams
- ✅ Auto-grading after submission
- ✅ View past results
- ✅ Performance statistics

### Admin Features
- ✅ Create/edit exams
- ✅ View student attempts
- ✅ Analytics dashboard
- ✅ Grade distribution charts

---

## 📚 Database Testing

To verify database connection:

```bash
cd backend
node test-db.js
```

If successful, you'll see:
```
Testing DB connection...
Authenticating succeeded.
Syncing models...
Syncing models succeeded. All tables exist or were created.
```

---

## 🚀 Deployment Checklist

Before deploying to production:

- [ ] Update JWT_SECRET in `.env`
- [ ] Use production database credentials
- [ ] Set NODE_ENV=production
- [ ] Run: `npm run build` in frontend folder
- [ ] Deploy backend to hosting service
- [ ] Deploy frontend dist/ folder to CDN/hosting
- [ ] Update API URLs if needed
- [ ] Test all features on production

---

## 📞 Need Help?

1. Check `SETUP_GUIDE.md` for detailed instructions
2. Check backend terminal for error messages
3. Open browser DevTools (F12) for frontend errors
4. Verify `.env` configuration

---

**That's it! Happy testing! 🎉**
