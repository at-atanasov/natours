const Tour = require('./../models/tourModel');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
// );

exports.getAllTours = async (req, res) => {
  try {
    console.log(req.query);

    const queryObj = { ...req.query }; // деструктурираме рикуеста и създаваме нов обект с полетата му
    const excludedFields = ['page', 'sort', 'limit', 'fields']; // създаваме масив с полетата, които искаме да избегнем
    excludedFields.forEach((el) => delete queryObj[el]); // с форийч обикаляме полетата и ги изтриваме от обекта ако ги има

    //BUILD QUERY
    const query = Tour.find(queryObj);
    console.log(queryObj);
    //const tours = await Tour.find(req.query); // по този начин търсим с query параметри които подава в заявката

    // const tours = await Tour.find(); // if we do not pass parameter it will return all the document from that collection

    // const tours = await Tour.find({ // One way of writing query
    //   duration: 5,
    //   difficulty: 'easy,
    // });

    // const tours = await Tour.find()
    //   .where('duration')
    //   .equals(5)
    //   .where('difficulty')
    //   .equals('easy'); //another way ot writing query by chaining mongoose methods.

    //EXECUTE QUERY
    const tours = await query;

    //SEND RESPONSE
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
