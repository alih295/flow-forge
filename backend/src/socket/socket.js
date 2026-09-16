let io;

const initSocket = (server) => {
  const { Server } = require("socket.io");
  io = new Server(server, {
    cors: { origin: 'http://localhost:5173' },
  });
  return io;
};
const getIO = () => {
  if (!io) {
    throw new Error("Socket.IO is not initialized");
  }
  return io;
};

module.exports = {
  initSocket,
  getIO,
};
