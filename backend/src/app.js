const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const errorHandlerMiddleware = require("../src/middleware/errorHandler");
const cors = require('cors')
app.use(errorHandlerMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true // Agar aap cookies ya session tokens bhej rahe hain
}));

// Routes are imported here
const authRoute = require("../src/routes/auth.route");
const userRoute = require("../src/routes/user.route");
const workspaceRoute = require("./routes/workspace.route");
const workspaceMemberRoute = require("../src/routes/workspace.member.route");
const taskRoute = require("../src/routes/task.route");
const dashboardRoute = require("../src/routes/dashboard.route");
const notificationRoute = require("../src/routes/notification.route");
const commentRoute = require("../src/routes/comment.route");

// all Appi's are use here
app.use("/api", authRoute);
app.use("/api", userRoute);
app.use("/api", workspaceRoute);
app.use("/api", workspaceMemberRoute);
app.use("/api", taskRoute);
app.use("/api", dashboardRoute);
app.use("/api", notificationRoute);
app.use("/api", commentRoute);

app.get("/health", (req, res) => {
  res.send("good");
});

module.exports = app;
