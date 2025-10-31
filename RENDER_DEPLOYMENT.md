# 🚀 Deploy OTT Platform to Render

Complete guide to deploy your OTT streaming platform to Render.com

---

## 📋 Prerequisites

1. ✅ GitHub account
2. ✅ Render account (free tier available)
3. ✅ MongoDB Atlas account (already set up)
4. ✅ Your project code

---

## 🎯 Deployment Steps

### Step 1: Push Code to GitHub

#### 1.1 Initialize Git (if not done)
```bash
cd C:\Users\Dell\Desktop\mansoor\ott-platform
git init
```

#### 1.2 Create .gitignore (already exists)
Make sure these are in `.gitignore`:
```
node_modules/
.env
build/
dist/
*.log
```

#### 1.3 Commit Your Code
```bash
git add .
git commit -m "Initial commit - OTT Platform"
```

#### 1.4 Create GitHub Repository
1. Go to https://github.com/new
2. Create repository: `ott-platform`
3. Don't initialize with README (you already have one)

#### 1.5 Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/ott-platform.git
git branch -M main
git push -u origin main
```

---

### Step 2: Deploy Backend to Render

#### 2.1 Create New Web Service
1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Select `ott-platform` repository

#### 2.2 Configure Backend Service
**Basic Settings:**
- **Name**: `ott-platform-backend`
- **Region**: Oregon (US West) or closest to you
- **Branch**: `main`
- **Root Directory**: `backend`
- **Environment**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Plan**: Free

#### 2.3 Add Environment Variables
Click **"Advanced"** → **"Add Environment Variable"**

Add these variables:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `10000` |
| `MONGODB_URI` | Your MongoDB Atlas connection string |
| `JWT_SECRET` | Generate random string (32+ chars) |
| `JWT_REFRESH_SECRET` | Generate random string (32+ chars) |
| `JWT_EXPIRE` | `1d` |
| `JWT_REFRESH_EXPIRE` | `7d` |
| `ADMIN_EMAIL` | `231fa04a47@gmail.com` |
| `ADMIN_PASSWORD` | `123@123` |
| `FRONTEND_URL` | (Leave empty for now, add after frontend deploy) |

**MongoDB URI Format:**
```
mongodb+srv://USERNAME:PASSWORD@cluster0.hcf7let.mongodb.net/ott-platform?retryWrites=true&w=majority
```

**Generate Secrets:**
```bash
# In terminal, run:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

#### 2.4 Deploy Backend
1. Click **"Create Web Service"**
2. Wait 5-10 minutes for deployment
3. Note your backend URL: `https://ott-platform-backend.onrender.com`

---

### Step 3: Deploy Frontend to Render

#### 3.1 Create New Static Site
1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Static Site"**
3. Select `ott-platform` repository

#### 3.2 Configure Frontend Service
**Basic Settings:**
- **Name**: `ott-platform-frontend`
- **Branch**: `main`
- **Root Directory**: `frontend`
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `build`

#### 3.3 Add Environment Variables
Click **"Advanced"** → **"Add Environment Variable"**

| Key | Value |
|-----|-------|
| `REACT_APP_API_URL` | `https://ott-platform-backend.onrender.com/api` |

**Important:** Replace with your actual backend URL from Step 2.4

#### 3.4 Deploy Frontend
1. Click **"Create Static Site"**
2. Wait 5-10 minutes for deployment
3. Note your frontend URL: `https://ott-platform-frontend.onrender.com`

---

### Step 4: Update Backend with Frontend URL

1. Go to your backend service in Render dashboard
2. Click **"Environment"**
3. Add/Update:
   - `FRONTEND_URL` = `https://ott-platform-frontend.onrender.com`
4. Click **"Save Changes"**
5. Backend will automatically redeploy

---

### Step 5: Update MongoDB Atlas

#### 5.1 Whitelist Render IPs
1. Go to MongoDB Atlas
2. Click **"Network Access"**
3. Click **"Add IP Address"**
4. Select **"Allow Access from Anywhere"** (0.0.0.0/0)
   - Or add Render's IP ranges
5. Click **"Confirm"**

---

### Step 6: Test Your Deployment

