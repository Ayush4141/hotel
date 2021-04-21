const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const userRouter = require('./routes/userRoute');
const viewRouter = require('./routes/viewRoutes');
const hotelRouter = require('./routes/hotelRoutes');
const bookingRouter = require('./routes/bookingRoutes');

const app = express();

app.use(express.json());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(`${__dirname}/public`));

app.use(cookieParser());

//Routes
app.use('/', viewRouter);
app.use('/api/users', userRouter);
app.use('/api/hotels', hotelRouter);
app.use('/api/bookings', bookingRouter);

app.use(globalErrorHandler);

module.exports = app;
