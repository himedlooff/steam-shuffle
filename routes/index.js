var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	//console.log(req.session.games);
	res.render('index', {result : JSON.stringify(req.session.games), user : req.user});

});

module.exports = router;