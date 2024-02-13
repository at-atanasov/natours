const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
const app = require('./app');

mongoose
  .connect(DB, {
    //default options. Good to use for my project
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('DB connection successfull');
  });

//console.log(process.env);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App runing on port ${port}...`);
});
