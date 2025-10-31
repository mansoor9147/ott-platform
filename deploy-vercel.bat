@echo off
echo ========================================
echo Pushing Vercel Configuration to GitHub
echo ========================================
echo.

git add vercel.json VERCEL_DEPLOYMENT.md
git commit -m "Add-Vercel-deployment-config"
git push origin main

echo.
echo ========================================
echo Done! Now deploy on Vercel:
echo 1. Go to https://vercel.com
echo 2. Sign in with: 231fa04a47@gmail.com
echo 3. Import: ott-platform repository
echo 4. Set Root Directory: frontend
echo 5. Add env: REACT_APP_API_URL
echo ========================================
pause
