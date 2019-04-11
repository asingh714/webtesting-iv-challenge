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

server.post("/characters", (req, res) => {
  const character = req.body;

  db("characters")
    .insert(character)
    .then(ids => {
      const id = ids[0];
      db("characters")
        .where({ id })
        .then(character => {
          res.status(201).json(character);
        });
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error while saving the character to the database."
      });
    });
});

server.delete("/characters/:id", (req, res) => {
  const { id } = req.params;

  db("characters")
    .where({ id })
    .del()
    .then(count => {
      if (count > 0) {
        res.status(200).json(count);
      } else {
        res.status(404).json({
          message: "The character with the specified ID does not exist."
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: "The character could not be removed."
      });
    });
});

module.exports = server;
