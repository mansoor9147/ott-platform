# ⚡ Quick Deploy Frontend to Netlify - 3 Steps

## 🎯 Fast Track Deployment (10 Minutes)

---

## Step 1: Push to GitHub (2 minutes)

```bash
cd C:\Users\Dell\Desktop\mansoor\ott-platform
git add .
git commit -m "Add Netlify configuration"
git push origin main
```

---

## Step 2: Deploy on Netlify (5 minutes)

### 2.1 Create Site
1. Go to https://app.netlify.com
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **"Deploy with GitHub"**
4. Select `ott-platform` repository

### 2.2 Configure Build
- **Base directory**: `frontend`
- **Build command**: `npm install && npm run build`
- **Publish directory**: `frontend/build`

### 2.3 Add Environment Variable
Click **"Show advanced"** → **"New variable"**

```
Key: REACT_APP_API_URL
Value: https://ott-platform-backend.onrender.com/api
```

**Replace with your actual Render backend URL!**

### 2.4 Deploy
1. Click **"Deploy site"**
2. Wait 3-5 minutes
3. Copy your site URL: `https://your-site-name.netlify.app`

---

## Step 3: Update Backend (3 minutes)

### 3.1 Update Render Backend
1. Go to https://dashboard.render.com
2. Select your backend service
3. **Environment** → Update:
   ```
   FRONTEND_URL=https://your-site-name.netlify.app
   ```
4. Save (auto redeploys)

---

## ✅ Done! Test Your Site

Visit: `https://your-site-name.netlify.app`

- ✅ Landing page loads fast
- ✅ Register/Login works
- ✅ Movies display
- ✅ All features work

**Admin Panel:**
`https://your-site-name.netlify.app/admin/login`
- Email: 231fa04a47@gmail.com
- Password: 123@123

---

## 🎉 Your Platform is LIVE!

### Your URLs:
- **Frontend (Netlify)**: `https://your-site-name.netlify.app`
- **Backend (Render)**: `https://ott-platform-backend.onrender.com`

### Benefits:
- ✅ **Fast**: Global CDN
- ✅ **Free SSL**: Automatic HTTPS
- ✅ **Auto Deploy**: Push to GitHub = Auto update
- ✅ **100GB**: Free bandwidth/month

---

## 🔄 Update Your Site

```bash
# Make changes
git add .
git commit -m "Update feature"
git push origin main

# Netlify automatically rebuilds and deploys!
```

---

## 📊 Monitor Your Site

1. Netlify Dashboard → Your site
2. View:
   - **Deploys**: Build history
   - **Analytics**: Traffic stats
   - **Logs**: Debug issues

---

## 🎯 Optional: Custom Domain

1. Site settings → **Domain management**
2. **Add custom domain**
3. Follow DNS setup instructions
4. HTTPS enabled automatically

---

**Total Time: ~10 minutes**

For detailed guide, see: `NETLIFY_DEPLOYMENT.md`

**Your OTT platform is now live with lightning-fast performance!** ⚡🎬
