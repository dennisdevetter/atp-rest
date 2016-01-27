import Route from './route';

export default function(app) {

	function addPlayer(req, res) {
		console.log('addPlayer');
		res.json({ message: 'Player added' });
	}

	return [
  	new Route({endpoint :'/player/add', handler: addPlayer, method: 'POST', isPublic: false})  
	]
}