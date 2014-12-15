var express = require('express');
var router = express.Router();
var passport = require('passport'),
  	SteamStrategy = require('./../node_modules/passport-steam/lib/passport-steam').Strategy;


// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Steam profile is serialized
//   and deserialized.

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(obj, done) {
	done(null, obj);
});


passport.use(new SteamStrategy({
    //returnURL:'http://steamshuffle.herokuapp.com/auth/steam/return',
    //realm: 'http://steamshuffle.herokuapp.com',
    returnURL:'http://localhost:3000/auth/steam/return',
    realm: 'http://localhost:3000',

    apiKey: process.env.API_KEY
    },
    function(identifier, profile, done){
        process.nextTick(function(){
            profile.identifier = identifier;
            return done(null, profile);
        });
    }
    ));

// GET /auth/steam
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Steam authentication will involve redirecting
//   the user to steam.com.  After authenticating, Steam will redirect the
//   user back to this application at /auth/steam/return
router.get('/',
	passport.authenticate('steam', { failureRedirect: '/auth/steam' }),
	function(req, res) {
		res.redirect('/');
  });

// GET /auth/steam/return
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/return',
	passport.authenticate('steam', { failureRedirect: '/auth/steam' }),
	function(req, res) {
		res.redirect('/');
  });

module.exports = router;
