//imports required for express server
var createError = require('http-errors');
var path = require('path');

//imports required for express ever and user authentication
var express = require('express')
  , http = require('http')
  , passport = require('passport')
  , util = require('util')

//middleware 
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');



var favicon = require('serve-favicon');
const helmet = require('helmet');


//file locations for various routes
var index = require('./routes/index');
var users = require('./routes/users');
var account = require('./routes/account');



var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true//,
  //cookie: { secure: true }
}))

// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));


//routes 
app.use('/', index);
app.use('/users', users);
app.use('/account', account);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(process.env.PORT || 3000, () => console.log('Example app listening on port 3000!'));

module.exports = app;
