const express = require("express");
const bodyParser = require("body-parser");
const Sequelize = require('sequelize')
const api = require("./server/routes/api");

const app = express();
const sequelize = new Sequelize('mysql://root:@localhost/crm_db')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With");
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", api);

const PORT = 8080;
app.listen(PORT, () => console.log(`Running server on port ${PORT}`));