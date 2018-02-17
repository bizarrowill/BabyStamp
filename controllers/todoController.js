var express = require("express");

var router = express.Router();

// Import the model (todo.js) to use its database functions.
var nap = require("../models/todo.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {


});

router.post("/api/todos", function(req, res) {


  
});

router.put("/api/todos/:id", function(req, res) {
 


});

router.delete("/api/todos/:id", function(req, res) {
 

});

// Export routes for server.js to use.
module.exports = router;
