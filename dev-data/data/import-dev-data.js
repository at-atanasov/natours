const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    //default options. Good to use for my project
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('DB connection successfull');
  });

//READ JSON FILE

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'),
);

//IMPORT DATA INTO DATABASE

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }

  process.exit(); // this stops the process
};

//DELETE DATA FROM DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit(); // this stops the process
};

console.log(process.argv);
/*
PS D:\PRSNL\Programming\Kursove\complete-node-bootcamp-master\complete-node-bootcamp-master\4-natours\starter> node ./dev-data/data/import-dev-data.js
[
  'C:\\Program Files\\nodejs\\node.exe',
  'D:\\PRSNL\\Programming\\Kursove\\complete-node-bootcamp-master\\complete-node-bootcamp-master\\4-natours\\starter\\dev-data\\data\\import-dev-data.js'
]
*/

/*
PS D:\PRSNL\Programming\Kursove\complete-node-bootcamp-master\complete-node-bootcamp-master\4-natours\starter> node ./dev-data/data/import-dev-data.js --import           
[
  'C:\\Program Files\\nodejs\\node.exe',
  'D:\\PRSNL\\Programming\\Kursove\\complete-node-bootcamp-master\\complete-node-bootcamp-master\\4-natours\\starter\\dev-data\\data\\import-dev-data.js',
  '--import'
]


При стартиране на файла можем да подаваме още аргументи, които после да достъпим от process.argv
*/

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
