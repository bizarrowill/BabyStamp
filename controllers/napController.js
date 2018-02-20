var express = require("express");

var router = express.Router();

// Import the model (nap.js) to use its database functions.
var nap = require("../models/nap.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {


});

router.post("/api/naps", function(req, res) {


  
});

router.put("/api/naps/:id", function(req, res) {
 


});

router.delete("/api/naps/:id", function(req, res) {
 

});

// Export routes for server.js to use.
module.exports = router;
