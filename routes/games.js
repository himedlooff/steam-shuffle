var express = require('express');
var Steam = require('steam-webapi');
	Steam.key = process.env.API_KEY;
var router = express.Router();

/* GET users games. */
router.get('/', ensureAuthenticated, function(req, res){
	Steam.ready( function(err) {
	    if (err) return console.log(err);
	    var steam = new Steam();
	    steam.key = process.env.API_KEY;
	    
	    function renderGames (err, gamesData) {
	    	if(err) return console.error(err);
	    	res.render('games', { result : JSON.stringify(gamesData), user: req.user});
	    }

	    if(req.session.games) {
	    	renderGames(null, req.session.games);
	    	return;
	    }

	    var data = {
	        key: process.env.API_KEY,
	        steamid : req.user._json.steamid,
	        include_appinfo : true,
	        include_played_free_games :true,
	        appids_filter : ""
	    };

	    steam.getOwnedGames(data, function (err, result) {
	    	req.session.games = !err ? result : null;
	    	renderGames(err, result);
	    });
	});
});


function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) { 
		return next(); 
	}
	res.redirect('/auth/steam');
}

module.exports = router;