const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const session = require('express-session'); // session işlemleri için 
const passport = require('passport'); // google login için bu modülü dahil etmeliyiz.

const dotenv = require('dotenv'); // ortam değişkenlerini oluşturmak için dahil ettik
dotenv.config(); // burda ise kullandık.

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth'); // auth route dosyasını dahil ettik.
const chatRouter = require('./routes/chat') // chat route dosyasını dahil ettik.



const app = express();

// Helpers
const db = require('./helpers/db')(); 

// Middleware
const isAuthenticated = require('./middleware/isAuthenticated');

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

// express-session 
app.use(session({ 
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 14 * 24 * 3600000 }
}));

// passport.js
app.use(passport.initialize()); // google login için modülü bu şekilde kullanmalıyız.
app.use(passport.session()); // session'ı passport.js ile kullanabilmek için tanımladık.

app.use('/', indexRouter);
app.use('/auth', authRouter);  // auth route'ını kullandık.
app.use('/chat', isAuthenticated, chatRouter); // middleware'ı chat router'ında kullandık


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
