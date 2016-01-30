import express from 'express';
import { createRequestPipeline, createApiEndpoint } from './middleware';
import { createControllers } from './controllers';
import { configureDatabase } from '../database';

function startServer(options){	
	let { api, secret, database } = options;
	let { port, name } = api;		
	
	var app = express();

	// store the secret key in the app configuration.
	app.set('superSecret', secret);

	// create global request pipeline middleware
	let requestPipes = createRequestPipeline({ app });
	Object.keys(requestPipes).forEach((key) => {
		console.log(`applying request pipeline: ${key}`)
		var requestPipe = requestPipes[key];		
		app.use(requestPipe);
	});

	// create root http request pipeline	
	let endpoint = `http://localhost:${port}${name}`;
	app.get('/', createApiEndpoint(endpoint));

	// create the api controllers
	let controllers  = createControllers({ app });	
	controllers.forEach((controller) => {
		app.use(name, controller);
	});

	// configure connection to the database
	configureDatabase(database);

	// starts the server
	app.listen(port);
	console.log(`REST API has been started at ${endpoint}`);
}

export default {
	start : startServer
}




