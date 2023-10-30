const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("joinroom", (room) => socket.join(room));
  socket.on("newMessage", ({ newMsg, room }) => {
    console.log(newMsg, room);
    io.in(room).emit("getLatestMessage", newMsg);
  });
});
app.get("/", (req, res) => {
  console.log("connection is success !");
});

server.listen(8000, () => {
  console.log("server is running iun port 8000");
});
