module.exports = function(app, passport) {

  // normal routes ===============================================================
  // show the home page (will also have our login links)
  app.get('/', function(req, res) {
    res.render('pages/index.ejs');
  });

  // PROFILE SECTION =========================
  app.get('/profile', isLoggedIn, function(req, res) {
    res.render('pages/profile.ejs', {
      user : req.user
    });
  });

  // APP SECTION =========================
  app.get('/app', isLoggedIn, function(req, res) {
    res.render('pages/app.ejs', {
      user : req.user
    });
  });
};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/');
}
