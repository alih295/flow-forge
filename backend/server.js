const dotenv = require("dotenv");
dotenv.config();
const dns = require("node:dns/promises");
dns.setServers(["1.1.1.1", "8.8.8.8"]);
const http = require("http");
const app = require("./src/app");
const connectToDb = require("./src/config/dbConnection");
const port = process.env.PORT;
const { Server } = require("socket.io");
const socketAuth = require("./src/middleware/socket.auth.middleware");
const { initSocket } = require("./src/socket/socket");

const server = http.createServer(app)
const io = initSocket(server)
io.use(socketAuth);





io.on("connection", (socket) => {
  console.log("user is conenected", socket.user._id );
  const userRoom = `user_${socket.user._id}`;
  socket.join(userRoom);
  console.log(`user joined room ${userRoom}`);

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.user);
  });
});

async function startServer() {
  try {
    await connectToDb();
    server.listen(port || 5000, () => {
      console.log(`server s running on port ${port}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
startServer();
