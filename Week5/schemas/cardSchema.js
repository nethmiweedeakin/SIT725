//Description: This file defines the schema for the Project model using Mongoose. It specifies the structure of the data that will be stored in the MongoDB database, including the fields and their types.

const mongoose = require('mongoose');

//Project Schema for cards
    const ProjectSchema = new mongoose.Schema({
        title: String,
        image: String,
        link: String,
        description: String,
        });
   

// Export the model 
module.exports = mongoose.model('Project', ProjectSchema);