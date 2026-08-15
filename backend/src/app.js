const express = require("express");
const app = express();
const cookieParser = require('cookie-parser')
const errorHandlerMiddleware = require("../src/middleware/errorHandler");
app.use(errorHandlerMiddleware);
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

// Routes are imported here
const authRoute = require("../src/routes/auth.route");
const userRoute = require('../src/routes/user.route')
const workspaceRoute = require('./routes/workspace.route')

// all Appi's are use here
app.use("/api", authRoute);
app.use('/api' , userRoute)
app.use('/api',workspaceRoute)

app.get("/health", (req, res) => {
  res.send("good");
});

module.exports = app;
