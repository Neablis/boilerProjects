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

  router.route('/trips')
    .post(function(req, res) {
      trip.save(function(err) {
        if (err)
          res.send(err);

        res.json({ message: 'Bear created!' });
      });
    }).get(function(req, res) {
      Trip.Place.find(function(err, trip) {
        if (err)
          res.send(err);

        res.json(trip);
      });
    });

    router.route('/trips/:id')
      .post(function(req, res) {

      }).get(function(req, res) {
        Trip.Place.findById(req.params.id, function(err, trip) {
          if (err)
            res.send(err);

          res.json(trip);
        });
      }).put(function(req, res) {

        Trip.Place.findById(req.params.id, function(err, trip) {
          if (err)
            res.send(err);

          trip.name = req.body.name;  // update the bears info

          // save the bear
          trip.save(function(err) {
            if (err)
              res.send(err);

            res.json({ message: 'Trip updated!' });
          });
        });
      }).delete(function(req, res) {
        Trip.Place.remove({
          _id: req.params.id
        }, function(err, bear) {
          if (err)
            res.send(err);

          res.json({ message: 'Successfully deleted' });
        });
    });

    app.use('/api', router);
};
