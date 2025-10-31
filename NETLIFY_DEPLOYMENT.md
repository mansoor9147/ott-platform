# 🌐 Deploy Frontend to Netlify

Complete guide to deploy your OTT platform frontend to Netlify.

---

## 🎯 Why Netlify for Frontend?

- ✅ **Faster**: Better CDN and performance
- ✅ **Free SSL**: Automatic HTTPS
- ✅ **Custom Domain**: Easy setup
- ✅ **Auto Deploy**: Push to GitHub = Auto deploy
- ✅ **Preview Deploys**: Test before going live
- ✅ **Generous Free Tier**: 100GB bandwidth/month

---

## 📋 Prerequisites

1. ✅ GitHub account
2. ✅ Netlify account (free tier available)
3. ✅ Backend deployed on Render (from previous step)
4. ✅ Your project code on GitHub

---

## 🚀 Deployment Methods

### Method 1: Deploy via Netlify Dashboard (Recommended)

#### Step 1: Push to GitHub (if not done)
```bash
cd C:\Users\Dell\Desktop\mansoor\ott-platform
git add .
git commit -m "Add Netlify configuration"
git push origin main
```

#### Step 2: Create Netlify Site
1. Go to https://app.netlify.com
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **"Deploy with GitHub"**
4. Authorize Netlify to access your repositories
5. Select your `ott-platform` repository

#### Step 3: Configure Build Settings
**Basic build settings:**
- **Base directory**: `frontend`
- **Build command**: `npm install && npm run build`
- **Publish directory**: `frontend/build`
- **Branch to deploy**: `main`

#### Step 4: Add Environment Variables
Click **"Show advanced"** → **"New variable"**

Add this variable:
| Key | Value |
|-----|-------|
| `REACT_APP_API_URL` | `https://ott-platform-backend.onrender.com/api` |

**Important:** Replace with your actual Render backend URL!

#### Step 5: Deploy Site
1. Click **"Deploy site"**
2. Wait 3-5 minutes for build
3. Your site will be live at: `https://random-name-123.netlify.app`

#### Step 6: Update Backend CORS
1. Go to your Render backend dashboard
2. Environment variables
3. Update `FRONTEND_URL` to your Netlify URL:
   ```
   FRONTEND_URL=https://your-site-name.netlify.app
   ```
4. Save (backend will redeploy)

---

### Method 2: Deploy via Netlify CLI

#### Step 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

#### Step 2: Login to Netlify
```bash
netlify login
```

#### Step 3: Initialize Site
```bash
cd C:\Users\Dell\Desktop\mansoor\ott-platform
netlify init
```

Follow prompts:
- Create & configure a new site
- Team: Your team
- Site name: `ott-platform` (or custom name)
- Build command: `cd frontend && npm install && npm run build`
- Publish directory: `frontend/build`

#### Step 4: Set Environment Variables
```bash
netlify env:set REACT_APP_API_URL "https://ott-platform-backend.onrender.com/api"
```

#### Step 5: Deploy
```bash
netlify deploy --prod
```

---

### Method 3: Drag & Drop (Quick Test)

#### Step 1: Build Locally
```bash
cd C:\Users\Dell\Desktop\mansoor\ott-platform\frontend

# Create .env file
echo REACT_APP_API_URL=https://ott-platform-backend.onrender.com/api > .env

# Build
npm run build
```

#### Step 2: Deploy
1. Go to https://app.netlify.com/drop
2. Drag `frontend/build` folder
3. Site goes live instantly!

**Note:** This method doesn't support auto-deploy from GitHub.

---

## 🎨 Custom Domain (Optional)

### Step 1: Add Custom Domain
1. Go to Netlify site dashboard
2. **Domain settings** → **Add custom domain**
3. Enter your domain: `ottplatform.com`

### Step 2: Configure DNS
Add these records to your domain provider:

**A Record:**
```
Type: A
Name: @
Value: 75.2.60.5
```

**CNAME Record:**
```
Type: CNAME
Name: www
Value: your-site-name.netlify.app
```

### Step 3: Enable HTTPS
1. Netlify auto-provisions SSL certificate
2. Wait 24 hours for DNS propagation
3. HTTPS will be enabled automatically

---

## ⚙️ Configuration Files

### netlify.toml (Already Created)
Located at project root, configures:
- ✅ Build settings
- ✅ Redirects for SPA routing
- ✅ Security headers
- ✅ Cache settings

### _redirects (Already Created)
Located at `frontend/_redirects`:
- ✅ Handles React Router
- ✅ All routes → index.html

---

## 🔧 Environment Variables

### Required Variables:
```
REACT_APP_API_URL=https://your-backend.onrender.com/api
```

### Optional Variables:
```
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_...
REACT_APP_GOOGLE_ANALYTICS_ID=UA-...
```

### How to Add:
1. Site dashboard → **Site settings**
2. **Environment variables** → **Add a variable**
3. Or use CLI: `netlify env:set KEY "value"`

---

## 📊 Build Settings Reference

### Recommended Settings:
```toml
[build]
  base = "frontend"
  command = "npm install && npm run build"
  publish = "build"

[build.environment]
  NODE_VERSION = "18"
  NPM_VERSION = "9"
```

