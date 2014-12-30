var express = require('express');
var router = express.Router();
var passport = require('passport'),
  	SteamStrategy = require('./../node_modules/passport-steam/lib/passport-steam').Strategy;
var Steam = require('steam-webapi');
	Steam.key = process.env.API_KEY;

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
    // returnURL:'http://steamshuffle.herokuapp.com/auth/steam/return',
    // realm: 'http://steamshuffle.herokuapp.com',
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
	passport.authenticate('steam', { failureRedirect: '/'}),
	function(req, res) {
		res.redirect('/');
		console.log("STEAM IN");
  });

// GET /auth/steam/return
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/return',
	passport.authenticate('steam', { failureRedirect: '/' }),
	function(req, res) {
		Steam.ready(function(err) {
		    if (err) return console.log(err);
		    var steam = new Steam();
		    steam.key = process.env.API_KEY;
		    
		    var data = {
		        key: process.env.API_KEY,
		        steamid : req.user._json.steamid,
		        // include_appinfo : true,
		        // include_played_free_games :true,
		        include_appinfo : true,
		        include_played_free_games : true,
		        appids_filter : ""
		    };

		    steam.getOwnedGames(data, function (err, result) {
		    	req.session.games = !err ? result : null;
		    	console.log("Saving game in session.");
		    	res.redirect('/');
		    });
	});
  });

module.exports = router;
