const mongoose = require('mongoose');

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

module.exports = Tour;
