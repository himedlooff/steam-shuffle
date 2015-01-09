'use strict';

var express = require('express'),
    passport = require('passport');


var site = require('./routes/index'),
    games = require('./routes/games'),
    auth = require('./routes/auth');


var app = express();

var config = require('./config');
    config(app);

// Routes
app.get('/', site.home);
app.get('/about', site.about);
app.get('/auth/steam', passport.authenticate('steam'), auth.steam);
app.get('/auth/steam/return', passport.authenticate('steam'), auth.return)
app.get('/login', auth.login);
app.get('/logout', auth.logout);
app.get('/account', ensureAuthenticated, auth.account);
app.get('/games', ensureAuthenticated, games.show);
app.get('/shuffle', ensureAuthenticated, games.shuffle);
app.post('/shuffle', ensureAuthenticated, games.shuffle);


// Middleware
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { 
        return next(); 
    }
    res.redirect('/login');
}

// Error handlers

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    //TODO pretty 404 error page
    var err = new Error('Not Found');
    err.status = 404;
   next(err);
});



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
    //TODO: Render pretty error page
    res.render('error', {
        message: "Something went wrong",
        error: {}
    });
});


// Server

var server = app.listen(app.locals.port, function() {
  console.log('Express server listening on port ' + server.address().port);
});

module.exports = app;