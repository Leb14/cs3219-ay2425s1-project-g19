const http = require("http");
const index = require("./index.js");
require("dotenv").config();
const { connectToDB } = require("./model/repository.js");

const port = process.env.PORT || 8000;

const server = http.createServer(index);

connectToDB()
  .then(() => {
    console.log("MongoDB Connected!");

    server.listen(port);
    console.log("User service server listening on http://localhost:" + port);
  })
  .catch((err) => {
    console.error("Failed to connect to DB");
    console.error(err);
  });
