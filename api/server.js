const middleware = require("./middleware.js");
const express = require("express");

const server = express();
middleware(server);

const db = require("../data/dbConfig.js");

server.get("/characters", (req, res) => {
  db("characters")
    .then(characters => {
      res.status(200).json(characters);
    })
    .catch(error => {
      res.status(500).json({ error: "The characters could not be retrieved." });
    });
});

module.exports = server;
