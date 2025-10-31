# 📡 API Documentation - OTT Platform

Base URL: `http://localhost:5000/api`

## 🔐 Authentication

All protected routes require a Bearer token in the Authorization header:
```
Authorization: Bearer <access_token>
```

## 📋 Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message"
}
```

---

## 🔑 Authentication Endpoints

### Register User
**POST** `/auth/register`

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+1234567890"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    },
    "accessToken": "jwt_token",
    "refreshToken": "refresh_token"
  }
}
```

### Login with Email/Password
**POST** `/auth/login`

**Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:** Same as register

### Send OTP
**POST** `/auth/send-otp`

**Body:**
```json
{
  "phone": "+1234567890"
}
```

**Response:**
```json
{
  "success": true,
  "message": "OTP sent successfully",
  "data": {
    "phone": "+1234567890",
    "otp": "123456" // Only in development
  }
}
```

### Verify OTP
**POST** `/auth/verify-otp`

**Body:**
```json
{
  "phone": "+1234567890",
  "otp": "123456"
}
```

**Response:** Same as login

### Refresh Token
**POST** `/auth/refresh-token`

**Body:**
```json
{
  "refreshToken": "refresh_token"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "accessToken": "new_access_token"
  }
}
```

### Forgot Password
**POST** `/auth/forgot-password`

**Body:**
```json
{
  "email": "john@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password reset email sent",
  "resetToken": "token" // Only in development
}
```

### Reset Password
**POST** `/auth/reset-password/:token`

**Body:**
```json
{
  "password": "newpassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password reset successful"
}
```

---

## 👤 User Endpoints

### Get User Profile
**GET** `/users/profile`
🔒 **Protected**

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "profilePicture": "/uploads/profiles/image.jpg",
    "subscription": {
      "plan": { ... },
      "status": "active",
      "startDate": "2024-01-01",
      "endDate": "2024-02-01"
    },
    "watchlist": [ ... ]
  }
}
```

### Update User Profile
**PUT** `/users/profile`
🔒 **Protected**

**Body (multipart/form-data):**
```
name: John Doe
email: john@example.com
phone: +1234567890
profilePicture: [file]
```

**Response:**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": { ... }
}
```

### Get Watchlist
**GET** `/users/watchlist`
🔒 **Protected**

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "video_id",
      "title": "Movie Title",
      "posterUrl": "/uploads/images/poster.jpg",
      ...
    }
  ]
}
```

### Add to Watchlist
**POST** `/users/watchlist/:videoId`
🔒 **Protected**

**Response:**
```json
{
  "success": true,
  "message": "Added to watchlist",
  "data": [ ... ]
}
```

### Remove from Watchlist
**DELETE** `/users/watchlist/:videoId`
🔒 **Protected**

**Response:**
```json
{
  "success": true,
  "message": "Removed from watchlist",
  "data": [ ... ]
}
```

### Get Watch History
**GET** `/users/history`
🔒 **Protected**

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "video": { ... },
      "watchedAt": "2024-01-01T00:00:00.000Z",
      "progress": 45.5
    }
  ]
}
```

### Update Watch Progress
**POST** `/users/watch-progress/:videoId`
🔒 **Protected**

**Body:**
```json
{
  "progress": 45.5
}
```

**Response:**
```json
{
  "success": true,
  "message": "Progress updated"
}
```

---

## 🎬 Video Endpoints

### Get All Videos
**GET** `/videos`

**Query Parameters:**
- `genre` - Filter by genre
- `search` - Search in title, description, cast
- `featured` - true/false
- `trending` - true/false
- `premium` - true/false
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20)

**Example:**
```
GET /videos?genre=Action&page=1&limit=10
```

**Response:**
```json
{
  "success": true,
  "data": [ ... ],
  "totalPages": 5,
  "currentPage": 1,
  "total": 50
}
```

