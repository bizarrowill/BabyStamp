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

  // GET route for getting all of the stamps
  app.get("/api/stamps", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.Stamp.findAll({}).then(function(dbStamp) {
      // We have access to the stamps as an argument inside of the callback function
      res.json(dbStamp);
    });
  });

  // POST route for saving a new Stamp
  app.post("/api/stamps", function(req, res) {
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property (req.body)
    db.Stamp.create({
      text: req.body.text,
      complete: req.body.complete
    }).then(function(dbStamp) {
      // We have access to the new Stamp as an argument inside of the callback function
      res.json(dbStamp);
    })
    .catch(function(err) {
      // Whenever a validation or flag fails, an error is thrown
      // We can "catch" the error to prevent it from being "thrown", which could crash our node app
      res.json(err);
    });
  });

  // POST route for adding a stamp to activity (JP)
  app.post("/api/activity", function(req, res) {
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property (req.body)
    console.log('req.body', req.body);
    console.log('req.body.text', req.body.stamp.text);
    // ===============================================================
    /*db.activity.create({
      text: req.body.text,
      complete: req.body.complete
    }).then(function(dbStamp) {
      // We have access to the new Stamp as an argument inside of the callback function
      res.json(dbStamp);
    })
    .catch(function(err) {
      // Whenever a validation or flag fails, an error is thrown
      // We can "catch" the error to prevent it from being "thrown", which could crash our node app
      res.json(err);
    });*/
  });

  // DELETE route for deleting stamps. We can get the id of the Stamp to be deleted from
  // req.params.id
  app.delete("/api/stamps/:id", function(req, res) {
    // We just have to specify which Stamp we want to destroy with "where"
    db.Stamp.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbStamp) {
      res.json(dbStamp);
    });

  });

  // PUT route for updating stamps. We can get the updated Stamp data from req.body
  app.put("/api/stamps", function(req, res) {

    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    db.Stamp.update({
      text: req.body.text,
      complete: req.body.complete
    }, {
      where: {
        id: req.body.id
      }
    }).then(function(dbStamp) {
      res.json(dbStamp);
    })
    .catch(function(err) {
      // Whenever a validation or flag fails, an error is thrown
      // We can "catch" the error to prevent it from being "thrown", which could crash our node app
      res.json(err);
    });
  });
};
