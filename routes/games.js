var Steam = require('steam-webapi');

exports.show = function(req, res){
	console.log(res.locals.steamGames.game_count);
	
	function renderGames (err, gamesJSON) {
    	if(err) return console.error(err);
    	//favGame(req.session.games);
    	res.render('games', { lib : gamesJSON});
    }

    if(res.locals.steamGames || res.locals.steamGames.game_count != 0) {
    	renderGames(null, JSON.stringify(res.locals.steamGames.games));
    	return;
    }
};


exports.shuffle = function(req, res){
	function renderShuffle(err, shuffle){
		if (err) return console.log(err);
			res.render('shuffle', {random: shuffle});
		};		

		if (res.locals.steamGames){	
			var selected = (res.locals.steamGames.game_count !=0) ? Math.floor( Math.random() * res.locals.steamGames.game_count ) : -1;
			renderShuffle(null, selected);
			console.log(selected);
			return;
		};
	};