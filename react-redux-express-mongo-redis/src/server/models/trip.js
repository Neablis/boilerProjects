// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define the schema for our user model
var Place = mongoose.Schema({
  location: {
    lat: {type: Number, required: true},
    lng: {type: Number, required: true}
  },
  placeId: {type: String, required: true},
  formatted_address: {type: String, required: true},
  name: {type: String, required: true},
  url: {type: String, required: true},
  owner: {type: Schema.Types.ObjectId, ref: 'Trip'},
}, {
  timestamps: true
});

// define the schema for our user model
var Trip = mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  places: [{ type: Schema.Types.ObjectId, ref: 'Place' }]
}, {
  timestamps: true
});

module.exports.Trip = mongoose.model('Trip', Trip);
module.exports.Place = mongoose.model('Place', Place);
