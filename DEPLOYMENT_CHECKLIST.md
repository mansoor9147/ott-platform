# 🚀 Deployment Checklist - OTT Platform

Use this checklist to ensure your OTT platform is ready for production deployment.

## 📋 Pre-Deployment Checklist

### Backend Security
- [ ] Change default admin credentials
- [ ] Generate strong JWT secrets (use: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`)
- [ ] Update JWT_SECRET in production
- [ ] Update JWT_REFRESH_SECRET in production
- [ ] Set NODE_ENV to 'production'
- [ ] Enable HTTPS
- [ ] Configure CORS for production domain
- [ ] Set up rate limiting
- [ ] Review and update security headers
- [ ] Disable console.logs in production
- [ ] Set up error logging service (e.g., Sentry)

### Database
- [ ] Set up MongoDB Atlas or production database
- [ ] Create database backups
- [ ] Set up database indexes
- [ ] Configure database access rules
- [ ] Whitelist production server IPs
- [ ] Set up database monitoring
- [ ] Test database connection from production server

### Environment Variables
- [ ] Set all required environment variables on hosting platform
- [ ] Verify MONGODB_URI points to production database
- [ ] Update FRONTEND_URL to production domain
- [ ] Configure email service credentials (if using)
- [ ] Configure Twilio credentials (if using real OTP)
- [ ] Configure Stripe keys (if using real payments)
- [ ] Remove or secure development-only variables

### File Storage
- [ ] Set up cloud storage (AWS S3, Cloudinary, etc.)
- [ ] Update file upload paths
- [ ] Configure CDN for video delivery
- [ ] Set up video transcoding (optional)
- [ ] Test file upload in production environment
- [ ] Set appropriate file size limits
- [ ] Configure CORS for file access

### Frontend
- [ ] Update API URL to production backend
- [ ] Build production bundle (`npm run build`)
- [ ] Test production build locally
- [ ] Optimize images and assets
- [ ] Configure CDN for static assets
- [ ] Set up analytics (Google Analytics, etc.)
- [ ] Test all routes and features
- [ ] Verify responsive design on all devices

### API & Backend
- [ ] Test all API endpoints
- [ ] Verify authentication flows
- [ ] Test file uploads
- [ ] Test video streaming
- [ ] Verify subscription flow
- [ ] Test payment processing
- [ ] Check error handling
- [ ] Verify email sending (if enabled)
- [ ] Test OTP sending (if enabled)

### Performance
- [ ] Enable gzip compression
- [ ] Set up caching headers
- [ ] Optimize database queries
- [ ] Add database indexes
- [ ] Implement pagination where needed
- [ ] Optimize image sizes
- [ ] Minify frontend assets
- [ ] Enable lazy loading

### Monitoring & Logging
- [ ] Set up application monitoring (PM2, New Relic, etc.)
- [ ] Configure error tracking (Sentry, Rollbar, etc.)
- [ ] Set up uptime monitoring
- [ ] Configure log aggregation
- [ ] Set up performance monitoring
- [ ] Create alerts for critical errors
- [ ] Monitor database performance

### Testing
- [ ] Test user registration
- [ ] Test email/password login
- [ ] Test phone/OTP login
- [ ] Test password reset
- [ ] Test video upload (admin)
- [ ] Test video streaming
- [ ] Test subscription purchase
- [ ] Test watchlist functionality
- [ ] Test search functionality
- [ ] Test admin panel features
- [ ] Test on multiple browsers
- [ ] Test on mobile devices
- [ ] Test on tablets

### Legal & Compliance
- [ ] Add Terms of Service
- [ ] Add Privacy Policy
- [ ] Add Cookie Policy
- [ ] Add GDPR compliance (if applicable)
- [ ] Add content licensing information
- [ ] Set up DMCA takedown process
- [ ] Add age verification (if required)

### Documentation
- [ ] Update README with production URLs
- [ ] Document API endpoints
- [ ] Create user guide
- [ ] Create admin guide
- [ ] Document deployment process
- [ ] Create troubleshooting guide

## 🌐 Deployment Platforms

### Backend Deployment Options

#### Option 1: Heroku
```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_secret
# ... set all other variables

# Deploy
git push heroku main
```

#### Option 2: Railway
1. Connect GitHub repository
2. Select backend folder
3. Add environment variables
4. Deploy automatically

#### Option 3: Render
1. Create new Web Service
2. Connect repository
3. Set build command: `cd backend && npm install`
4. Set start command: `cd backend && npm start`
5. Add environment variables
6. Deploy

#### Option 4: DigitalOcean/AWS/Azure
1. Set up server (Ubuntu recommended)
2. Install Node.js and MongoDB
3. Clone repository
4. Install dependencies
5. Set up PM2 for process management
6. Configure Nginx as reverse proxy
7. Set up SSL with Let's Encrypt

### Frontend Deployment Options

#### Option 1: Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to frontend
cd frontend

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

#### Option 2: Netlify
```bash
# Build the app
npm run build

# Deploy to Netlify
# Drag and drop build folder to Netlify
# Or use Netlify CLI
```

#### Option 3: AWS S3 + CloudFront
1. Build the app
2. Upload to S3 bucket
3. Configure bucket for static hosting
4. Set up CloudFront distribution
5. Configure custom domain

## 🔒 Security Hardening

### Backend
```javascript
// Add to server.js
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

### Environment Variables
Never commit:
- JWT secrets
- Database credentials
- API keys
- Email passwords
- Payment gateway keys

### HTTPS
- Use Let's Encrypt for free SSL
- Force HTTPS redirect
- Set secure cookie flags

## 📊 Post-Deployment

### Immediate Actions
- [ ] Test all critical features
- [ ] Monitor error logs
- [ ] Check performance metrics
- [ ] Verify email delivery
- [ ] Test payment flow
- [ ] Monitor database connections
- [ ] Check CDN delivery

### First Week
- [ ] Monitor user registrations
- [ ] Track error rates
- [ ] Analyze performance
- [ ] Gather user feedback
- [ ] Fix critical bugs
- [ ] Optimize slow queries

### Ongoing
- [ ] Regular backups
- [ ] Security updates
- [ ] Dependency updates
- [ ] Performance optimization
- [ ] Feature additions
- [ ] Bug fixes

## 🆘 Rollback Plan

If deployment fails:
1. Keep previous version running
2. Test new version in staging
3. Have database backup ready
4. Document rollback steps
5. Monitor error rates
6. Be ready to revert

## 📞 Support Contacts

- Hosting Support: [Platform support]
- Database Support: [MongoDB Atlas support]
- CDN Support: [CDN provider support]
- Payment Gateway: [Stripe support]

## ✅ Final Verification

Before going live:
- [ ] All tests passing
- [ ] No console errors
- [ ] All features working
- [ ] Performance acceptable
- [ ] Security measures in place
- [ ] Monitoring active
- [ ] Backups configured
- [ ] Documentation complete

## 🎉 Launch!

Once all items are checked:
1. Announce launch
2. Monitor closely for first 24 hours
3. Be ready to respond to issues
4. Gather user feedback
5. Plan next iteration

---

**Good luck with your deployment! 🚀**
