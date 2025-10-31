# 🚀 Deploy to Vercel - Complete Guide

Deploy your OTT platform frontend to Vercel for blazing-fast performance!

---

## 🎯 Why Vercel?

- ⚡ **Fastest CDN** - Global edge network
- 🔄 **Auto-deploy** - Push to GitHub = Auto update
- 🆓 **Generous free tier** - 100GB bandwidth
- 🚀 **Optimized for React** - Built by Next.js creators
- 📊 **Analytics** - Built-in performance monitoring

---

## 📋 Prerequisites

- ✅ GitHub account with your code
- ✅ Vercel account (sign up with: 231fa04a47@gmail.com)
- ✅ Backend deployed on Render
- ✅ Repository: https://github.com/mansoor9147/ott-platform

---

## 🚀 Quick Deployment (5 Minutes)

### Step 1: Sign Up/Login to Vercel

1. Go to https://vercel.com
2. Click **"Sign Up"** or **"Login"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your repositories

### Step 2: Import Project

1. Click **"Add New..."** → **"Project"**
2. Click **"Import"** next to `ott-platform` repository
3. Or paste: `https://github.com/mansoor9147/ott-platform`

### Step 3: Configure Project

**Framework Preset:** Create React App (auto-detected)

**Root Directory:** `frontend` (click "Edit" to set this)

**Build Settings:**
```
Build Command: npm run build
Output Directory: build
Install Command: npm install
```

**Environment Variables:**
Click **"Add Environment Variable"**
```
Key: REACT_APP_API_URL
Value: https://ott-platform-1-88oj.onrender.com/api
```

### Step 4: Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes
3. Your site will be live!

---

## 📝 Detailed Configuration

### Root Directory (IMPORTANT!)
```
Root Directory: frontend
```
Click **"Edit"** next to "Root Directory" and set to `frontend`

### Build & Development Settings
```
Framework Preset: Create React App
Build Command: npm run build
Output Directory: build
Install Command: npm install
Development Command: npm start
```

### Environment Variables
```
REACT_APP_API_URL=https://ott-platform-1-88oj.onrender.com/api
```

---

## 🔧 Alternative: Vercel CLI

### Install Vercel CLI
```bash
npm install -g vercel
```

### Login
```bash
vercel login
```
Enter email: `231fa04a47@gmail.com`

### Deploy
```bash
cd C:\Users\Dell\Desktop\mansoor\ott-platform\frontend
vercel
```

Follow prompts:
- Set up and deploy? **Y**
- Which scope? **Your account**
- Link to existing project? **N**
- Project name? **ott-platform**
- Directory? **./frontend**
- Override settings? **N**

### Deploy to Production
```bash
vercel --prod
```

---

## 🎯 Your Deployment URLs

After deployment:

```
Frontend (Vercel): https://ott-platform-[random].vercel.app
Backend (Render):  https://ott-platform-1-88oj.onrender.com
Admin Panel:       https://ott-platform-[random].vercel.app/admin/login
```

---

## 🔄 Update Backend CORS

After getting your Vercel URL:

1. Go to https://dashboard.render.com
2. Your backend service
3. **Environment** → Add/Update:
   ```
   FRONTEND_URL=https://ott-platform-[your-url].vercel.app
   ```
4. Save (auto redeploys)

---

## 🎨 Custom Domain (Optional)

### Add Your Domain

1. Vercel Dashboard → Your Project
2. **Settings** → **Domains**
3. **Add Domain** → Enter your domain
4. Follow DNS configuration instructions

### DNS Configuration
```
Type: CNAME
Name: @ or www
Value: cname.vercel-dns.com
```

---

## 📊 Performance Features

### Automatic Optimizations
- ✅ Image optimization
- ✅ Code splitting
- ✅ Compression (Gzip/Brotli)
- ✅ HTTP/2 & HTTP/3
- ✅ Edge caching

### Analytics
1. Project → **Analytics**
2. View:
   - Real User Monitoring
   - Core Web Vitals
   - Page performance
   - Traffic sources

---

## 🔄 Continuous Deployment

### Auto-Deploy on Push
```bash
# Make changes
git add .
git commit -m "Update feature"
git push origin main

# Vercel automatically:
# 1. Detects push
# 2. Builds project
# 3. Deploys to production
```

