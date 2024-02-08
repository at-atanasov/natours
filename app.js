const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//1 Middlewares
app.use(morgan('dev'));
app.use(express.json()); //middleware(can modify the incoming request data). Parses to JSON.

app.use(express.static(`${__dirname}/public`)); //serving static files from folder

app.use((req, res, next) => {
  console.log('Hello from the middleware!!! 💀');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.requestTime);
  next();
});

//2 Route handlers

//3 Routes

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//4 Start server
module.exports = app;
