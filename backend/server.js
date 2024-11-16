require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
// const cors = require('cors');
const express = require("express");
const path = require("path");

const connectDB = require("./config/db");

const app = express(); // to accept json data
connectDB();

const port = process.env.PORT || 5002;

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  // res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  // res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

/*production part */

// const __mydirname = path.resolve();
// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__mydirname, '/frontend/build')));
//     app.get("*", (req, res) => {
//         res.sendFile(path.resolve(__mydirname, "frontend", "build", "index.html"));
//     });
// } else {
//     app.get("/", (req, res) => {
//         res.send("API is running...");
//     });
// }

/*production part */

app.use(express.json());

// different routes

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const server = app.listen(port, "0.0.0.0", () => {
  console.log("Server started on port " + port);
});

const io = require("socket.io")(server, {
  pingTimeout: 60000, // close connection if no response from client even after 60 seconds
  cors: {
    origin: "http://localhost:3000",
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageReceived) => {
    var chat = newMessageReceived.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageReceived.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageReceived);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.emit("disconnected");
    socket.leave(userData._id);
    console.log("Disconnected from socket.io");
  });
});
