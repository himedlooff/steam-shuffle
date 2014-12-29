var express = require('express');
var Steam = require('steam-webapi');
var router = express.Router();

/* GET users games. */
router.get('/', ensureAuthenticated, function(req, res){


	    function renderGames (err, gamesData) {
	    	if(err) return console.error(err);
	    	getRnd(gamesData);
	    	res.render('games', { result : JSON.stringify(gamesData), user: req.user, rnd: req.session.rnd});
	    }


	    if(req.session.games) {
	    	req.session.rnd = getRnd(req.session.games);
	    	renderGames(null, req.session.games);
	    	return;
	    }

	    function getRnd(gamesData){
	  		var total = gamesData.game_count,
        	selected = Math.floor( Math.random() * total );
        	return selected;
		}

});


function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) { return next(); }
	res.redirect('/auth/steam')
}

module.exports = router;