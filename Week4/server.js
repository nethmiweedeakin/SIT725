var express = require("express")
var app = express()
app.use(express.static(__dirname))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/myprojectDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    });
    mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB!');
    });

    const ProjectSchema = new mongoose.Schema({
        title: String,
        image: String,
        link: String,
        description: String,
        });
        const Project = mongoose.model('Project', ProjectSchema);

        app.get('/api/projects', async (req, res) => {
            const projects = await Project.find({});
            res.json({ statusCode: 200, data: projects, message: 'Success' });
            });

var port = process.env.port || 5500;
app.listen(port,()=>{
console.log("App listening to: "+port)
})

module.exports = { Project };
// Export the Project model for use in other files