// Load the JSON file content
import { readFileSync } from 'fs';
const path = 'C:/Users/rteja/OneDrive/Desktop/6/MINIPROJECT/backend/output.json';  // Path to your JSON file
const data = JSON.parse(readFileSync(path, 'utf8'));

// Select your database
use('4A');

// Insert data into your collection
db.yourCollectionName.insertMany(data);
