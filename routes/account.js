var express = require('express');
var router = express.Router();


router.get('/', function(req, res){
	console.log(res.locals.titles);
	res.render('account', { result : JSON.stringify(req.session.games), user: req.user });
});



module.exports = router;