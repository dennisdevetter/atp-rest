export default function normalizeRequest(req, res, next) {
	let { username, password } = req.body;

	username = username && username.trim();
	password = password && password.trim();

	if (!username || !password){
		 return res.status(403).send({  
	        success: false, 
	        message: 'Invalid request' 
	    });    
	}

	req.login = { username, password };
	next();
}