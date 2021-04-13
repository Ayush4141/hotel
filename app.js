const express = require('express');
const path = require('path');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const userRouter = require('./routes/userRoute');
const viewRouter = require('./routes/viewRoutes');

const app = express();

app.use(express.json());


app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname,'public')));
//app.use(express.static(`${__dirname}/public`));

//Routes
app.use('/', viewRouter);
app.use('/api/users', userRouter);

app.use(globalErrorHandler);

module.exports = app;
