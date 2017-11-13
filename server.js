var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require("mongoose");
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');


app.use(express.static(__dirname + '/public'));

app.use(session({
    secret: "something", //"this is a secret"
    resave: true,
    saveUninitialized: true
}));

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// configure a public directory to host static content
var connectionString = 'mongodb://username:pass@ds257485.mlab.com:57485/cs5200hospitaldb';
console.log("Connected to db");
mongoose.connect(connectionString);

require("./serverfiles/models.server.js")(app,mongoose);

var port = process.env.PORT || 3000;

app.listen(port);
