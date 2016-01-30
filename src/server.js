// starts the rest api
var app = require('./app').default;
var config = require('./config').default;

app.start(config);


