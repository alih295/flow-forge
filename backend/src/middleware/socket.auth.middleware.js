const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const socketAuth = async (socket, next) => {
  try {
    let token =
      socket.handshake.auth?.token ||
      socket.handshake.headers?.token ||
      socket.handshake.query?.token;

    if (!token) {
      return next(new Error("user is not authorized"));
    }

    // Agar token ke sath extra semicolon ya path aa raha ho to use saaf karein
    if (token.includes(";")) {
      token = token.split(";")[0].trim();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);

    if (!user) {
      return next(new Error("token is invalid"));
    }

    socket.user = user;
    next();
  } catch (err) {
    console.log("Socket Auth Error Details:", err.message); // Terminal ma error print hoga
    next(new Error("authentication failed"));
  }
};

module.exports = socketAuth;
