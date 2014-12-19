'use strict';

var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    exsession = require('express-session'),
    passport = require('passport');



var routes = require('./routes/index'),
    games = require('./routes/games'),
    login = require('./routes/login'),
    logout = require('./routes/logout'),
    auth = require('./routes/auth'),
    about = require('./routes/about'),
    account = require('./routes/account');

var app = express();

//var router = express.Router();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(exsession({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false, maxAge: null }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/games', games);
app.use('/login', login);
app.use('/logout', logout);
app.use('/auth/steam', auth);
app.use('/account', account);
app.use('/about', about);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;