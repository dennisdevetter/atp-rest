// only ES5 is allowed in this file
require('babel-core/register');
require("babel-polyfill");

// load your app
var app = require('./app.js');