import services from '../../services'

export default function listUsers(req, res, next) {
	// todo pagination
	// todo add total rowcount in response.

	services.userService.list([]).then((result) => {
		res.json({ users : result })	
	}).catch((error) => {		
		res.status(401).send({
			message: 'Failed to retrieve users',
			error: error
		})
	})
}