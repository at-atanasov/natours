const Tour = require('./../models/tourModel');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
// );

exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find(); // if we do not pass parameter it will return all the document from that collection

    console.log(tours);
    res.status(200).json({
      status: 'succes',
      results: tours.length,
      data: {
        tours, // тъй като името на пропъртито съвпада с това на променливата не е необходимо да я посочваме
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getTour = async (req, res) => {
  //добавяме параметърът по този начин, после го достъпваме с req.params като обект напр. { id: '9' }
  console.log(req.params);

  try {
    //const id = req.params.id * 1; // това е добър трик за превръщането на стринг в число
    const tour = await Tour.findById(req.params.id);
    // Tour.findOne({_id : req.params.is})
    res.status(200).json({
      status: 'succes',
      data: {
        tour, // тъй като името на пропъртито съвпада с това на променливата не е необходимо да я посочваме
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  // const tour = tours.find((el) => el.id === id);
};

exports.createTour = async (req, res) => {
  // const newTour = new Tour({});
  // newTour.save();
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent!',
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    // {new: true} показва, че искаме да върнем ъпдейтнатия документ. Детайли в документацията на mongoose.
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null, // we send null in order to show that the object no longer exist
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
