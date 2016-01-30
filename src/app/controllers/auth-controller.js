import express from 'express';
import services from '../../business/services';
import tokenizer from '../../utils/tokenizer';

function preAuthorize(req, res, next) {
	let { username, password } = req.body;

	username = username && username.trim();
	password = password && password.trim();
	console.log('username: ' + username);
	console.log('password: ' + password);

	if (!username || !password){
		 return res.status(403).send({  
	        success: false, 
	        message: 'Invalid request' 
	    });    
	}

	req.login = { username, password };
	next();
}

function authorize(req, res, next) {
	let { username, password } = req.login;	
	services.userService.authenticate(username, password).then((result => {		
	  let { authenticated } = result;        		  
	  req.login.authenticated = !!authenticated;		  
	  next();	  		
	})).catch((error) => {
	res.json({ 
	  success: false, 
	  message: `An error occurred: '${error}'`});  
	});
}

function postAuthorize({app}) {
	return function (req, res){
		let { authenticated, username, password } = req.login;
		if (authenticated) {          		    

			let tokenExpireTimeOut = '1d';
			let tokenSecret = app.get('superSecret');			
			let token = tokenizer.create(`${username}+${password}`, tokenSecret, tokenExpireTimeOut);

			res.json({
				success: true,
				message: `Enjoy your token! it will be available for ${tokenExpireTimeOut}`,
				token: token 
			});
		} else {
			res.status(403).send({message: 'User did not authenticate'});
		}
	}
}

export default function createController(options) {
	var router = express.Router();

	router.route('/auth')
		  .post(preAuthorize)
		  .post(authorize)
		  .post(postAuthorize(options));

    return router;
}