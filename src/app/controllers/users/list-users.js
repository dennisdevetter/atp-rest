import services from '../../../business/services';

export default function listUsers(req, res, next) {
	services.userService.list([]).then((result) => {
		res.json({ message: 'the users', users : result });	
	}).catch((error) => {		
		res.status(401).send({
			message: 'Failed to retrieve users',
			error: error
		});
	});
}