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

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'], //the second is error string in case there is no value vor this property
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5, // default value
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

const Tour = mongoose.model('Tour', tourSchema); //Creating new model based on tourSchema. Model names begin with capital letter(convention).

//console.log(process.env);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App runing on port ${port}...`);
});
