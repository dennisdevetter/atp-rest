// starts the rest api
var api = require('./api').default;
var config = require('./config').default;
var express = require('express');

var app = express();
api.start({app, config});


