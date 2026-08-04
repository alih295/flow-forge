const dotenv = require("dotenv");
dotenv.config();
const http = require("http");
const app = require("./src/app");
const connectToDb = require("./src/config/dbConnection");
const port = process.env.PORT;

const server = http.createServer(app);

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