#### 6.1 Test Backend
Visit: `https://ott-platform-backend.onrender.com/api/health`

**Expected Response:**
```json
{
  "status": "OK",
  "message": "API is running"
}
```

#### 6.2 Test Frontend
Visit: `https://ott-platform-frontend.onrender.com`

**Should see:**
- ✅ Landing page loads
- ✅ Can register/login
- ✅ Movies display
- ✅ All features work

---

## 🔧 Troubleshooting

### Issue: Backend Not Connecting to MongoDB
**Solution:**
- Check MongoDB Atlas IP whitelist
- Verify MONGODB_URI in environment variables
- Check MongoDB Atlas user credentials

### Issue: Frontend Can't Connect to Backend
**Solution:**
- Verify REACT_APP_API_URL is correct
- Check CORS settings in backend
- Ensure FRONTEND_URL is set in backend

### Issue: Build Fails
**Solution:**
- Check build logs in Render dashboard
- Verify all dependencies in package.json
- Check Node version compatibility

### Issue: 404 on Frontend Routes
**Solution:**
- Already handled with rewrite rules in render.yaml
- Verify Publish Directory is set to `build`

---

## 📊 Deployment Checklist

### Before Deployment:
- [ ] Code pushed to GitHub
- [ ] MongoDB Atlas configured
- [ ] Environment variables prepared
- [ ] .gitignore includes .env files

### Backend Deployment:
- [ ] Web service created
- [ ] Environment variables added
- [ ] Build successful
- [ ] Health endpoint responds
- [ ] Database connected

### Frontend Deployment:
- [ ] Static site created
- [ ] API URL configured
- [ ] Build successful
- [ ] Site loads correctly
- [ ] Can login/register

### Post Deployment:
- [ ] Backend FRONTEND_URL updated
- [ ] MongoDB IP whitelisted
- [ ] All features tested
- [ ] Admin panel accessible

---

## 🎯 Your Deployed URLs

After deployment, you'll have:

### Production URLs:
- **Frontend**: `https://ott-platform-frontend.onrender.com`
- **Backend**: `https://ott-platform-backend.onrender.com`
- **Admin**: `https://ott-platform-frontend.onrender.com/admin/login`

### Admin Credentials:
- **Email**: 231fa04a47@gmail.com
- **Password**: 123@123

---

## 💡 Important Notes

### Free Tier Limitations:
- ✅ Backend sleeps after 15 min inactivity
- ✅ First request may take 30-60 seconds (cold start)
- ✅ 750 hours/month free
- ✅ Automatic HTTPS

### Performance Tips:
1. Keep backend active with uptime monitoring
2. Use caching for static assets
3. Optimize images
4. Enable compression

### Security:
1. Change admin password after deployment
2. Use strong JWT secrets
3. Enable HTTPS only
4. Keep dependencies updated

---

## 🔄 Continuous Deployment

Render automatically redeploys when you push to GitHub:

```bash
# Make changes
git add .
git commit -m "Update feature"
git push origin main

# Render will automatically:
# 1. Detect push
# 2. Build project
# 3. Deploy updates
```

---

## 📈 Monitoring

### Check Deployment Status:
1. Go to Render dashboard
2. View service logs
3. Monitor performance
4. Check error reports

### View Logs:
```bash
# In Render dashboard:
# Service → Logs → View real-time logs
```

---

## 🎉 Success!

Your OTT platform is now live on Render!

✅ **Backend**: Deployed and running
✅ **Frontend**: Deployed and accessible
✅ **Database**: Connected to MongoDB Atlas
✅ **HTTPS**: Automatically enabled
✅ **Custom Domain**: Can be added (optional)

---

## 🚀 Next Steps

1. **Test Everything**: Register, login, watch videos
2. **Share URL**: Give access to users
3. **Monitor**: Check logs and performance
4. **Update**: Push changes to GitHub for auto-deploy
5. **Scale**: Upgrade plan if needed

---

## 📞 Support

### Render Documentation:
- https://render.com/docs

### Common Issues:
- Check service logs in dashboard
- Verify environment variables
- Test API endpoints
- Check MongoDB connection

---

**Your OTT platform is ready for the world!** 🌍🎬
