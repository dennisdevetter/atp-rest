import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import config from './config';

import { configureRoutes } from './routes';
import { configureDatabase } from './database';

// initialize the express server
var app = express();
var port = process.env.PORT || 8080; // used to create, sign, and verify tokens

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));	

// basic route
app.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});

// add configuration
app.set('superSecret', config.secret); 

// set up database
configureDatabase(config.database);

// configure the api routes
configureRoutes(app);

// =======================
// start the server ======
// =======================
app.listen(port);
console.log('REST API has been started at http://localhost:' + port);
