var express = require('express');
var Steam = require('steam-webapi');
var router = express.Router();

/* GET users games. */
router.get('/', ensureAuthenticated, function(req, res){
	Steam.ready(process.env.API_KEY, function(err) {
	    if (err) return console.log(err);
	    var steam = new Steam();
	    steam.key = process.env.API_KEY;
	    
	    var data = {
	        key: process.env.API_KEY,
	        steamid : req.user._json.steamid,
	        include_appinfo : true,
	        include_played_free_games :false,
	        appids_filter : ""
	    };
	    steam.getOwnedGames(data, function(err, data){
	        res.render('games', {result : JSON.stringify(data), user: req.user});
	    });
	 });



  // res.render('games', { user: req.user });
});


function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) { return next(); }
	res.redirect('/login')
}

module.exports = router;
