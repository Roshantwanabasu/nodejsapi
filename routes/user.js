const express = require("express");
const router = express.Router();
const db = require("../lib/database.js");

router.get("/", (req, res, next) => {
  res.status(200).send("user");
});

router.get("/getAllUser", (req, res, next) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send({ error: false, data: result });
    }
  });
});

module.exports = router;
