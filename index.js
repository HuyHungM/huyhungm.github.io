const express = require('express');
const { static } = require("express");
const ejs = require("ejs");
const { join } = require("path");
const app = express();
const session = require("express-session");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { readdirSync } = require('fs');
const config = require('./config.js');
const colors = require('colors');
const helmet = require("helmet");
const csurf = require('csurf');
const compression = require('compression');
const cacheResponseDirective = require('express-cache-response-directive');
const rateLimit = require('express-rate-limit')
const timeout = require('connect-timeout');
const morgan = require('morgan');
require('express-async-errors');

if (!config.port) console.log("🟡 [WARN]: Port chưa được cung cấp, chạy port mặc định 8080".yellow)

app.set("view engine", "ejs");
app.use("/", static(join(__dirname, ".", "public")));

if (!config.uploadSizeLimit) return console.log("🔴 [ERROR]: Vui lòng cung cấp đầy đủ thông tin ở config.js".red)

app.use(bodyParser.json({ limit: `${config.uploadSizeLimit}mb` }))
app.use(bodyParser.urlencoded({ limit: `${config.uploadSizeLimit}mb`, extended: true }));

app.use(cookieParser());
app.use(
  session({
    secret: config.cookieSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  })
);

app.use(helmet({
  contentSecurityPolicy: false,
}));
app.use(csurf({ cookie: true }));
app.use(compression());
app.use(cacheResponseDirective());
app.use(rateLimit({
  windowMs: 3 * 60 * 1000, // 10 minutes
  max: 50,
  message: 'Quá nhiều yêu cầu từ IP của bạn. Vui lòng thử lại sau 10 phút.'
}))
const timeoutDuration = 5000;
const timeoutOptions = {
  respond: false,
  error: { status: 408, message: 'Timeout Error' },
};
const timeoutMiddleware = timeout(timeoutDuration, timeoutOptions);
app.use(timeoutMiddleware);
// (ví dụ: 'dev', 'combined', 'common', 'short', 'tiny')
// const logFormat = 'combined';
// const options = {
//   stream: process.stdout,
// };
// const morganMiddleware = morgan(logFormat, options);
// app.use(morganMiddleware);


const routes = readdirSync(join(__dirname, `Routes`)).filter(file => file.endsWith(".js"));

for (let file of routes) {
  app.use("/", require(`./Routes/${file}`));
  console.log(`🟢 [ROUTES]: Load File ${file}`.green)
}

app.use((req, res, next) => {
  ejs.renderFile(join(__dirname, ".", "views", "404.html"), (err, html) => {
    if (err) {
      console.log(err);
      // xử lý lỗi ở đây nếu cần
    } else {
      res.status(404).send(html);
    }
  });
});

app.listen(config.port || 8080, () => {
  console.log(`🟢 [LIVE]: Web hiện đang chạy tại https://localhost:${config.port || 8080} (http://127.0.0.1:${config.port || 8080})`.green)
});

module.exports = app;