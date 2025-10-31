# ⚡ Quick Start Guide - OTT Platform

Get your OTT streaming platform running in 5 minutes!

## 🎯 Prerequisites Check

Make sure you have:
- ✅ Node.js installed (`node --version`)
- ✅ MongoDB installed and running (`mongod --version`)

## 🚀 5-Minute Setup

### 1️⃣ Backend Setup (2 minutes)

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file (copy from .env.example)
# Windows:
copy .env.example .env

# Mac/Linux:
cp .env.example .env

# Seed database (creates admin & plans)
npm run seed

# Start backend
npm run dev
```

✅ Backend running at `http://localhost:5000`

### 2️⃣ Frontend Setup (2 minutes)

Open a **NEW terminal**:

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Create .env file
# Windows:
copy .env.example .env

# Mac/Linux:
cp .env.example .env

# Start frontend
npm start
```

✅ Frontend running at `http://localhost:3000`

### 3️⃣ First Login (1 minute)

**Admin Access:**
1. Go to: `http://localhost:3000/admin/login`
2. Email: `231fa04a47@gmail.com`
3. Password: `123@123`

**Upload Your First Video:**
1. Click "Upload Video" in admin panel
2. Fill in details (title, description, duration in seconds)
3. Upload video file and poster image
4. Click "Upload Video"

**Create User Account:**
1. Go to: `http://localhost:3000/register`
2. Sign up with your details
3. Start browsing!

## 🎬 You're Ready!

Your OTT platform is now live! Here's what you can do:

### As Admin:
- 📊 View dashboard analytics
- 👥 Manage users
- 🎥 Upload and manage videos
- 💳 Configure subscription plans

### As User:
- 🔍 Browse and search videos
- ▶️ Stream videos
- ❤️ Add to watchlist
- 💎 Subscribe to premium plans
- 👤 Manage profile

## 🐛 Quick Troubleshooting

**MongoDB not running?**
```bash
# Start MongoDB
mongod
```

**Port 5000 already in use?**
- Change PORT in `backend/.env` to 5001
- Update REACT_APP_API_URL in `frontend/.env` to `http://localhost:5001/api`

**Can't connect to backend?**
- Make sure backend is running
- Check `http://localhost:5000/api/health`

## 📚 Next Steps

- Read [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed setup
- Check [FEATURES.md](FEATURES.md) for complete feature list
- Review [README.md](README.md) for API documentation

## 💡 Tips

1. **Development Mode OTP**: When using phone login, OTP is shown in console
2. **Mock Payments**: All payments are mock - no real payment gateway needed
3. **Video Format**: Use MP4 format for best compatibility
4. **File Size**: Default max upload size is 500MB

## 🎉 Happy Streaming!

Need help? Check the troubleshooting section in SETUP_GUIDE.md
