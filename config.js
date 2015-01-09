module.exports= function(app){
	/***		LOCALS		***/
	
	
	app.locals.title = "Steam Shuffle";
	app.locals.author = "Anna Czerwiec";
	
	app.locals.env =  process.env.NODE_ENV || "development";
	app.locals.secret = process.env.COOKIE_SECRET;
	app.locals.port=  process.env.PORT || 3000;
	app.locals.api_key = process.env.API_KEY;
	app.locals.hostnames = ["localhost", "steamshuffle.com" , "steam-shuffle.com", "steamshuffle.herokuapp.com"];

	/***		MODULES			***/

	var express = require('express'),
		path = require('path'),
	    favicon = require('serve-favicon'),
	    logger = require('morgan'),
	    cookieParser = require('cookie-parser'),
	   // bodyParser = require('body-parser'),
	    exsession = require('express-session'),
	    passport = require('passport');


	// Steam authorisation OpenID via Passport module
	var passport = require('passport'),
	  	SteamStrategy = require('./node_modules/passport-steam/lib/passport-steam').Strategy;

	var Steam = require('steam-webapi');
		Steam.key = app.locals.api_key;


	/***		MIDDLEWARE			***/
	app.use(favicon(__dirname + '/public/images/favicon.ico'));
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'jade');
	app.use(logger('dev'));
	app.use(express.static(path.join(__dirname, 'public')));
	app.use(cookieParser());

	//app.use(bodyParser.json());
	//app.use(bodyParser.urlencoded({ extended: false }));
	
	
	/***		SESSION SETTINGS	***/
	app.use(
		exsession({
	    secret: app.locals.secret,
	    resave: false,
	    saveUninitialized: true,
	    cookie: {
	        secure: false, 
	        maxAge:1000*60*60 
	    }
	}));

	/***		PASSPOST SETTINGS		***/
	passport.serializeUser(function(user, done) {
		done(null, user);
	});

	passport.deserializeUser(function(obj, done) {
		done(null, obj);
	});

	app.use(passport.initialize());
	app.use(passport.session());

	app.use(function(req,res,next){

		var OpenIDurl, OpenIDrealm;
		if (app.locals.hostnames.indexOf(req.hostname) > -1) {
			  	OpenIDurl = 'http://' + req.hostname + '/auth/steam/return';
			    OpenIDrealm = 'http://' + req.hostname;
	  	}
	  	else {
		   		 OpenIDurl = 'http://localhost:3000/auth/steam/return';
			   	 OpenIDrealm =  'http://localhost:3000/auth/';
		}
		passport.use(new SteamStrategy({
			  	returnURL: OpenIDurl,
			    realm: OpenIDrealm,	
		    apiKey: app.locals.api_key
		    },
		    function(identifier, profile, done){
		        process.nextTick(function(){
		            profile.identifier = identifier;
		            return done(null, profile);
		        });
		    }
		));
		next();
	});


	/***		MIDDLEWARE LOCALS HELPER	***/
	app.use(function(req, res, next){
	    if (req.session.steamGames) {
	        res.locals.steamGames = req.session.steamGames;
	        }
	    
	    if (req.session.passport.user) {
	        res.locals.user_json = req.session.passport.user._json;
	        res.locals.user_loc = req.user;
		}
  	  next();
	 });
 }