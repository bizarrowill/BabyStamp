// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
//dave
var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var session = require('express-session');
var methodOverride = require("method-override");
var path = require("path");
var http = require('http');
var passport = require('passport');
var passportConfig = require('./config/passport')
var application = require('./routes/application');


SALT_WORK_FACTOR = 12;
//dave

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Static directory
app.use(express.static("public"));

//dave
//added from passport.js authentication example
app.use(cookieParser());
//settings from express-session
app.use(session({
    secret: 'keepsyoulogged',
    resave: false,
    saveUninitialized: false}))
app.use(passport.initialize())
app.use(passport.session())

app.use(methodOverride("_method"));
//dave

// Set Handlebars.
var exphbs = require("express-handlebars");
//dave
require('./public/js/handlebars.js')(exphbs);
//dave
//________________________________________________________________
//Direct us to where the handle bars gets pointed at 
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
// =============================================================
//dave
require("./routes/authenticate.js")(app);
require("./routes/api-user.js")(app);
//dave

require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);



// Syncing our sequelize models and then starting our Express app
// =============================================================
//dave
db.sequelize.sync()
	.then(function(err){
		});
		app.listen(PORT, function() {
			console.log("App listening on PORT: " + PORT);
	});

//dave