var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	//console.log(req.session.games);
	console.log("INDEX");
	res.render('index', {result : JSON.stringify(req.session.games), user : req.user});
    //res.render('index', {result : JSON.stringify(req.session.games), user : req.user, rnd: rnd});

});

router.post('/shuffle', function(req, res){
	var rnd = getRnd(req.session.games);
	console.log("RND");
	console.log(rnd);
	res.render('shuffle', {result : JSON.stringify(req.session.games), user : req.user, rnd: rnd});
	//res.redirect('/shuffle');
	function getRnd(gamesData){
    	if (typeof(gamesData) == "undefined") return;
  		var total = gamesData.game_count,
    	selected = Math.floor( Math.random() * total );
    	return selected;
	};

});

// router.post('/shuffle', function(req, res){
// 	console.log("POST!");
// 	//res.redirect('/games');
// 	res.redirect('/');
// });

module.exports = router;