const express  = require('express');
const app      = express();
const port     = process.env.PORT || 4001;
const mongoose = require('mongoose');
const passport = require('passport');
const flash    = require('connect-flash');
const path   = require('path');

const morgan       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const session      = require('express-session');
const RedisStore = require('connect-redis')(session)

const config = require('./config/database.js');

const mongoUri = process.env.MONGODB_URI || config.mongo;
const redisUri = process.env.REDIS_URL || config.redis;

// configuration ===============================================================
mongoose.Promise = Promise;
mongoose.connect(mongoUri, {useMongoClient: true});

app.use('/public', express.static(path.join(__dirname, '..', '/client/public')));

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({
  store: new RedisStore({
    url: redisUri
  }),
  secret: 'placesSecretCookiePass',
  name: 'places-cookie',
  resave: true,
  saveUninitialized: true
})); // session secret

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./routes/index')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
