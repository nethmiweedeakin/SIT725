// Description: This file contains the controller for the project routes.
// It handles the requests and responses for getting and creating projects.

let Service = require("../services");

// Function to get all project cards from the database
const getProjects = (res) => {
    console.log('Retrived controller project data')
    Service.ProjectService.getAllProjects(res)
}

// Function to create a new project card in the database
const createProject = (data, res) => {
    console.log('Created controller project data')
    Service.ProjectService.insertProject(data,res)
}

// Exporting the functions to be used in the routes
module.exports = {
    getProjects, createProject
}