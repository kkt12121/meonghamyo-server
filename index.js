const express = require('express');
const https = require('https');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 4000;

app.use(cors());

app.get('/', function(req,res) {
    res.send("<h1>hi friend!</h1>")
})

let server;

if (fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")) {
  server = https
    .createServer(
      {
        key: fs.readFileSync(__dirname + `/` + 'key.pem', 'utf-8'),
        cert: fs.readFileSync(__dirname + `/` + 'cert.pem', 'utf-8'),
      },
      app
    )
    .listen(port, function() {
        console.log("https 서버연결 성공 !")
    });
} else {
  server = app.listen(port, function() {
    console.log("http로 연결되었습니다 !")
 })
}

module.exports = server;