const mongoose = require('mongoose');

//Project Schema
    const ProjectSchema = new mongoose.Schema({
        title: String,
        image: String,
        link: String,
        description: String,
        });
   

// Export the model directly
module.exports = mongoose.model('Project', ProjectSchema);