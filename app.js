const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const { routers } = require('./routes');
const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";
const allowedOrigins = [
  'http://localhost:3000',
  'https://gogonzogo.github.io',
  'https://splendorous-naiad-632a76.netlify.app',
  'http://192.168.0.81:3000',
];
app.use(express.static('public'));
app.use(logger(formatsLogger));
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.json());
app.use("/api", routers.userRouter, routers.diaryRouter, routers.authRouter);
app.use((req, res) => {
  res.status(404).json({ message: "Hey there! Server is running" });
});
app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
