# 🔧 Troubleshooting Guide - OTT Platform

## 🚨 Common Issues and Solutions

### Issue 1: "Failed to Load Videos" Error

**Symptoms:**
- Homepage shows "Failed to load videos"
- Empty video sections
- Error toasts appearing

**Solutions:**

#### Solution A: Backend Not Running
```bash
# Check if backend is running
# Open backend terminal and run:
cd C:\Users\Dell\Desktop\mansoor\ott-platform\backend
npm run dev
```

**Expected Output:**
```
🚀 Server running in development mode on port 5000
MongoDB Connected: cluster0.hcf7let.mongodb.net
```

#### Solution B: No Videos in Database
```bash
# Seed movies to database
cd C:\Users\Dell\Desktop\mansoor\ott-platform\backend
npm run seed-movies
```

#### Solution C: MongoDB Not Connected
1. Check `backend/.env` file
2. Verify `MONGODB_URI` is correct
3. Ensure IP is whitelisted in MongoDB Atlas
4. Test connection: `npm run seed`

#### Solution D: Frontend API URL Wrong
Check `frontend/.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

### Issue 2: CORS Errors

**Symptoms:**
- Console shows "CORS policy" errors
- API requests blocked

**Solution:**
Backend `server.js` should have:
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
```

---

### Issue 3: Port Already in Use

**Symptoms:**
```
Error: Port 5000 is already in use
```

**Solutions:**

#### Option A: Kill Process
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or restart computer
```

#### Option B: Change Port
In `backend/.env`:
```env
PORT=5001
```

In `frontend/.env`:
```env
REACT_APP_API_URL=http://localhost:5001/api
```

---

### Issue 4: Videos Not Showing After Refresh

**Solution:**
```bash
# Clear browser cache
Ctrl + Shift + Delete

# Or hard refresh
Ctrl + Shift + R

# Or restart frontend
cd frontend
npm start
```

---

### Issue 5: MongoDB Connection Failed

**Symptoms:**
```
MongoServerError: bad auth: Authentication failed
```

**Solutions:**

#### Check Credentials
1. Verify username/password in `.env`
2. URL encode special characters:
   - `@` → `%40`
   - `#` → `%23`
   - `$` → `%24`

#### Check IP Whitelist
1. Go to MongoDB Atlas
2. Network Access
3. Add Current IP or 0.0.0.0/0

#### Check Connection String
```env
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster0.hcf7let.mongodb.net/ott-platform?retryWrites=true&w=majority
```

---

### Issue 6: CSS Not Loading / Styles Broken

**Solutions:**

#### Clear Cache
```bash
# Stop frontend (Ctrl + C)
# Delete cache
rm -rf node_modules/.cache

# Restart
npm start
```

#### Rebuild Tailwind
```bash
cd frontend
npm install
npm start
```

---

### Issue 7: "Module Not Found" Errors

**Solution:**
```bash
# Delete and reinstall
cd frontend  # or backend
rm -rf node_modules package-lock.json
npm install
```

---

### Issue 8: Images/Posters Not Loading

**Symptoms:**
- Broken image icons
- Placeholder images showing

**Solutions:**

#### Check Internet Connection
- Posters use Unsplash URLs
- Requires internet connection

#### Use Local Images
Upload actual video files and posters via admin panel

---

### Issue 9: Login/Register Not Working

**Solutions:**

#### Check Backend Logs
Look for errors in backend terminal

#### Check JWT Secrets
In `backend/.env`:
```env
JWT_SECRET=your_secret_here
JWT_REFRESH_SECRET=your_refresh_secret_here
```

#### Clear LocalStorage
```javascript
// In browser console (F12)
localStorage.clear();
location.reload();
```

---

### Issue 10: Admin Panel Not Accessible

**Solutions:**

#### Reset Admin Credentials
```bash
cd backend
npm run reset-admin
```

#### Check Role
Admin email must have `role: 'admin'` in database

#### Clear Cookies
```javascript
// Browser console
document.cookie.split(";").forEach(c => {
  document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
});
```

---

## 🔍 Debugging Steps

### Step 1: Check Backend Health
```bash
# Open in browser
http://localhost:5000/api/health
```

**Expected Response:**
```json
{
  "status": "OK",
  "message": "API is running"
}
```

### Step 2: Check Videos Endpoint
```bash
# Open in browser
http://localhost:5000/api/videos
```

**Should return:** Array of video objects

### Step 3: Check Browser Console
1. Open DevTools (F12)
2. Go to Console tab
3. Look for errors (red text)
4. Check Network tab for failed requests

### Step 4: Check Backend Logs
Look at terminal running `npm run dev`
- Green text = success
- Red text = errors

---

## 📊 Verification Checklist

Before reporting issues, verify:

- [ ] Backend running (`npm run dev`)
- [ ] Frontend running (`npm start`)
- [ ] MongoDB connected (check backend logs)
- [ ] Videos seeded (`npm run seed-movies`)
- [ ] Admin created (`npm run seed`)
- [ ] `.env` files configured correctly
- [ ] Ports 5000 and 3000 available
- [ ] Internet connection active
- [ ] Browser cache cleared

---

## 🆘 Still Having Issues?

### Get Detailed Error Info

1. **Backend Terminal**: Copy full error message
2. **Browser Console**: Copy red error messages
3. **Network Tab**: Check failed API calls

### Check These Files

1. `backend/.env` - MongoDB URI correct?
2. `frontend/.env` - API URL correct?
3. `backend/server.js` - CORS configured?
4. MongoDB Atlas - IP whitelisted?

---

## 🎯 Quick Fixes

### Complete Reset
```bash
# Stop all servers (Ctrl + C)

# Backend
cd backend
rm -rf node_modules package-lock.json
npm install
npm run seed
npm run seed-movies
npm run dev

# Frontend (new terminal)
cd frontend
rm -rf node_modules package-lock.json
npm install
npm start
```

### Database Reset
```bash
# Delete all data and reseed
cd backend
npm run seed
npm run seed-movies
npm run reset-admin
```

---

## 📞 Support

If issues persist:
1. Check all steps above
2. Review error messages carefully
3. Verify environment variables
4. Test backend health endpoint
5. Check MongoDB Atlas dashboard

---

**Most issues are solved by:**
1. ✅ Ensuring backend is running
2. ✅ Having videos in database
3. ✅ Correct MongoDB connection
4. ✅ Proper `.env` configuration

