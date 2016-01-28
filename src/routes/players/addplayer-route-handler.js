const routeHandler = ({ app }) => {
    return (req, res) => {
			console.log('addPlayer');
			res.json({ message: 'Player added' });
    }
}

export default routeHandler;