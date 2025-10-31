# ⚡ Quick Deploy to Render - 5 Steps

## 🎯 Fast Track Deployment

### Step 1: Push to GitHub (5 minutes)

```bash
cd C:\Users\Dell\Desktop\mansoor\ott-platform

# Initialize git
git init
git add .
git commit -m "OTT Platform - Ready for deployment"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/ott-platform.git
git branch -M main
git push -u origin main
```

---

### Step 2: Deploy Backend (5 minutes)

1. Go to https://dashboard.render.com
2. Click **New +** → **Web Service**
3. Connect GitHub → Select `ott-platform`
4. Configure:
   - **Name**: `ott-platform-backend`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add Environment Variables:
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.hcf7let.mongodb.net/ott-platform?retryWrites=true&w=majority
   JWT_SECRET=your_random_secret_32_chars_minimum
   JWT_REFRESH_SECRET=your_random_refresh_secret_32_chars
   ADMIN_EMAIL=231fa04a47@gmail.com
   ADMIN_PASSWORD=123@123
   ```
6. Click **Create Web Service**
7. Copy backend URL: `https://ott-platform-backend.onrender.com`

---

### Step 3: Deploy Frontend (5 minutes)

1. Click **New +** → **Static Site**
2. Select `ott-platform` repo
3. Configure:
   - **Name**: `ott-platform-frontend`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`
4. Add Environment Variable:
   ```
   REACT_APP_API_URL=https://ott-platform-backend.onrender.com/api
   ```
5. Click **Create Static Site**
6. Copy frontend URL: `https://ott-platform-frontend.onrender.com`

---

### Step 4: Update Backend (2 minutes)

1. Go to backend service
2. Environment → Add:
   ```
   FRONTEND_URL=https://ott-platform-frontend.onrender.com
   ```
3. Save (auto redeploys)

---

### Step 5: Configure MongoDB Atlas (2 minutes)

1. Go to MongoDB Atlas
2. Network Access → Add IP Address
3. Select **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Confirm

---

## ✅ Done! Test Your Site

Visit: `https://ott-platform-frontend.onrender.com`

- ✅ Landing page loads
- ✅ Register/Login works
- ✅ 10 movies display
- ✅ All features work

**Admin Panel:**
`https://ott-platform-frontend.onrender.com/admin/login`
- Email: 231fa04a47@gmail.com
- Password: 123@123

---

## 🎉 Your Platform is LIVE!

**Total Time: ~20 minutes**

For detailed guide, see: `RENDER_DEPLOYMENT.md`
