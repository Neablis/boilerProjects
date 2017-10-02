/* eslint no-console: 0 */
const path = require('path');
const express = require('express');
const app = express();

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 4001 : process.env.PORT;

app.use('/public', express.static(path.join(__dirname, 'public')));

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
