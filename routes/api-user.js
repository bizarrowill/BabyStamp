var db = require("../models");
var passport = require("passport");
var moment = require("moment")
//require authentication for any route; make sure username is in the route parameter
var application = application = require('./application');

module.exports = function(app) {
    //wrapper function to check the property of existing objects (for testing purposes)
    function hasProp (obj, prop) {
        return Object.prototype.hasOwnProperty.call(obj, prop);
      }
    //renders the landing page
    app.get("/", function(req,res) {
        if (hasProp(req, 'user')) {
            var hbsObj = {
                username: req.user.username
            }
        }
        res.render("loginpage",hbsObj)
    })
}