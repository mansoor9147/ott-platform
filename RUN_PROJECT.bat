@echo off
echo ========================================
echo OTT Platform - Complete Setup and Run
echo ========================================
echo.

echo [INFO] This will start your OTT platform
echo [INFO] Make sure MongoDB Atlas URI is configured in backend/.env
echo.
pause

echo.
echo ========================================
echo Step 1: Starting Backend Server
echo ========================================
echo.

start cmd /k "cd backend && echo Backend Server Starting... && npm run dev"

echo [OK] Backend server starting in new window...
echo [WAIT] Waiting 5 seconds for backend to initialize...
timeout /t 5 /nobreak >nul

echo.
echo ========================================
echo Step 2: Starting Frontend Server
echo ========================================
echo.

start cmd /k "cd frontend && echo Frontend Server Starting... && npm start"

echo [OK] Frontend server starting in new window...
echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo Admin: http://localhost:3000/admin/login
echo.
echo Admin Credentials:
echo Email: 231fa04a47@gmail.com
echo Password: 123@123
echo.
echo [INFO] Browser will open automatically
echo [INFO] If you see errors, check the terminal windows
echo.
echo Press any key to exit this window...
pause >nul
