var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  bodyParser = require('body-parser');
var cors = require('cors');
var User = require('./api/models/userModel');
var Project = require('./api/models/projectModel');
var authenticator = require('./api/controllers/authenticater');

mongoose.Promise = global.Promise;
// set database 
mongoose.connect('mongodb://localhost/indoorMapDb');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(authenticator.authenticate);
// import routes
var routes = require('./api/routes/routes');
routes(app);

app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + ' not found' })
});

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);
