'use strict';

var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  host = process.env.HOST || '0.0.0.0';

app.use(express.static('public'));

var routes = require("./api/routes");
routes(app);

/**
 * In preview/container environments, the entrypoint may be wrapped or required,
 * which can cause `module.parent` checks to incorrectly skip binding the port.
 * Always start listening when this file is executed as the service entrypoint.
 */
var server = app.listen(port, host, function () {
  console.log("Server running on http://" + host + ":" + port);
});

server.on('error', function (err) {
  // If binding fails, surface the error clearly so preview can diagnose.
  console.error('Failed to start server:', err && err.stack ? err.stack : err);
  process.exitCode = 1;
});

module.exports = app;
module.exports.server = server;
