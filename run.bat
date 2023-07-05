@echo off
cd /d %~dp0
echo dont click anything else. Please.
timeout /t 6
start cmd.exe  /c "npm run server" 
timeout /t 10 
start cmd.exe /c "npm start"

