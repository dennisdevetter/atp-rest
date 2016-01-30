import services from '../../../services';

export default function removeUsers(req, res, next) {
	let users = {};	
	services.userService.remove(users).then((result) => {					
			res.send({message: 'users removed'});
		}).catch((error) => {
			res.send({message: 'failed to remove users'});
		});		
}