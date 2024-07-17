import csv from 'csvtojson';
import { writeFileSync } from 'fs';

const csvFilePath = "C:/Users/rteja/OneDrive/Desktop/6/MINIPROJECT/4adets.csv";

csv()
  .fromFile(csvFilePath)
  .then((jsonObj) => {
    writeFileSync('A6Details.json', JSON.stringify(jsonObj, null, 2));
    console.log('CSV file successfully converted to JSON.');
  })
  .catch((err) => {
    console.error('Error converting CSV to JSON:', err);
  });
