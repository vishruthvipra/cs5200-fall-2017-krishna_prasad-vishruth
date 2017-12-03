var express       = require('express');
var mongoose      = require("mongoose");
var bodyParser    = require('body-parser');
var passport      = require('passport');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');


var app = express();

app.use(session({
    secret: 'this is the secret',
    resave: true,
    saveUninitialized: true
}));

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

// configure a public directory to host static content
var connectionString = 'mongodb://username:pass@ds257485.mlab.com:57485/cs5200hospitaldb';
console.log("Connected to db");
mongoose.connect(connectionString);

require("./serverfiles/models.server.js")(app, mongoose, passport);

var port = process.env.PORT || 3000;

app.listen(port);
