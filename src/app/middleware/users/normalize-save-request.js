export default function normalizeSaveRequest(req, res, next) {
	let { users} = req.body;

	try {
		users = users && JSON.parse(users) || [];		
	}
	catch (error) {
		res.status(401).send({message: 'bad request'});
		return;
	}
		
	let entities = [];
	users.forEach((user) => {
		if (user.id && req.method == 'POST') {
			res.status(401).send({message: 'POST method not allowed for existing users'});
		}		
		let entity = {
			username : user.username,
			password : user.password,
			email	: user.email	
		};
		entities.push(entity);
	});
	req.users = entities;
	next();
}