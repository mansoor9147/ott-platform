@echo off
echo ========================================
echo OTT Platform - Frontend Setup
echo ========================================
echo.

cd frontend

echo [1/2] Installing dependencies...
call npm install

echo.
echo [2/2] Starting frontend...
echo ========================================
echo.

call npm start
