const express = require("express");
const http = require("http");
const socket = require("./socket");
const settings = require("./settings");
const routes = require("./routes");

// creating the http server
const app = express();
const server = http.Server(app);

// adding custom settings
settings(app);

// setting up the socket with node http server
socket(server);

// setting up the routes
routes(app);

server.listen(3000, console.log("Server is running at http://localhost:3000"));
