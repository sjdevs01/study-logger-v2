CALL npm i express cookie-parser
CALL npm install pm2 -g
CALL npm install pm2-windows-startup -g
CALL pm2-startup install
CALL pm2 start index.js --name Study
CALL pm2 save