### Get Video by ID
**GET** `/videos/:id`

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "video_id",
    "title": "Movie Title",
    "description": "Movie description",
    "videoUrl": "/uploads/videos/video.mp4",
    "posterUrl": "/uploads/images/poster.jpg",
    "duration": 7200,
    "genre": ["Action", "Thriller"],
    "cast": [
      { "name": "Actor Name", "role": "Character" }
    ],
    "director": "Director Name",
    "releaseYear": 2024,
    "rating": 8.5,
    "ageRating": "U/A 13+",
    "language": "English",
    "isPremium": true,
    "isFeatured": false,
    "isTrending": true,
    "views": 1000,
    "likes": 500
  }
}
```

### Stream Video
**GET** `/videos/stream/:id`
🔒 **Protected**

Returns video stream with range support.

**Headers:**
```
Range: bytes=0-1023
```

**Response:** Video stream (206 Partial Content)

### Get Recommended Videos
**GET** `/videos/:id/recommended`

**Response:**
```json
{
  "success": true,
  "data": [ ... ] // Similar videos
}
```

### Upload Video (Admin)
**POST** `/videos`
🔒 **Protected** | 👑 **Admin Only**

**Body (multipart/form-data):**
```
title: Movie Title
description: Movie description
duration: 7200
genre: ["Action", "Thriller"] (JSON string)
cast: [{"name": "Actor", "role": "Character"}] (JSON string)
director: Director Name
releaseYear: 2024
rating: 8.5
ageRating: U/A 13+
language: English
isPremium: true
isFeatured: false
isTrending: true
video: [video file]
poster: [image file]
thumbnail: [image file] (optional)
```

**Response:**
```json
{
  "success": true,
  "message": "Video uploaded successfully",
  "data": { ... }
}
```

### Update Video (Admin)
**PUT** `/videos/:id`
🔒 **Protected** | 👑 **Admin Only**

**Body:** Same as upload (all fields optional)

**Response:**
```json
{
  "success": true,
  "message": "Video updated successfully",
  "data": { ... }
}
```

### Delete Video (Admin)
**DELETE** `/videos/:id`
🔒 **Protected** | 👑 **Admin Only**

**Response:**
```json
{
  "success": true,
  "message": "Video deleted successfully"
}
```

---

## 💳 Subscription Endpoints

### Get All Plans
**GET** `/subscriptions/plans`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "plan_id",
      "name": "Premium",
      "description": "Ultimate streaming experience",
      "price": 14.99,
      "duration": 30,
      "features": [
        "Full content library",
        "4K Ultra HD quality",
        "No ads"
      ],
      "videoQuality": "4K",
      "simultaneousScreens": 4,
      "downloadAllowed": true,
      "adsEnabled": false
    }
  ]
}
```

### Get Plan by ID
**GET** `/subscriptions/plans/:id`

**Response:**
```json
{
  "success": true,
  "data": { ... }
}
```

### Subscribe to Plan
**POST** `/subscriptions/subscribe`
🔒 **Protected**

**Body:**
```json
{
  "planId": "plan_id",
  "paymentMethod": "mock"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Subscription successful",
  "data": {
    "subscription": {
      "plan": "plan_id",
      "status": "active",
      "startDate": "2024-01-01",
      "endDate": "2024-02-01"
    },
    "payment": {
      "transactionId": "TXN_123456",
      "amount": 14.99,
      "status": "completed"
    }
  }
}
```

### Get My Subscription
**GET** `/subscriptions/my-subscription`
🔒 **Protected**

**Response:**
```json
{
  "success": true,
  "data": {
    "plan": { ... },
    "status": "active",
    "startDate": "2024-01-01",
    "endDate": "2024-02-01"
  }
}
```

### Cancel Subscription
**POST** `/subscriptions/cancel`
🔒 **Protected**

**Response:**
```json
{
  "success": true,
  "message": "Subscription cancelled"
}
```

