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

  // GET route for getting all of the naps
  app.get("/api/naps", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.Nap.findAll({}).then(function(dbNap) {
      // We have access to the naps as an argument inside of the callback function
      res.json(dbNap);
    });
  });

  // POST route for saving a new Nap
  app.post("/api/naps", function(req, res) {
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property (req.body)
    db.Nap.create({
      text: req.body.text,
      complete: req.body.complete
    }).then(function(dbNap) {
      // We have access to the new Nap as an argument inside of the callback function
      res.json(dbNap);
    })
    .catch(function(err) {
      // Whenever a validation or flag fails, an error is thrown
      // We can "catch" the error to prevent it from being "thrown", which could crash our node app
      res.json(err);
    });
  });

  // DELETE route for deleting naps. We can get the id of the Nap to be deleted from
  // req.params.id
  app.delete("/api/naps/:id", function(req, res) {
    // We just have to specify which Nap we want to destroy with "where"
    db.Nap.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbNap) {
      res.json(dbNap);
    });

  });

  // PUT route for updating naps. We can get the updated Nap data from req.body
  app.put("/api/naps", function(req, res) {

    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    db.Nap.update({
      text: req.body.text,
      complete: req.body.complete
    }, {
      where: {
        id: req.body.id
      }
    }).then(function(dbNap) {
      res.json(dbNap);
    })
    .catch(function(err) {
      // Whenever a validation or flag fails, an error is thrown
      // We can "catch" the error to prevent it from being "thrown", which could crash our node app
      res.json(err);
    });
  });
};
