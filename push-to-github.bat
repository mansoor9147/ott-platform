@echo off
echo ========================================
echo Pushing OTT Platform to GitHub
echo ========================================
echo.

echo Step 1: Committing files...
git commit -m "Initial commit - Complete OTT Platform"

echo.
echo Step 2: Renaming branch to main...
git branch -M main

echo.
echo Step 3: Pushing to GitHub...
git push -u origin main

echo.
echo ========================================
echo Done! Check your repository at:
echo https://github.com/mansoor9147/ott-platform
echo ========================================
pause
