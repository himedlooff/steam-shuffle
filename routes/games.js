var express = require('express');
var Steam = require('steam-webapi');
var router = express.Router();

/* GET users games. */
router.get('/', ensureAuthenticated, function(req, res){


	    function renderGames (err, gamesData) {
	    	if(err) return console.error(err);
	    	addStringTime(gamesData);
	    	res.render('games', { result : JSON.stringify(gamesData), user: req.user});
	    }


	    if(req.session.games) {
	    	renderGames(null, req.session.games);
	    	return;
	    }
});

function stringTime(minutes){
	var time ="";
	var d =  Math.floor (minutes / 1440);
	var h = Math.floor ((minutes - d * 1440) / 60);
	var m = minutes - (d * 1440) - (h * 60);

	h = h? String(h) + " hours " : "";
	d = d? String(d) + " days " : "";
	m = m ? String(m) + " minutes" : "";

	return d + h +  m ;
}

function addStringTime(result){
	var result_array = result.games;
	var result_length = result_array.length;

	for(var i=0 ; i< result_length; i++){
		result_array[i].sum_2weeks = stringTime(result_array[i].playtime_2weeks);
	    result_array[i].sum_forever = stringTime(result_array[i].playtime_forever);
	}
}


function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) { return next(); }
	res.redirect('/auth/steam')
}

module.exports = router;