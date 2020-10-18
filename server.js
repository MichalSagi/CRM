const express = require("express");
const bodyParser = require("body-parser");
const Sequelize = require('sequelize')
const api = require("./server/routes/api");

const app = express();
const sequelize = new Sequelize( process.env.CLEARDB_DATABASE_URL || 'mysql://root:@localhost/crm_db')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With");
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use("/", api);
// app.use('/', express.static(path.join(__dirname, 'dist')))

const PORT = 8080;
app.listen( process.env.PORT || PORT, () => console.log(`Running server on port ${PORT}`));

// process.env.PORT ||
// process.env.CLEARDB_DATABASE_URL ||
// mysql://
// bdc1ca2afb459d
// :
// 6b3048cf
// @eu-cdbr-west-03.cleardb.net
// /
// heroku_32b4097bba3e3f9
// ?
// reconnect=true