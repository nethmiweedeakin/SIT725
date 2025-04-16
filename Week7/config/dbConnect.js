const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb://localhost:27017";
const mongoClient = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let db;

mongoClient.connect((err, client) => {
  if (!err) {
    console.log('Database Connected');
    db = client.db("myprojectDB");
  } else {
    console.log(' [error]', err);
  }
});

// Export what you need
module.exports = {
  mongoClient,
  getDB: () => {
    if (!db) {
      throw new Error("DB not connected yet!");
    }
    return db;
  }
};
