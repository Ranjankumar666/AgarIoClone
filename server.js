// Imports
const express = require("express");
const app = express();
const path = require("path");
const helmet = require("helmet");

// Middlewares
app.use(express.static(path.join(__dirname, "/public")));
app.use(helmet());

// Code Base

const httpServer = app.listen(3000, () => {
  console.log("Server started");
});

const io = require("socket.io")(httpServer);

module.exports = {
  io,
  app
}
