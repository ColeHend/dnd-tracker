cd /d %~dp0
start cmd.exe  /c "npm run server" 
timeout /t 30 /nobreak
start cmd.exe /c "npm start"

