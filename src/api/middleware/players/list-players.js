import services from '../../services';

export default function listPlayers(req, res, next) {
	// todo pagination
	// todo add total rowcount in response.

	services.playerService.list([]).then((result) => {
		res.json({ players : result });	
	}).catch((error) => {		
		res.status(401).send({
			message: 'Failed to retrieve players',
			error: error
		});
	});
}