const express = require("express");
const app = express();
const errorHandlerMiddleware = require("../src/middleware/errorHandler");
app.use(errorHandlerMiddleware);
app.use(express.json())
app.use(express.urlencoded({extended:true}))


// Routes are mported here
const userRoute = require("../src/routes/user.route");

// all Appi's are use here
app.use("/api", userRoute);

app.get("/health", (req, res) => {
  res.send("good");
});

module.exports = app;
