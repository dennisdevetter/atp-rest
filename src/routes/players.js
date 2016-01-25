import ApiRoute from './ApiRoute';

export function createNewPlayer(req, res) {
	
}

var playerRoutes = [
  new ApiRoute('/player/create', createNewPlayer)
]

export default playerRoutes;
