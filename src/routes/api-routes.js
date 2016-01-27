import Route from './route';

export default function({ app }) {

	function index(req, res) {
		console.log('index');
		res.json({ message: 'Welcome to the coolest API on earth!' });
	}

	return [
  	new Route({endpoint :'/', handler: index, isPublic: true})  
	]
}