var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
	var rnd = getRnd(req.session.games);
	res.render('shuffle', {result : JSON.stringify(req.session.games), user : req.user, rnd: rnd});
	//res.redirect('/shuffle');
	function getRnd(gamesData){
    	if (typeof(gamesData) == "undefined") return;
  		var total = gamesData.game_count,
    	selected = Math.floor( Math.random() * total );
    	return selected;
	};
});


router.post('/', function(req, res){
	var rnd = getRnd(req.session.games);
	res.render('shuffle', {result : JSON.stringify(req.session.games), user : req.user, rnd: rnd});
	//res.redirect('/shuffle');
	function getRnd(gamesData){
    	if (typeof(gamesData) == "undefined") return;
  		var total = gamesData.game_count,
    	selected = Math.floor( Math.random() * total );
    	return selected;
	};
});

module.exports = router;