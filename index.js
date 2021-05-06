const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const https = require('https');
const fs = require('fs');
const cors = require('cors');
const app = express();
const mysql = require("mysql")
const MySQLStore = require("express-mysql-session")(session);
const port = 4000;

// route 저장소
const userRouter = require('./routes/user');
const mypageRouter = require('./routes/mypage')
const contentRouter = require('./routes/content')

app.use(
  session({
    key: "devpet",
    secret: "@meonghamyo",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
 })
);

const connection = mysql.createConnection(options);
const sessionStore = new MySQLStore(connection);

// app.use(
//   session({
//     secret: '@meonghamyo',
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       domain: "localhost",
//       path: "/",
//       maxAge: 24 * 6 * 60 * 10000,
//       sameSite: "None",
//       httpOnly: true,
//       secure: true,
//     },
//   })
// );

const options = {
  host: "practice-database-deploy.cg6ya8mpemaw.us-east-2.rds.amazonaws.com",
  port: 13306,
  user: "kkt12121",
  password: "mine7579",
  database: "meonghamyo",
};

const sessionStore = new MySQLStore(options);

app.use(cors({
  origin: true,
  methods: "GET, POST, OPTIONS, DELETE, PUT",
  credentials: true,
  allowedHeaders: ['Content-Type', '*']
}))

app.use(express.json()); 
app.use(express.urlencoded( {extended : false } ));
app.use(cookieParser())
app.use('/uploads', express.static("uploads"));
app.use('/mypage', mypageRouter);
app.use('/user', userRouter);
app.use('/content', contentRouter);

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