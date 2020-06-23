const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose')
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds045475.mlab.com:45475/hacktiv_overflow`,function(err){
  if(err) {
    console.log(err);
  }else{
    console.log("db connected");
  }
  
});

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let answersRouter = require('./routes/answers')
let questionsRouter = require('./routes/questions')

let app = express();

app.use(cors())
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter)
app.use('/users', usersRouter);
app.use('/answers', answersRouter)
app.use('/questions', questionsRouter)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
