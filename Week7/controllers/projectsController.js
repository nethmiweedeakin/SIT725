let Service = require("../services");

const getProjects = (res) => {
    console.log('Retrived controller project data')
    Service.ProjectService.getAllProjects(res)
}

const createProject = (data, res) => {
    console.log('Created controller project data')
    Service.ProjectService.insertProject(data,res)
}

module.exports = {
    getProjects, createProject
}