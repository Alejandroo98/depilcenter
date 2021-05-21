const express = require("express");
const app = express();
const path = require("path");
app.set("views", path.resolve(__dirname, "../routes-privates"));

app.get("/login", (req, res) => {
  res.render("login");
});

module.exports = app;
