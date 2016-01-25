import apiRoutes from './api';
import userRoutes from './users';
import playerRoutes from './players';
import ApiRoute from './ApiRoute';

var allRoutes = [].concat(apiRoutes, userRoutes, playerRoutes);

export const getAllRoutes = () => {
	return allRoutes;
}

export const createRoute = (endpoint, handler, method, isPublic) => {
	return new ApiRoute(endpoint, handler, method, isPublic);
}

export const addRoutesToRouter = (routes = [], router)  => {
	if (!router){
		throw Error('router cannot be null');
	}

	for(let index in routes){		
		let { method, endpoint, handler } = routes[index];						
		let methodLowerCased = method.toLowerCase().trim();
		if (router[methodLowerCased]) {			
			router[methodLowerCased](endpoint, handler);			
		}				
	}
}

export const isSecureRoute = (endpoint) => {
	if (!endpoint) 	{
			throw Error('endpoint cannot be null');
	}
		
	let routes = allRoutes.filter((r) => { 		
		return r.endpoint.trim().toLowerCase() === endpoint.trim().toLowerCase();
	});

	return (routes.length == 1 && routes[0].isPublic === false);
}

export default {
	addRoutesToRouter,	
	isSecureRoute,
	getAllRoutes
};