### Get Payment History
**GET** `/subscriptions/payments`
🔒 **Protected**

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "payment_id",
      "plan": { ... },
      "amount": 14.99,
      "transactionId": "TXN_123456",
      "status": "completed",
      "paymentDate": "2024-01-01"
    }
  ]
}
```

### Create Plan (Admin)
**POST** `/subscriptions/plans`
🔒 **Protected** | 👑 **Admin Only**

**Body:**
```json
{
  "name": "Premium",
  "description": "Ultimate streaming",
  "price": 14.99,
  "duration": 30,
  "features": ["Feature 1", "Feature 2"],
  "videoQuality": "4K",
  "simultaneousScreens": 4,
  "downloadAllowed": true,
  "adsEnabled": false
}
```

### Update Plan (Admin)
**PUT** `/subscriptions/plans/:id`
🔒 **Protected** | 👑 **Admin Only**

### Delete Plan (Admin)
**DELETE** `/subscriptions/plans/:id`
🔒 **Protected** | 👑 **Admin Only**

---

## 👑 Admin Endpoints

### Get Dashboard
**GET** `/admin/dashboard`
🔒 **Protected** | 👑 **Admin Only**

**Response:**
```json
{
  "success": true,
  "data": {
    "stats": {
      "totalUsers": 100,
      "totalVideos": 50,
      "activeSubscriptions": 30,
      "totalRevenue": 1500.00
    },
    "recentUsers": [ ... ],
    "recentPayments": [ ... ],
    "topVideos": [ ... ]
  }
}
```

### Get All Users
**GET** `/admin/users`
🔒 **Protected** | 👑 **Admin Only**

**Query Parameters:**
- `page` - Page number
- `limit` - Items per page
- `search` - Search by name or email

**Response:**
```json
{
  "success": true,
  "data": [ ... ],
  "totalPages": 5,
  "currentPage": 1,
  "total": 100
}
```

### Get User by ID
**GET** `/admin/users/:id`
🔒 **Protected** | 👑 **Admin Only**

**Response:**
```json
{
  "success": true,
  "data": {
    "user": { ... },
    "payments": [ ... ]
  }
}
```

### Block/Unblock User
**PUT** `/admin/users/:id/block`
🔒 **Protected** | 👑 **Admin Only**

**Response:**
```json
{
  "success": true,
  "message": "User blocked successfully",
  "data": { ... }
}
```

### Delete User
**DELETE** `/admin/users/:id`
🔒 **Protected** | 👑 **Admin Only**

**Response:**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

### Get All Payments
**GET** `/admin/payments`
🔒 **Protected** | 👑 **Admin Only**

**Query Parameters:**
- `page` - Page number
- `limit` - Items per page

**Response:**
```json
{
  "success": true,
  "data": [ ... ],
  "totalPages": 5,
  "currentPage": 1,
  "total": 100
}
```

### Get Analytics
**GET** `/admin/analytics`
🔒 **Protected** | 👑 **Admin Only**

**Response:**
```json
{
  "success": true,
  "data": {
    "userGrowth": [ ... ],
    "revenueGrowth": [ ... ],
    "genreDistribution": [ ... ],
    "subscriptionDistribution": [ ... ]
  }
}
```

---

## 🚨 Error Codes

- `400` - Bad Request (Invalid input)
- `401` - Unauthorized (Invalid/missing token)
- `403` - Forbidden (Insufficient permissions)
- `404` - Not Found (Resource doesn't exist)
- `500` - Internal Server Error

---

## 📝 Notes

1. All timestamps are in ISO 8601 format
2. File uploads use multipart/form-data
3. Pagination starts at page 1
4. Default limit is 20 items per page
5. Video streaming supports HTTP range requests
6. OTP expires in 10 minutes
7. Access tokens expire in 1 day
8. Refresh tokens expire in 7 days

---

**API Version:** 1.0.0
**Last Updated:** 2024
