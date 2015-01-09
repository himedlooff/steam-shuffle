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



// GET /auth/steam
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Steam authentication will involve redirecting
//   the user to steam.com.  After authenticating, Steam will redirect the
//   user back to this application at /auth/steam/return
exports.steam = function(req, res){
	//function(req, res) {
		res.redirect('/');
	//}
};



// GET /auth/steam/return
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.

exports.return = function(req, res){
	 	Steam.ready(function(err) {
	 	    if (err) return console.log(err);
	 	    var steam = new Steam();
	 	    steam.key = process.env.API_KEY;
		    
	 	    var data = {
	 	        key: process.env.API_KEY,
	 	        steamid : req.user._json.steamid,
		        include_appinfo : true,
		        include_played_free_games : true,
		        appids_filter : ""
		    };

		    steam.getOwnedGames(data, 
		    	function (err, result) {
			    	req.session.steamGames = !err ? result : null;
			    	console.log("Saving game in session.");
			    	req.session.favGame = favGame(result);
			    	res.redirect("/");
			});
		});

};

exports.login = function(req, res){
	res.redirect('/auth/steam');
	//	res.render('login');
};

exports.logout = function(req, res){
	req.session.destroy(function(err) {
	  		if (err) return console.log(err);
		});
	req.logout();
	res.redirect('/');
};

exports.account = function(req, res){
	res.render('account');
};


function favGame(lib){
	if(!lib || lib.game_count === 0) return null;
    var max_time = 0, max_i = 0, i = 0, len = lib.game_count;
    for (; i != len; ++i) {
        if (lib.games[i].playtime_forever > max_time) {
            max_time = lib.games[i].playtime_forever;
            max_i = i;
        }
    }
    console.log("Your favourite game is " + lib.games[max_i].name);
    return max_i;
}