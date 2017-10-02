const express  = require('express');
const router = express.Router();
const Trip = require('../models/trip');

module.exports = function(app, passport) {

  // middleware to use for all requests
  router.use(function(req, res, next) {
    //if (req.isAuthenticated())
  		return next();

  //  res.status(400).send('Access Denied!')
  });

  router.route('/places')
    .post(function(req, res) {
      var place = new Trip.Place();
      place.formatted_address = "180 Capp St, San Francisco, CA 94110, USA"
      place.location = {
        lat: 37.7638686,
        lng: -122.41908810000001
      }
      place.name = "180 Capp St";
      place.placeId = "ChIJo9xXXSN-j4ARA-pn1ogkYYI"
      place.url = "https://maps.google.com/?q=180+Capp+St,+San+Francisco,+CA+94110,+USA&ftid=0x808f7e235d57dca3:0x82612488d667ea03"


      place.save(function(err) {
        if (err)
          res.send(err);

        res.json({ message: 'Bear created!' });
      });
    }).get(function(req, res) {
      Trip.Place.find(function(err, place) {
        if (err)
          res.send(err);

        res.json(place);
      });
    });

    router.route('/places/:id')
      .post(function(req, res) {

      }).get(function(req, res) {
        Trip.Place.findById(req.params.id, function(err, place) {
          if (err)
            res.send(err);

          res.json(place);
        });
      }).put(function(req, res) {

        Trip.Place.findById(req.params.id, function(err, place) {
          if (err)
            res.send(err);

          place.name = req.body.name;  // update the bears info

          // save the bear
          place.save(function(err) {
            if (err)
              res.send(err);

            res.json({ message: 'Trip updated!' });
          });
        });
      }).delete(function(req, res) {
        Trip.Place.remove({
          _id: req.params.id
        }, function(err, place) {
          if (err)
            res.send(err);

          res.json({ message: 'Successfully deleted' });
        });
    });

    app.use('/api', router);
};
