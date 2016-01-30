import express from 'express';
import services from '../../business/services';
import createAuthorizeRequestPipe from '../middleware/decode-token';

function normalizeSaveRequest(req, res, next) {
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

function addUsers(req, res, next){
	let { users = []} = req;

	if (users.length){
		services.userService.save(users).then((result) => {
			console.log('users added: ' + result);			
			res.send({message: 'users added'});
		}).catch((error) => {
			res.send({message: 'failed to add users'});
		});		
	}
	else{
		res.status(401).send({message: 'Nothing to do'});
	}	
}

function removeUsers(req, res, next) {

	let users = {};	
	services.userService.remove(users).then((result) => {
			console.log('users removed: ' + result);			
			res.send({message: 'users removed'});
		}).catch((error) => {
			res.send({message: 'failed to remove users'});
		});		
}

function updateUsers(req, res, next) {

}

function listUsers(req, res, next) {
	console.log('getting the users');

	services.userService.list([]).then((result) => {
		console.log(result);
		res.json({ message: 'the users', users : result });	
	}).catch((error) => {
		console.log(error);
		res.status(401).send({message: 'Failed to retrieve users'});
	});
}



export default function createController(options) {
	var router = express.Router();
	var authorize = createAuthorizeRequestPipe(options);

	router.route('/users')
		.get(listUsers);

	router.route('/users')
		.post(authorize)
		.post(normalizeSaveRequest)
		.post(addUsers);

	router.route('/users')		
		.delete(removeUsers);

    return router;
}