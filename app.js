const fs = require('fs');
const express = require('express');

const app = express();

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.use(express.json()); //middleware(can modify the incoming request data). Parses to JSON.

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'succes',
    results: tours.length,
    data: {
      tours, // тъй като името на пропъртито съвпада с това на променливата не е необходимо да я посочваме
    },
  });
};

const getTour = (req, res) => {
  //добавяме параметърът по този начин, после го достъпваме с req.params като обект напр. { id: '9' }
  console.log(req.params);

  const id = req.params.id * 1; // това е добър трик за превръщането на стринг в число

  const tour = tours.find((el) => el.id === id);
  // if (id > tours.length) {
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'succes',
    data: {
      tour, // тъй като името на пропъртито съвпада с това на променливата не е необходимо да я посочваме
    },
  });
};

const createTour = (req, res) => {
  //   console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body); //creating a new object by merging two existing objects

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<updated tour here ...>',
    },
  });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(204).json({
    status: 'success',
    data: null, // we send null in order to show that the object no longer exist
  });
};

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

app.route('/api/v1/tours').get(getAllTours).post(createTour);
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

const port = 3000;
app.listen(port, () => {
  console.log(`App runing on port ${port}...`);
});
