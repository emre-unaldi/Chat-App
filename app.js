const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const dotenv = require('dotenv'); // ortam değişkenlerini oluşturmak için dahil ettik
dotenv.config(); // burda ise kullandık.

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth'); // auth route dosyasını dahil ettik.



const app = express();

const db = require('./helpers/db')(); // veritabanı dahil edildi.

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Klasörlerimizi statik olarak servis edilmesi için nodejse tanıttık.
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));

app.use('/', indexRouter);
app.use('/auth', authRouter);  // auth route'ını kullandık.

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) =>{
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
