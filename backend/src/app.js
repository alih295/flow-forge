const express = require("express");
const app = express();
const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);
const errorHandlerMiddleware = require("../src/middleware/errorHandler");

app.use(errorHandlerMiddleware);

app.get("/health", (req, res) => {
  res.send("good");
});

module.exports = app;
