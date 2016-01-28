const routeHandler =  ({ app }) => (req, res) => {	
	res.json({ message: 'Welcome to the coolest API on earth!' });
}

export default routeHandler;