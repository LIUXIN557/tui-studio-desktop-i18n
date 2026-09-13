@echo off
setlocal
cd /d "%~dp0.."
if errorlevel 1 exit /b 1
call node scripts\start-dev.mjs
set "EXIT_CODE=%ERRORLEVEL%"
if not "%EXIT_CODE%"=="0" echo Web dev environment exited with code %EXIT_CODE%.
exit /b %EXIT_CODE%
