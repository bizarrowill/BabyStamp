// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {
  // Create all our routes and set up logic within those routes where required.
  app.get("/", function( req, res ) {
    res.render("loginpage", {});
  });
  // landing page
  app.get("/landing", function( req, res ) {
    res.render("landing", {});
  });


  app.get("/index", function( req, res ) {
    res.render("index", {});
  });

};
