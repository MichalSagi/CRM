const express = require("express");
const bodyParser = require("body-parser");
const Sequelize = require('sequelize')
const api = require("./server/routes/api");

const app = express();
var connection = mysql.createConnection({
  host     : 'eu-cdbr-west-03.cleardb.net',
  user     : 'bdc1ca2afb459d',
  password : '6b3048cf',
  database : 'heroku_32b4097bba3e3f9'
});

const sequelize = new Sequelize( connection || 'mysql://root:@localhost/crm_db')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With");
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", api);

// app.use('/', express.static(path.join(__dirname, 'dist')))

const PORT = 8080;
app.listen( process.env.PORT || PORT, () => console.log(`Running server on port ${PORT}`));