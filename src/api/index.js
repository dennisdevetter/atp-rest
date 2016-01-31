import middleware from './middleware';
import controllers from './controllers';
import dataStore from '../database';

function startServer(options){
	let { app, config } = options;			
	let { api, secret, database } = config;
	let { port, name } = api;		
	
	// store the secret key in the app configuration.
	app.set('superSecret', secret);	

	// create global request pipeline middleware
	let requestPipes = middleware.createRequestPipeline({ app });	
	Object.keys(requestPipes).forEach((key) => {
		console.log(`applying request pipeline: ${key}`)
		var requestPipe = requestPipes[key];		
		app.use(requestPipe);
	});

	// create root http request pipeline	
	let endpoint = `http://localhost:${port}${name}`;
	app.get('/', middleware.createApiEndpoint(endpoint));

	// create the api controllers
	controllers.create({ app }).forEach((route) => {
		app.use(name, route);
	});;	

	// // configure connection to the database
	dataStore.configure(database);

	// // starts the server
	app.listen(port);
	console.log(`REST API has been started at ${endpoint}`);
}

export default {
	start : startServer
}




