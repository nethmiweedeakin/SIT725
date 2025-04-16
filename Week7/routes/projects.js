//Description: This file contains the routes for the projects API. It handles GET and POST requests to retrieve and create projects respectively.
// It uses the Express framework to define the routes and controllers to handle the logic.

var express = require("express");
var router = express.Router();
var Controllers = require("../controllers");

// This route handles GET requests to retrieve all projects from the database.
router.get('/', (req, res) => {
    Controllers.projectsController.getProjects(res);

})

// This route handles POST requests to create a new project in the database.
router.post('/', (req, res) => {
    Controllers.projectsController.createProject(req.body, res)
    
})


module.exports = router;