const Tour = require('./../models/tourModel');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
// );

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price!',
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'succes',
    // results: tours.length,
    // requestTime: req.requestTime,
    // data: {
    //   tours, // тъй като името на пропъртито съвпада с това на променливата не е необходимо да я посочваме
    // },
  });
};

exports.getTour = (req, res) => {
  //добавяме параметърът по този начин, после го достъпваме с req.params като обект напр. { id: '9' }
  console.log(req.params);

  const id = req.params.id * 1; // това е добър трик за превръщането на стринг в число

  // const tour = tours.find((el) => el.id === id);

  // res.status(200).json({
  //   status: 'succes',
  //   data: {
  //     tour, // тъй като името на пропъртито съвпада с това на променливата не е необходимо да я посочваме
  //   },
  // });
};

exports.createTour = (req, res) => {
  res.status(201).json({
    status: 'success',
    // data: {
    //   tour: newTour,
    // },
  });
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<updated tour here ...>',
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null, // we send null in order to show that the object no longer exist
  });
};