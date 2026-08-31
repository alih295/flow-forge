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

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
io.use(socketAuth);
io.on("connection", (socket) => {
  console.log("user is conenected", socket.id);

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
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
