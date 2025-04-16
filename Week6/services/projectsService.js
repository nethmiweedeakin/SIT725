
//USE api/projects to use projects functions from database
let client = require("../config/dbConnect");

let projectsCollection;
client.mongoClient.connect().then(() => {
    console.log('Database Connected');
    projectsCollection = client.mongoClient.db("myprojectDB").collection("projects");
}).catch((err) => {
    console.error("Error connecting to database:", err);
});

const getAllProjects = async (res) => {
    try {
        const result = await projectsCollection.find().toArray(); 
        console.log('All Projects Retrieved', result);
        res.json({
            statusCode: 200,
            data: result, // Sending the result as response
            message: 'Success'
        });
    } catch (err) {
        console.error("Error fetching projects:", err);
        res.status(500).send({ result: 'Error fetching projects' });
    }
}


const insertProject = async (project, res) => {
    try {
        const result = await projectsCollection.insertOne(project); 
        console.log('Project Inserted', result);
        res.send({ result: 200 });
    } catch (err) {
        console.error("Error inserting project:", err);
        res.status(500).send({ result: 'Error inserting project' });
    }
}



module.exports = {
    getAllProjects, insertProject
}