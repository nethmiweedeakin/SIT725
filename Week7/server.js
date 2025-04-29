//Description: This is the main server file for a Node.js application that uses Express and Socket.io.
// It sets up a server that listens for incoming requests

const path = require('path');
var express = require("express")
var app = express()
app.use(express.static(__dirname))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const mongoose = require('mongoose');
let ProjectSchema = require("./schemas/cardSchema").ProjectSchema;

mongoose.connect('mongodb://localhost:27017/myprojectDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    });
    mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB! Available to Seed data...');
    });

    // Kitten Card Data Schenma
    const Project = require('./schemas/cardSchema');


let http = require('http').createServer(app);
let io = require('socket.io')(http);

// routes

let projectsRoute = require('./routes/projects')
var port = process.env.PORT || 8080;
app.use(express.json());
app.use(express.static(__dirname + '/public'));

// Serves the index.html file when the root URL is requested
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));  
});

app.use('/api/projects',projectsRoute)
//Get projects from database

// Test route to check if server is running
app.get("/test", function (request, response) {
var user_name = request.query.user_name;
response.end("Hello " + user_name + "!");
});

// Add Two Numbers API - Week 6 Testing
app.get('/addTwoNumbers/:firstNumber/:secondNumber', function(req,res,next){
var firstNumber = parseInt(req.params.firstNumber)
var secondNumber = parseInt(req.params.secondNumber)
var result = firstNumber + secondNumber || null
if(result == null) {
res.json({result: result, statusCode: 400}).status(400)
}
else { res.json({result: result, statusCode: 200}).status(200) }
})

// Add to projects database
app.post("/projects", (req, res) => {
    const newProject = req.body; // your card project JSON
    insertProject(newProject, res);
});

//socket test
io.on('connection', (socket) => {
console.log('a user connected');
socket.on('disconnect', () => {
console.log('user disconnected');
});

//Random number generator
setInterval(()=>{
socket.emit('number', parseInt(Math.random()*10));
}, 1000);
});

http.listen(port,()=>{
console.log("Listening on port ", port);
});



// Export the Project model for use in other files
module.exports = { Project };
