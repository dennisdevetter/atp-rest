import ApiRoute from './ApiRoute';

// route to show a random message (GET http://localhost:8080/api/)
// ===============================================================
export function index(req, res) {
	console.log('index');
	res.json({ message: 'Welcome to the coolest API on earth!' });
}

var apiRoutes = [
  new ApiRoute({endpoint :'/', handler: index, isPublic: true})  
]

export default apiRoutes;
