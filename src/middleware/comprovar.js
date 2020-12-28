const express = require('express');
const app = express();

let comprovar = (req, res, next) => {
  console.log(req.url);
  next();
};

module.exports = {
  comprovar,
};
