import services from '../../../business/services';

export default function authorize(req, res, next) {
	let { username, password } = req.login;	
	services.userService.authenticate(username, password).then((result => {		
		let { authenticated } = result;        	
		if (authenticated) { 
			req.login.authenticated = true;
			next();	  
		} else {
			res.status(403).send({message: 'User did not authenticate'});
		}	
	})).catch((error) => {
	res.json({ 
	  success: false, 
	  message: `An error occurred: '${error}'`});  
	});
}