### Preview Deployments
- Every pull request gets a preview URL
- Test before merging
- Share with team

---

## ⚙️ Advanced Configuration

### vercel.json (Already Created)
```json
{
  "version": 2,
  "builds": [
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/static/(.*)",
      "headers": {
        "cache-control": "public, max-age=31536000, immutable"
      }
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### Environment Variables per Environment
```
Production: REACT_APP_API_URL=https://api.production.com
Preview: REACT_APP_API_URL=https://api.staging.com
Development: REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🐛 Troubleshooting

### Build Fails

**Check build logs:**
1. Deployment → **View Build Logs**
2. Look for errors

**Common fixes:**
```bash
# Clear cache and redeploy
Deployments → ... → Redeploy → Clear cache
```

### 404 on Routes

**Solution:** Already handled in `vercel.json`
- All routes redirect to `index.html`
- React Router handles client-side routing

### Environment Variables Not Working

**Check:**
1. Variable name starts with `REACT_APP_`
2. Redeploy after adding variables
3. Check in build logs if variable is set

### API Calls Failing

**Verify:**
1. `REACT_APP_API_URL` is correct
2. Backend allows Vercel domain in CORS
3. Backend is running (check Render)

---

## 💰 Pricing & Limits

### Free Tier (Hobby)
- ✅ 100GB bandwidth/month
- ✅ Unlimited deployments
- ✅ Automatic HTTPS
- ✅ Preview deployments
- ✅ Analytics
- ✅ Custom domains

### Pro Tier ($20/month)
- ✅ 1TB bandwidth
- ✅ Team collaboration
- ✅ Password protection
- ✅ Advanced analytics
- ✅ Priority support

---

## 📈 Monitoring

### Check Deployment Status
1. Dashboard → Your Project
2. **Deployments** tab
3. View status: Building/Ready/Error

### View Logs
1. Click on deployment
2. **View Function Logs** or **Build Logs**
3. Debug issues

### Analytics
1. **Analytics** tab
2. Monitor:
   - Page views
   - Performance
   - Core Web Vitals
   - Real user data

---

## ✅ Deployment Checklist

### Pre-Deployment
- [ ] Code pushed to GitHub
- [ ] Backend deployed and working
- [ ] Backend URL noted
- [ ] vercel.json created

### Deployment
- [ ] Signed up/logged in to Vercel
- [ ] Imported repository
- [ ] Set root directory to `frontend`
- [ ] Added environment variable
- [ ] Deployed successfully
- [ ] Vercel URL noted

### Post-Deployment
- [ ] Site loads correctly
- [ ] Can register/login
- [ ] Movies display
- [ ] Backend CORS updated
- [ ] All features tested
- [ ] Custom domain added (optional)

---

## 🎯 Quick Commands Reference

### Vercel CLI
```bash
# Install
npm install -g vercel

# Login
vercel login

# Deploy (preview)
vercel

# Deploy (production)
vercel --prod

# List deployments
vercel ls

# View logs
vercel logs [deployment-url]

# Remove deployment
vercel rm [deployment-name]
```

---

## 🔗 Useful Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Documentation**: https://vercel.com/docs
- **CLI Reference**: https://vercel.com/docs/cli
- **Support**: https://vercel.com/support

---

## 🎉 After Successful Deployment

Your platform will be live at:
```
https://ott-platform-[random].vercel.app
```

### Test Everything:
- ✅ Landing page
- ✅ Register/Login
- ✅ Browse movies
- ✅ Video player
- ✅ Watchlist
- ✅ Profile
- ✅ Admin panel

### Admin Access:
```
URL: https://your-vercel-url.vercel.app/admin/login
Email: 231fa04a47@gmail.com
Password: 123@123
```

---

## 🚀 Next Steps

1. **Test thoroughly** - All features
2. **Update backend CORS** - Add Vercel URL
3. **Add custom domain** - Optional
4. **Monitor analytics** - Track performance
5. **Share with users** - Your platform is live!

---

**Your OTT platform will be blazing fast on Vercel!** ⚡🎬

**Total deployment time: ~5 minutes**
