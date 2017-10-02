module.exports = function(app, passport) {
  require('./auth.js')(app, passport);
  require('./application.js')(app, passport);
  require('./places.js')(app, passport);
  require('./trip.js')(app, passport);
}
