var express = require('express');
var Steam = require('steam-webapi');
var router = express.Router();

/* GET users games. */
router.get('/' , function(req, res){
	    
	    function renderGames (err, gamesData) {
	    	if(err) return console.error(err);
	    	favGame(req.session.games);
	    	res.render('games', { result : JSON.stringify(gamesData), user: req.user});
	    }

	    if(req.session.games) {
	    	renderGames(null, req.session.games);
	    	return;
	    }

	 //    function getRnd(gamesData){
	 //  		var total = gamesData.game_count,
  //       	selected = Math.floor( Math.random() * total );
  //       	return selected;
		// }
});


function favGame(lib){
    var max_time = 0, max_i = 0, i = 0, len = lib.games.length;
    for (; i != len; ++i) {
        if (lib.games[i].playtime_forever > max_time) {
            max_time = lib.games[i].playtime_forever;
            max_i = i;
        }
    }
    console.log("Your favourite game is " + lib.games[max_i].name);
    return max_i;
}


module.exports = router;