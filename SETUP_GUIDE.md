# 🚀 OTT Platform - Complete Setup Guide

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (local or Atlas account) - [Download](https://www.mongodb.com/try/download/community)
- **Git** (optional) - [Download](https://git-scm.com/)

## 🛠️ Installation Steps

### Step 1: Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   - Copy `.env.example` to `.env`
   - Update the following variables:

   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/ott-platform
   JWT_SECRET=your_super_secret_jwt_key_change_this
   JWT_REFRESH_SECRET=your_super_secret_refresh_key_change_this
   JWT_EXPIRE=1d
   JWT_REFRESH_EXPIRE=7d
   
   # Admin Credentials
   ADMIN_EMAIL=admin@ottplatform.com
   ADMIN_PASSWORD=Admin@123
   
   # Frontend URL
   FRONTEND_URL=http://localhost:3000
   ```

4. **Start MongoDB:**
   - If using local MongoDB:
     ```bash
     mongod
     ```
   - If using MongoDB Atlas, ensure your connection string is in `.env`

5. **Seed the database (creates admin user and subscription plans):**
   ```bash
   npm run seed
   ```

6. **Start the backend server:**
   ```bash
   npm run dev
   ```

   You should see:
   ```
   🚀 Server running in development mode on port 5000
   📡 API: http://localhost:5000/api
   💚 Health: http://localhost:5000/api/health
   MongoDB Connected: ...
   ```

### Step 2: Frontend Setup

1. **Open a new terminal and navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   - Copy `.env.example` to `.env`
   - Update if needed:

   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start the frontend development server:**
   ```bash
   npm start
   ```

   The app will open at `http://localhost:3000`

## 🎯 First Steps After Setup

### 1. Access Admin Panel

1. Navigate to: `http://localhost:3000/admin/login`
2. Login with default credentials:
   - **Email:** admin@ottplatform.com
   - **Password:** Admin@123

### 2. Upload Sample Content

1. Go to **Admin Panel → Upload Video**
2. Fill in the form:
   - Title, Description, Duration (in seconds)
   - Select genres
   - Upload video file and poster image
   - Set as Featured/Trending if desired
3. Click **Upload Video**

### 3. Create User Account

1. Navigate to: `http://localhost:3000/register`
2. Fill in the registration form
3. Login and explore the platform

### 4. Test Subscription Flow

1. Login as a regular user
2. Navigate to: `http://localhost:3000/subscription`
3. Choose a plan and subscribe (mock payment)
4. Access premium content

## 📁 Project Structure

```
ott-platform/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Auth, upload, error handling
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── utils/           # Helper functions
│   ├── uploads/         # Uploaded files
│   └── server.js        # Entry point
│
├── frontend/
│   ├── public/          # Static files
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── redux/       # State management
│   │   ├── services/    # API services
│   │   ├── App.js       # Main app component
│   │   └── index.js     # Entry point
│   └── package.json
│
└── README.md
```

## 🔑 Key Features

### User Features
- ✅ Email/Password & Phone/OTP authentication
- ✅ Browse videos by genre
- ✅ Search functionality
- ✅ Watchlist management
- ✅ Video streaming with custom player
- ✅ Subscription management
- ✅ Profile management

### Admin Features
- ✅ Dashboard with analytics
- ✅ User management (view, block, delete)
- ✅ Video upload and management
- ✅ Subscription plan management
- ✅ Payment tracking

## 🧪 Testing the Application

### Test User Authentication

**Email/Password Login:**
1. Register a new account
2. Login with credentials
3. Access protected routes

**Phone/OTP Login:**
1. Click "Phone" tab on login page
2. Enter phone number (e.g., +1234567890)
3. Click "Send OTP"
4. Check console for OTP (in development mode)
5. Enter OTP and verify

### Test Video Streaming

1. Upload a video via admin panel
2. Login as user
3. Click on video card
4. Video should stream with controls

### Test Subscription

1. Login as user
2. Go to Subscription page
3. Select a plan
4. Click "Subscribe Now"
5. Mock payment will complete
6. Check profile for active subscription

## 🐛 Troubleshooting

### Backend Issues

**MongoDB Connection Error:**
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify network access (for Atlas)

**Port Already in Use:**
- Change PORT in `.env`
- Or kill process using port 5000

**Seed Script Fails:**
- Ensure MongoDB is running
- Check database connection
- Delete existing admin user if re-seeding

### Frontend Issues

**API Connection Error:**
- Verify backend is running
- Check REACT_APP_API_URL in `.env`
- Check CORS settings in backend

**Build Errors:**
- Delete node_modules and package-lock.json
- Run `npm install` again
- Clear npm cache: `npm cache clean --force`

**Tailwind Not Working:**
- Ensure tailwind.config.js is present
- Check postcss.config.js
- Restart development server

## 📝 API Endpoints Reference

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/send-otp` - Send OTP to phone
- `POST /api/auth/verify-otp` - Verify OTP
- `POST /api/auth/refresh-token` - Refresh access token

### Videos
- `GET /api/videos` - Get all videos (with filters)
- `GET /api/videos/:id` - Get video by ID
- `GET /api/videos/stream/:id` - Stream video
- `POST /api/videos` - Upload video (Admin)
- `DELETE /api/videos/:id` - Delete video (Admin)

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `GET /api/users/watchlist` - Get watchlist
- `POST /api/users/watchlist/:videoId` - Add to watchlist

### Subscriptions
- `GET /api/subscriptions/plans` - Get all plans
- `POST /api/subscriptions/subscribe` - Subscribe to plan
- `GET /api/subscriptions/my-subscription` - Get user subscription

### Admin
- `GET /api/admin/dashboard` - Get dashboard stats
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id/block` - Block/Unblock user

## 🚀 Deployment

### Backend (Heroku/Railway/Render)

1. Set environment variables in platform
2. Update MongoDB URI to production database
3. Deploy using platform-specific commands

### Frontend (Vercel/Netlify)

1. Build the app: `npm run build`
2. Deploy the build folder
3. Set environment variable: `REACT_APP_API_URL`

## 🔒 Security Notes

- Change default admin credentials in production
- Use strong JWT secrets
- Enable HTTPS in production
- Implement rate limiting
- Validate all inputs
- Use environment variables for sensitive data

## 📧 Support

For issues or questions:
- Check troubleshooting section
- Review API documentation
- Check console logs for errors

## 🎉 You're All Set!

Your OTT platform is now ready to use. Enjoy streaming! 🍿
