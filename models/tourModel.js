const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'], //the second is error string in case there is no value vor this property
      unique: true,
      trim: true,
    },
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration!'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size!'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have difficulty!'],
    },
    ratingsAverage: {
      type: Number,
      default: 4.5, // default value
    },
    ratingsQuantity: {
      type: Number,
      default: 0, // default value
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    priceDiscount: Number,
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a description!'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image!'],
    },
    images: [String], //Thats how we define a array of string
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false, //така крием полето и то не се връща при селекция. Полезно е като не искаме потребителите а виждат някаква информация.
    },
    startDates: [Date],
  },
  {
    toJSON: { virtuals: true }, //така маркираме, че искаме виртуалните пропъртита да се виждат при JSON и Обект
    toObject: { virtuals: true },
  },
);

tourSchema.virtual('durationWeeks').get(function () {
  //виртуалните пропъртита не се пазят в базата данни. В случая се създава при гет метод след пресмятане върху поле duration.
  return this.duration / 7;
});

const Tour = mongoose.model('Tour', tourSchema); //Creating new model based on tourSchema. Model names begin with capital letter(convention).

module.exports = Tour;
