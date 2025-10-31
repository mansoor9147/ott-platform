# 🚀 Start Your OTT Platform - Complete Guide

Follow these steps in order to run your project with MongoDB Atlas.

---

## 📋 Prerequisites Checklist

- [x] MongoDB Atlas account created
- [x] Cluster created in Atlas
- [x] Database user created in Atlas
- [x] IP address whitelisted in Atlas Network Access
- [ ] Backend `.env` file updated with Atlas connection string
- [ ] Frontend `.env` file created

---

## 🔧 Step-by-Step Setup

### Step 1: Update Backend `.env`

**File:** `backend\.env`

Make sure you have replaced `<db_username>` and `<db_password>` with your actual credentials:

```env
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.hcf7let.mongodb.net/ott-platform?retryWrites=true&w=majority&appName=Cluster0
```

**Example:**
```env
MONGODB_URI=mongodb+srv://admin:MyPass123@cluster0.hcf7let.mongodb.net/ott-platform?retryWrites=true&w=majority&appName=Cluster0
```

### Step 2: Ensure Frontend `.env` Exists

**File:** `frontend\.env`

Create this file if it doesn't exist:

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

---

## 🎯 Running the Project

### Terminal 1: Backend Setup & Start

```bash
# Navigate to backend
cd C:\Users\Dell\Desktop\mansoor\ott-platform\backend

# Install dependencies (if not already done)
npm install

# Seed database with admin and subscription plans
npm run seed

# Seed sample videos (optional but recommended)
npm run seed-videos

# Reset admin to use your custom credentials
npm run reset-admin

# Start backend server
npm run dev
```

**✅ Success Message:**
```
🚀 Server running in development mode on port 5000
MongoDB Connected: cluster0.hcf7let.mongodb.net
```

**Keep this terminal running!**

---

### Terminal 2: Frontend Setup & Start

Open a **NEW terminal** window:

```bash
# Navigate to frontend
cd C:\Users\Dell\Desktop\mansoor\ott-platform\frontend

# Install dependencies (if not already done)
npm install

# Start frontend
npm start
```

**✅ Success Message:**
```
Compiled successfully!
You can now view ott-platform-frontend in the browser.
Local: http://localhost:3000
```

Browser will automatically open at `http://localhost:3000`

**Keep this terminal running too!**

---

## 🌐 Access Your Application

### User Interface
- **URL:** `http://localhost:3000`
- **Register:** Click "Sign Up" to create a user account
- **Login:** Use your registered credentials

### Admin Panel
- **URL:** `http://localhost:3000/admin/login`
- **Email:** `231fa04a47@gmail.com`
- **Password:** `123@123`

---

## 🎬 First Steps After Login

### As Admin:

1. **Upload Videos:**
   - Go to "Upload Video"
   - Fill in details (title, description, duration in seconds)
   - Upload video file (MP4 recommended)
   - Upload poster image (JPG/PNG)
   - Select genres
   - Check "Featured" for homepage display
   - Click "Upload Video"

2. **Manage Users:**
   - View all registered users
   - Block/Unblock users
   - View subscription status

3. **View Dashboard:**
   - See analytics
   - Track revenue
   - Monitor activity

### As User:

1. **Browse Videos:**
   - Homepage shows featured content
   - Browse page shows all videos
   - Filter by genre

2. **Watch Videos:**
   - Click on any video card
   - Video player with controls
   - Progress auto-saves

3. **Manage Watchlist:**
   - Click "+" to add to watchlist
   - View "My List" page
   - Remove from watchlist

4. **Subscribe:**
   - Go to Subscription page
   - Choose a plan (Free, Standard, Premium)
   - Click "Subscribe Now"
   - Access premium content

---

## 🐛 Troubleshooting

### Backend Issues

**MongoDB Connection Failed:**
```
Error: Could not connect to MongoDB
```
**Solutions:**
- Check username and password in `.env`
- Verify IP is whitelisted in Atlas
- URL encode special characters in password
- Check internet connection

**Port 5000 Already in Use:**
```
Error: Port 5000 is already in use
```
**Solutions:**
- Kill the process using port 5000
- Or change PORT in `backend\.env` to 5001
- Update `REACT_APP_API_URL` in `frontend\.env` to match

### Frontend Issues

**Cannot Connect to Backend:**
```
Network Error / Failed to fetch
```
**Solutions:**
- Ensure backend is running
- Check `http://localhost:5000/api/health`
- Verify `REACT_APP_API_URL` in `frontend\.env`

**Dependencies Error:**
```
Module not found
```
**Solutions:**
```bash
# Delete and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Database Issues

**No Videos Showing:**
**Solutions:**
- Run `npm run seed-videos` in backend
- Or upload videos manually via admin panel

**Admin Login Failed:**
**Solutions:**
- Run `npm run reset-admin` in backend
- Check credentials in `backend\.env`
- Clear browser cache and try again

---

## 📊 Verify Everything is Working

### Backend Health Check
Open in browser: `http://localhost:5000/api/health`

Should show:
```json
{
  "status": "OK",
  "message": "API is running",
  "timestamp": "..."
}
```

### Frontend Check
Open in browser: `http://localhost:3000`

Should show:
- Homepage with navigation
- Featured video section (if videos exist)
- Video rows by genre

### Database Check
In MongoDB Atlas:
- Go to your cluster
- Click "Browse Collections"
- You should see:
  - `users` collection (with admin user)
  - `subscriptionplans` collection (3 plans)
  - `videos` collection (6 sample videos if seeded)

---

## 🎉 You're All Set!

Your OTT platform is now running with:
- ✅ MongoDB Atlas cloud database
- ✅ Backend API on port 5000
- ✅ Frontend UI on port 3000
- ✅ Admin panel ready
- ✅ Sample videos (if seeded)
- ✅ Subscription system active

---

## 📝 Quick Commands Reference

### Backend Commands
```bash
npm install          # Install dependencies
npm run seed         # Create admin & plans
npm run seed-videos  # Add sample videos
npm run reset-admin  # Reset admin credentials
npm run dev          # Start development server
```

### Frontend Commands
```bash
npm install          # Install dependencies
npm start            # Start development server
npm run build        # Build for production
```

---

## 🔐 Default Credentials

**Admin:**
- Email: `231fa04a47@gmail.com`
- Password: `123@123`

**Sample User (create your own):**
- Register at: `http://localhost:3000/register`

---

## 📞 Need Help?

Check these files for more information:
- `README.md` - Complete project overview
- `SETUP_GUIDE.md` - Detailed setup instructions
- `API_DOCUMENTATION.md` - API reference
- `FEATURES.md` - Complete feature list

---

**Happy Streaming! 🍿**
