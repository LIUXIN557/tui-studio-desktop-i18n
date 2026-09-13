@echo off
setlocal
cd /d "%~dp0.."
if errorlevel 1 exit /b 1
call node scripts\build-portable.mjs
set "EXIT_CODE=%ERRORLEVEL%"
if not "%EXIT_CODE%"=="0" echo Portable build failed with exit code %EXIT_CODE%.
exit /b %EXIT_CODE%
