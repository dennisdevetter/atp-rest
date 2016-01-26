import ApiRoute from './ApiRoute';

export function createNewPlayer(req, res) {
	
}

var playerRoutes = [
  new ApiRoute({endpoint: '/player/create',  handler: createNewPlayer})
]

export default playerRoutes;
