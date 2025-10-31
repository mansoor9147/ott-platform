# ⚡ Quick Deploy to Vercel - 3 Steps

Deploy your OTT platform frontend to Vercel in 5 minutes!

---

## 🚀 Step 1: Push Configuration (1 minute)

Run this command or double-click `deploy-vercel.bat`:

```bash
cd C:\Users\Dell\Desktop\mansoor\ott-platform
git add vercel.json VERCEL_DEPLOYMENT.md
git commit -m "Add Vercel config"
git push origin main
```

---

## 🎯 Step 2: Deploy on Vercel (3 minutes)

### 2.1 Go to Vercel
Visit: https://vercel.com

### 2.2 Sign In
- Click **"Sign Up"** or **"Login"**
- Choose **"Continue with GitHub"**
- Use email: **231fa04a47@gmail.com**
- Authorize Vercel

### 2.3 Import Project
1. Click **"Add New..."** → **"Project"**
2. Find **"ott-platform"** repository
3. Click **"Import"**

### 2.4 Configure
**Root Directory:**
- Click **"Edit"** next to Root Directory
- Enter: `frontend`

**Environment Variables:**
- Click **"Add Environment Variable"**
- Key: `REACT_APP_API_URL`
- Value: `https://ott-platform-1-88oj.onrender.com/api`

**Build Settings:** (Auto-detected, verify)
- Framework: Create React App
- Build Command: `npm run build`
- Output Directory: `build`

### 2.5 Deploy
Click **"Deploy"** button and wait 2-3 minutes!

---

## 🔄 Step 3: Update Backend (1 minute)

After deployment, get your Vercel URL (e.g., `https://ott-platform-abc123.vercel.app`)

Then update Render backend:

1. Go to https://dashboard.render.com
2. Click your backend service
3. **Environment** → Add/Update:
   ```
   FRONTEND_URL=https://ott-platform-abc123.vercel.app
   ```
4. Save (auto redeploys)

---

## ✅ Done! Test Your Site

Visit your Vercel URL:
```
https://ott-platform-[your-id].vercel.app
```

Test:
- ✅ Landing page loads
- ✅ Register/Login works
- ✅ Movies display
- ✅ Video player works
- ✅ All features functional

**Admin Panel:**
```
URL: https://your-vercel-url.vercel.app/admin/login
Email: 231fa04a47@gmail.com
Password: 123@123
```

---

## 🎉 Your Platform is LIVE!

**Total Time: ~5 minutes**

### Your URLs:
- **Frontend (Vercel)**: `https://your-vercel-url.vercel.app`
- **Backend (Render)**: `https://ott-platform-1-88oj.onrender.com`
- **Database**: MongoDB Atlas

### Benefits:
- ⚡ Blazing fast (Vercel Edge Network)
- 🔄 Auto-deploy on git push
- 🆓 100GB bandwidth/month free
- 📊 Built-in analytics
- 🌍 Global CDN

---

## 🔄 Future Updates

Just push to GitHub:
```bash
git add .
git commit -m "Update feature"
git push origin main
```

Vercel automatically rebuilds and deploys! 🚀

---

**For detailed guide, see: `VERCEL_DEPLOYMENT.md`**
