@echo off
setlocal
cd /d "%~dp0.."
if errorlevel 1 exit /b 1
if not exist web\dist\index.html call node scripts\build-web.mjs
if errorlevel 1 exit /b 1
call go run github.com/wailsapp/wails/v2/cmd/wails@v2.11.0 dev
set "EXIT_CODE=%ERRORLEVEL%"
if not "%EXIT_CODE%"=="0" echo Desktop dev environment exited with code %EXIT_CODE%.
exit /b %EXIT_CODE%
