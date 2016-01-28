function normalize(value){
	return value.trim().toLowerCase();
}

class RouteTable {

	constructor({ routes = [] }){
		this.routes = routes;
	}

	addRoute(route){
		// todo check type ApiRoute.
		this.routes.push(route);
	}

	getRouteByEndpoint(endpoint) {
		if (!endpoint) 	{
				throw Error('endpoint cannot be null');
		}
		
		// todo match uri with route using regex....	
		let filteredRoutes = this.routes.filter((route) => { 					
			return normalize(route.endpoint) === normalize(endpoint);
		});

		if (filteredRoutes.length == 1)
		{
			return filteredRoutes[0];	
		}

		return null;
	}
}

export default RouteTable;