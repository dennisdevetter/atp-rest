import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import config from './config'; // get our config file
import { getAllRoutes, addRoutesToRouter } from './routes';
import { applyMiddleware } from './middleware';

// initialize the express server
var app = express();

// =======================
// configuration =========
// =======================
var port = process.env.PORT || 8080; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));	

// basic route
app.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});

let allowedMethods = ['GET','POST', 'PUT', 'DELETE'];

// API ROUTES -------------------

// get an instance of the router for api routes
var apiRouter = express.Router(); 

// apply middleware for the routes
applyMiddleware(apiRouter, app);

// initialize the routes ontothe router
var routes = getAllRoutes();
addRoutesToRouter(routes, apiRouter);

// apply the routes to our application with the prefix /api
app.use('/api', apiRouter);

// =======================
// start the server ======
// =======================
app.listen(port);
console.log('REST API has been started at http://localhost:' + port);
