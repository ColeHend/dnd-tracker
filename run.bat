@echo off
cd /d %~dp0
echo dont touch your mouse or click anything else. the bat wont start the servers
timeout /t 6
start cmd.exe  /c "npm run server" 
timeout /t 10 
start cmd.exe /c "npm start"

