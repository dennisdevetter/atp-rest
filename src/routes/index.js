import apiRoutes from './api';
import userRoutes from './users';
import playerRoutes from './players';
import ApiRoute from './ApiRoute';
import RouteTable from './RouteTable';
import { decodeTokenMiddleware } from './middleware';
import { authenticate } from './auth';

var routes = apiRoutes.concat(userRoutes, playerRoutes);
var routeTable = new RouteTable(routes);

function attachRoutesToRouter(routes = [], router){
		if (!router){
			throw Error('router cannot be null');
		}

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

export function configureRoutes(app, router) {

	// apply decoding middleware for each secure route
	router.use((req, res, next) => { 	
		  let route = routeTable.getRouteByEndpoint(req.url);
		  if (route && route.isPublic)
		  {
		    console.log('public route. skip decoding token');
		    next();
		    return;
		  }

			decodeTokenMiddleware(req, res, next);
	});

	// add an authentication route to the route table		
	routeTable.addRoute(
		new ApiRoute({endpoint: '/authenticate', method: 'POST', handler: authenticate, isPublic: true })
	);

	// attach the routes to the router
	attachRoutesToRouter(routeTable.routes, router);

	// apply the routes to our application with the prefix /api
	app.use('/api', router);	
}

export default routeTable;



