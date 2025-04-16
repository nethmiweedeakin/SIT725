const mongoose = require("mongoose");
const { Project } = require("../server");

// Prevent multiple connections
if (mongoose.connection.readyState === 0) {
    mongoose.connect("mongodb://localhost:27017/myprojectDB");
}

mongoose.connection.once("open", async () => {
    console.log("Connected to MongoDB! Getting data...");

    const seedProjects = [
        { title: "Kitten 4", image: "images/kitten-4.jpg", link: "About Kitten 4", description: "Demo kitten 4" },
    ];

    try {
        await Project.deleteMany({}); // Clear old data
        console.log("Old projects deleted!");
        
        await Project.insertMany(seedProjects); // Insert new data
        console.log("Seed data inserted successfully!");
    } catch (error) {
        console.error("Error inserting seed data:", error);
    } finally {
        mongoose.disconnect(); // Close connection after seeding
        console.log("Database connection closed.");
    }
});