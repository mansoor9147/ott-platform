@echo off
echo ========================================
echo OTT Platform - Backend Setup
echo ========================================
echo.

cd backend

echo [1/4] Installing dependencies...
call npm install

echo.
echo [2/4] Seeding admin and subscription plans...
call npm run seed

echo.
echo [3/4] Seeding sample videos...
call npm run seed-videos

echo.
echo [4/4] Resetting admin credentials...
call npm run reset-admin

echo.
echo ========================================
echo Setup Complete! Starting backend...
echo ========================================
echo.

call npm run dev
