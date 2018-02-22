var express = require("express");

var router = express.Router();

// Import the model (stamp.js) to use its database functions.
var stamp = require("../models/stamp.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {


});

router.post("/api/stamps", function(req, res) {


  
});

router.put("/api/stamps/:id", function(req, res) {
 


});

router.delete("/api/stamps/:id", function(req, res) {
 

});

// Export routes for server.js to use.
module.exports = router;
