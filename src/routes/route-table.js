class RouteTable {

	constructor(routes = []){
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
			return route.endpoint.trim().toLowerCase() === endpoint.trim().toLowerCase();
		});

		return (filteredRoutes.length == 1 && filteredRoutes[0]);
	}
}

export default RouteTable;