import apiRoutes from './api';
import userRoutes from './users';
import playerRoutes from './players';

const getAllRoutes = () => {
	var routeMap = {};

	function addRoutes(routes) {
		for(let key in routes ){		
			if (!routeMap[key]) {
				routeMap[key]=routes[key];
			}
			else{
				throw Error(`duplicate route found with key ${key}`);
			}		
		}
	}

	addRoutes(userRoutes);
	addRoutes(playerRoutes);
	addRoutes(apiRoutes);

	return routeMap;
}

const addRoutesToRouter = (routes, router)  => {

	Object.keys(routes).map((endpoint) => {
		let route = routes[endpoint], routeKeys = Object.keys(route);
		if (routeKeys.length >= 1 && routeKeys[0])
		{	
			let method = routeKeys[0];					
			let routeHandler = route[method];		
			if (method && typeof routeHandler === 'function')		{									
					method = method.toLowerCase().trim();
					let routerMethod = router[method];
					if (routerMethod) {
						router[method](endpoint, routeHandler);
						console.log(`added route '${method} ${endpoint}'`);		
					}				
			}
		} 
	});
}

export const createRoutes = (router) => {
	addRoutesToRouter(routes, router);			
}

export const isSecureRoute = (endpoint) => {
	if (!endpoint) 	{
			throw Error('endpoint cannot be null');
	}
	
	let uri = endpoint.trim().toLowerCase();
	let route = routes[uri];
	
	if (!route || route.isPublic)	{
		console.log('route is not secure');
		return false;
	}

	return true;
}

var routes = getAllRoutes() || {};

export default {
	createRoutes,	
	isSecureRoute
};

