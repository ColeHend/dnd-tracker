cd /d %~dp0
echo bacon bound we go imp!
start cmd.exe  /c "npm run server" 
timeout /t 5 
start cmd.exe /c "npm start"

