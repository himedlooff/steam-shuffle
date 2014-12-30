var express = require('express');
var router = express.Router();


router.get('/', ensureAuthenticated, function(req, res){
	res.render('account', {  result : JSON.stringify(req.session.games), user: req.user });
});

function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) { return next(); }
	res.redirect('/auth/steam')
}

module.exports = router;