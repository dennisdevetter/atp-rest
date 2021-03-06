import { createRequestPipeline, createApiEndpoint } from './middleware'
import { createControllers } from './controllers'

function startServer(options = {}){
	let { app, config } = options			
	let { api, secret, database } = config
	let { port, name } = api		
	
	// store the secret key in the app configuration.
	app.set('superSecret', secret)	

	// create global request pipeline middleware
	let requestPipes = createRequestPipeline({ app })	
	Object.keys(requestPipes).forEach((key) => {
		var requestPipe = requestPipes[key]		
		app.use(requestPipe)
	})

	// create root http request pipeline	
	let endpoint = `http://localhost:${port}${name}`
	app.get('/', createApiEndpoint(endpoint))

	// create the api controllers
	createControllers({ app }).forEach((route) => {
		app.use(name, route)
	})	

	// // starts the server
	app.listen(port)	
}

export default {
	start : startServer
}




