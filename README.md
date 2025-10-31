# 🎬 OTT Streaming Platform

A full-featured OTT (Over-The-Top) video streaming platform built with the MERN stack, similar to Netflix or Disney+ Hotstar.

## 🚀 Features

### User Features
- **Authentication System**
  - Email & Password login
  - Phone Number & OTP verification
  - JWT-based authentication (access + refresh tokens)
  - Forgot password functionality
  
- **Content Browsing**
  - Homepage with featured, trending, and categorized content
  - Search by title, genre, or actor
  - Watchlist management
  
- **Video Streaming**
  - Custom video player with controls
  - Progress tracking
  - Recommended content
  
- **Subscription Management**
  - Multiple subscription tiers (Free, Standard, Premium)
  - Payment integration (Stripe/Mock)
  - Content access control

### Admin Features
- **Dashboard**
  - User analytics
  - Content statistics
  - Subscription metrics
  
- **Content Management**
  - Upload videos and posters
  - Edit/Delete content
  - Manage genres and categories
  
- **User Management**
  - View all users
  - Block/Unblock users
  
- **Subscription Management**
  - Create/Edit/Delete plans
  - Pricing management

## 🛠️ Tech Stack

- **Frontend:** React.js, Tailwind CSS, Redux Toolkit
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT, bcrypt
- **OTP Service:** Twilio (or mock for demo)
- **Payment:** Stripe (or mock)

## 📁 Project Structure

```
ott-platform/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── uploads/
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── services/
│   │   ├── utils/
│   │   └── App.js
│   └── package.json
└── README.md
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
npm install
```

2. Create `.env` file in backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ott-platform
JWT_SECRET=your_jwt_secret_key_here
JWT_REFRESH_SECRET=your_refresh_secret_key_here
JWT_EXPIRE=1d
JWT_REFRESH_EXPIRE=7d

# Twilio (Optional - for real OTP)
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number

# Email (Optional - for password reset)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_email_password

# Stripe (Optional - for payments)
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Admin Credentials
ADMIN_EMAIL=admin@ottplatform.com
ADMIN_PASSWORD=Admin@123
```

3. Start backend server:
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
npm install
```

2. Create `.env` file in frontend directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

3. Start frontend development server:
```bash
npm start
```

Frontend will run on `http://localhost:3000`

## 👤 Default Admin Credentials

- **Email:** admin@ottplatform.com
- **Password:** Admin@123

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/login-otp` - Send OTP to phone
- `POST /api/auth/verify-otp` - Verify OTP
- `POST /api/auth/refresh-token` - Refresh access token
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/watchlist` - Get user watchlist
- `POST /api/users/watchlist/:videoId` - Add to watchlist
- `DELETE /api/users/watchlist/:videoId` - Remove from watchlist

### Videos
- `GET /api/videos` - Get all videos (with filters)
- `GET /api/videos/:id` - Get video by ID
- `GET /api/videos/stream/:id` - Stream video
- `POST /api/videos` - Upload video (Admin)
- `PUT /api/videos/:id` - Update video (Admin)
- `DELETE /api/videos/:id` - Delete video (Admin)

### Subscriptions
- `GET /api/subscriptions/plans` - Get all plans
- `POST /api/subscriptions/subscribe` - Subscribe to plan
- `GET /api/subscriptions/my-subscription` - Get user subscription

### Admin
- `GET /api/admin/dashboard` - Get dashboard stats
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id/block` - Block/Unblock user

## 🎨 Features Walkthrough

### User Journey
1. Sign up using email/password or phone/OTP
2. Browse content on homepage
3. Search for movies/shows
4. Add content to watchlist
5. Subscribe to premium plan
6. Stream videos with custom player
7. Manage profile and subscription

### Admin Journey
1. Login to admin panel at `/admin`
2. View dashboard statistics
3. Upload new content with video and poster
4. Manage existing content
5. View and manage users
6. Create/Edit subscription plans

## 🔐 Security Features

- Password hashing with bcrypt
- JWT-based authentication
- HTTP-only cookies for refresh tokens
- Input validation and sanitization
- Rate limiting on sensitive endpoints
- CORS configuration
- File upload validation

## 🚀 Deployment

### Backend Deployment (Heroku/Railway/Render)
1. Set environment variables
2. Update MongoDB URI to production database
3. Deploy using platform-specific commands

### Frontend Deployment (Vercel/Netlify)
1. Build the React app: `npm run build`
2. Deploy the build folder
3. Update API URL to production backend

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For support, email support@ottplatform.com or create an issue in the repository.
