// Load the JSON file content
const fs = require('fs');
const path = 'C:/Users/rteja/OneDrive/Desktop/6/MINIPROJECT/backend/output.json';  // Path to your JSON file
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

// Select your database
use('4Adetails');

// Insert data into your collection
db.yourCollectionName.insertMany(data);
