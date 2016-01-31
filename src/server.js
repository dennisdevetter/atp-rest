// starts the rest api
var api = require('./api').default;
var config = require('./config').default;
var dataStore = require('./database').default;
var express = require('express');

console.log('connecting to ' + config.database);

dataStore.configure(config.database).then(() => {
	console.log('database connection established, starting server...');
	var app = express();
	api.start({app, config});
}).catch((error) => {
	console.log('Error connecting to the database. ' + error);
	// todo.. send email ??
});
