const express = require("express");
const router = express.Router();
const db = require("../lib/database.js");

router.get("/", (req, res, next) => {
  res.status(200).send("user");
});

router.get("/getalluser", (req, res, next) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send({ error: false, data: result });
    }
  });
});

router.post("/user", (req, res, next) => {
  var { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).send({ error: true, message: "Please fill all fields" });
  }
  db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [
    name,
    email,
    password,
  ], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send({ error: false, data: result });
    }
  });
});

router.get("/user/:id", (req, res, next) => {
  let user_id = req.params.id;
  if(user_id == null){
    res.status(400).send({ error: true, message: "User id is required" });
  }
  db.query("SELECT * FROM users WHERE id = ?", [user_id], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send({ error: false, data: result });
    }
  });
});

module.exports = router;