### Build Command Options:
```bash
# Standard
npm install && npm run build

# With CI flag (faster)
CI=false npm install && npm run build

# Clear cache
rm -rf node_modules && npm install && npm run build
```

---

## 🚀 Continuous Deployment

### Auto-Deploy on Git Push:
```bash
# Make changes
git add .
git commit -m "Update feature"
git push origin main

# Netlify automatically:
# 1. Detects push
# 2. Builds project
# 3. Deploys to production
```

### Deploy Previews:
- Every pull request gets a preview URL
- Test before merging
- Share with team for review

### Branch Deploys:
- Deploy specific branches
- Useful for staging environments
- Configure in site settings

---

## 🔍 Monitoring & Analytics

### Built-in Analytics:
1. Site dashboard → **Analytics**
2. View:
   - Page views
   - Unique visitors
   - Top pages
   - Traffic sources

### Build Logs:
1. **Deploys** → Select deploy
2. View detailed build logs
3. Debug build errors

### Performance:
1. **Site settings** → **Performance**
2. Enable:
   - Asset optimization
   - Image optimization
   - Prerendering

---

## 🐛 Troubleshooting

### Issue: Build Fails
**Solution:**
```bash
# Check logs in Netlify dashboard
# Common fixes:

# 1. Clear cache
Site settings → Build & deploy → Clear cache

# 2. Update build command
npm ci && npm run build

# 3. Check Node version
[build.environment]
  NODE_VERSION = "18"
```

### Issue: 404 on Routes
**Solution:**
- Verify `netlify.toml` has redirects
- Or add `_redirects` file in `frontend/public`
- Content: `/*    /index.html   200`

### Issue: Environment Variables Not Working
**Solution:**
```bash
# Must start with REACT_APP_
REACT_APP_API_URL=...  ✅
API_URL=...            ❌

# Rebuild after adding variables
Deploys → Trigger deploy → Clear cache and deploy
```

### Issue: API Calls Failing
**Solution:**
1. Check REACT_APP_API_URL is correct
2. Verify backend CORS allows Netlify domain
3. Check backend FRONTEND_URL includes Netlify URL
4. Test API endpoint directly in browser

---

## 📈 Performance Optimization

### 1. Enable Asset Optimization
```toml
[build.processing]
  skip_processing = false

[build.processing.css]
  bundle = true
  minify = true

[build.processing.js]
  bundle = true
  minify = true

[build.processing.images]
  compress = true
```

### 2. Add Cache Headers
Already configured in `netlify.toml`:
```toml
[[headers]]
  for = "/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### 3. Enable Prerendering
1. Site settings → **Build & deploy**
2. **Prerendering** → Enable
3. Faster initial page loads

---

## 🔐 Security Best Practices

### 1. Environment Variables
- ✅ Never commit `.env` files
- ✅ Use Netlify's environment variables
- ✅ Rotate secrets regularly

### 2. HTTPS
- ✅ Automatic SSL certificate
- ✅ Force HTTPS redirect
- ✅ HSTS headers enabled

### 3. Security Headers
Already configured in `netlify.toml`:
```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
```

---

## 💰 Pricing & Limits

### Free Tier:
- ✅ 100GB bandwidth/month
- ✅ 300 build minutes/month
- ✅ Unlimited sites
- ✅ Automatic HTTPS
- ✅ Deploy previews
- ✅ Form submissions (100/month)

### Pro Tier ($19/month):
- ✅ 400GB bandwidth
- ✅ 1000 build minutes
- ✅ Background functions
- ✅ Analytics
- ✅ Priority support

---

## 🎯 Deployment Checklist

### Pre-Deployment:
- [ ] Code pushed to GitHub
- [ ] Backend deployed on Render
- [ ] Backend URL noted
- [ ] netlify.toml created
- [ ] _redirects file created

### Deployment:
- [ ] Netlify site created
- [ ] Build settings configured
- [ ] Environment variables added
- [ ] First deploy successful
- [ ] Site URL noted

### Post-Deployment:
- [ ] Backend FRONTEND_URL updated
- [ ] Site loads correctly
- [ ] Login/register works
- [ ] Movies display
- [ ] All features tested
- [ ] Custom domain added (optional)

---

## 🎉 Your Deployed URLs

### After Deployment:
- **Frontend (Netlify)**: `https://your-site.netlify.app`
- **Backend (Render)**: `https://ott-platform-backend.onrender.com`
- **Admin**: `https://your-site.netlify.app/admin/login`

### Admin Credentials:
- **Email**: 231fa04a47@gmail.com
- **Password**: 123@123

---

## 📞 Support Resources

### Netlify Documentation:
- https://docs.netlify.com

### Community:
- https://answers.netlify.com

### Status:
- https://www.netlifystatus.com

---

## 🚀 Next Steps

1. **Deploy to Netlify** (5-10 minutes)
2. **Test everything** (5 minutes)
3. **Update backend CORS** (2 minutes)
4. **Add custom domain** (optional)
5. **Share with users** 🎉

---

**Your OTT platform frontend will be blazing fast on Netlify!** ⚡
