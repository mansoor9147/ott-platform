# 🗄️ MongoDB Atlas Setup Guide

## 📋 What You Need

Your MongoDB Atlas connection string:
```
mongodb+srv://<db_username>:<db_password>@cluster0.hcf7let.mongodb.net/?appName=Cluster0
```

---

## ✏️ Update Your .env File

### Step 1: Open the .env File

The file is already open in your editor:
```
C:\Users\Dell\Desktop\mansoor\ott-platform\backend\.env
```

### Step 2: Update Line 3 (MONGODB_URI)

**Replace this line:**
```env
MONGODB_URI=mongodb://localhost:27017/ott-platform
```

**With your MongoDB Atlas connection string:**
```env
MONGODB_URI=mongodb+srv://<db_username>:<db_password>@cluster0.hcf7let.mongodb.net/ott-platform?retryWrites=true&w=majority&appName=Cluster0
```

### Step 3: Replace Placeholders

Replace these with your actual credentials:
- `<db_username>` → Your MongoDB Atlas username
- `<db_password>` → Your MongoDB Atlas password

**Example:**
```env
MONGODB_URI=mongodb+srv://myuser:mypassword123@cluster0.hcf7let.mongodb.net/ott-platform?retryWrites=true&w=majority&appName=Cluster0
```

---

## ⚠️ Important: URL Encode Special Characters

If your password contains special characters, you MUST URL encode them:

| Character | Encoded | Example |
|-----------|---------|---------|
| `@` | `%40` | `Pass@123` → `Pass%40123` |
| `#` | `%23` | `Pass#123` → `Pass%23123` |
| `$` | `%24` | `Pass$123` → `Pass%24123` |
| `%` | `%25` | `Pass%123` → `Pass%25123` |
| `&` | `%26` | `Pass&123` → `Pass%26123` |
| `+` | `%2B` | `Pass+123` → `Pass%2B123` |
| `/` | `%2F` | `Pass/123` → `Pass%2F123` |
| `:` | `%3A` | `Pass:123` → `Pass%3A123` |
| `=` | `%3D` | `Pass=123` → `Pass%3D123` |
| `?` | `%3F` | `Pass?123` → `Pass%3F123` |

**Example with special characters:**
- Original password: `MyP@ss#2024`
- Encoded password: `MyP%40ss%232024`
- Full URI: `mongodb+srv://admin:MyP%40ss%232024@cluster0.hcf7let.mongodb.net/ott-platform?retryWrites=true&w=majority&appName=Cluster0`

---

## 📝 Complete .env File Template

Here's what your complete `backend/.env` file should look like:

```env
PORT=5000
NODE_ENV=development

# MongoDB Atlas - UPDATE THIS LINE
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.hcf7let.mongodb.net/ott-platform?retryWrites=true&w=majority&appName=Cluster0

# JWT Secrets
JWT_SECRET=your_jwt_secret_key_here_change_in_production
JWT_REFRESH_SECRET=your_refresh_secret_key_here_change_in_production
JWT_EXPIRE=1d
JWT_REFRESH_EXPIRE=7d

# Twilio (Optional)
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number

# Email (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_email_password

# Stripe (Optional)
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Admin Credentials
ADMIN_EMAIL=231fa04a47@gmail.com
ADMIN_PASSWORD=123@123

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

---

## ✅ Verify MongoDB Atlas Setup

### 1. Check Database User Exists

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Click **Database Access** (left sidebar)
3. Verify you have a user created
4. Note the username and password

### 2. Whitelist Your IP Address

1. Click **Network Access** (left sidebar)
2. Click **Add IP Address**
3. Choose one:
   - **Add Current IP Address** (recommended)
   - **Allow Access from Anywhere** (0.0.0.0/0) - for development only

### 3. Get Connection String

1. Click **Database** (left sidebar)
2. Click **Connect** on your cluster
3. Choose **Connect your application**
4. Copy the connection string
5. Replace `<password>` with your actual password

---

## 🧪 Test the Connection

After updating `.env`, test the connection:

```bash
cd C:\Users\Dell\Desktop\mansoor\ott-platform\backend
npm run seed
```

**Success Output:**
```
📡 MongoDB Connected
✅ Admin user created
✅ Subscription plans created
```

**Error Output (if wrong credentials):**
```
MongoServerError: bad auth: Authentication failed
```

---

## 🔧 Troubleshooting

### Error: "Authentication failed"
**Cause**: Wrong username or password
**Fix**: 
- Double-check credentials in MongoDB Atlas
- Ensure password is URL encoded
- Try creating a new database user

### Error: "Connection timeout"
**Cause**: IP not whitelisted
**Fix**:
- Go to Network Access in Atlas
- Add your current IP
- Or temporarily use 0.0.0.0/0

### Error: "Server selection timeout"
**Cause**: Wrong connection string or cluster not running
**Fix**:
- Verify cluster is running in Atlas
- Check connection string format
- Ensure `/ott-platform` database name is included

---

## 📊 What Happens After Connection

Once connected, your data will be stored in MongoDB Atlas:

### Collections Created:
1. **users** - User accounts
2. **videos** - Movie/video content
3. **subscriptionplans** - Pricing plans
4. **payments** - Payment transactions

### You Can View Data:
1. Go to MongoDB Atlas
2. Click **Browse Collections**
3. Select `ott-platform` database
4. View all collections and documents

---

## 🎯 Quick Steps Summary

1. ✏️ Open `backend/.env` (already open)
2. 📝 Update line 3 with your Atlas URI
3. 🔐 Replace `<db_username>` and `<db_password>`
4. 🔒 URL encode password if it has special characters
5. 💾 Save the file (Ctrl + S)
6. ✅ Test with `npm run seed`
7. 🚀 Start backend with `npm run dev`

---

## 🎉 You're Done!

After updating the `.env` file:
- Your app will connect to MongoDB Atlas
- All data will be stored in the cloud
- You can access data from anywhere
- No local MongoDB needed

---

**Now update line 3 in your open .env file with your MongoDB Atlas credentials!** 🚀
