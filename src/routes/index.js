import express from 'express';
import RouteTable from './route-table';
import createRoutes from './routes';
import createMiddleware from './middleware';

function attachRoutesToRouter(router, routeTable){
  let routes = routeTable.routes;

  for(let index in routes) {    
    let { method, endpoint, handler, isPublic } = routes[index];            
    let methodLowerCased = method.toLowerCase().trim();
    let securedRoute = isPublic ? 'public' : 'secure';

    if (router[methodLowerCased]) {     
      router[methodLowerCased](endpoint, handler);      
      console.log(`initialized ${securedRoute} route ${method} ${endpoint}`);
    }       
  }    
}

export function configureRoutes(app) {
	
	let routes = createRoutes(app);
	let routeTable = new RouteTable(routes);
	let router = express.Router();

	let middleware = createMiddleware(app);
	middleware.configure(router, routeTable);

	attachRoutesToRouter(router, routeTable);

	// apply the routes to our application with the prefix /api	
	app.use('/api', router);	
}