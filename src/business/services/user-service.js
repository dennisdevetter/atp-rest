import UserModel from '../../database/models/user-model';
import Promise from 'bluebird';

export default function userService(options){

	// exposed service methods
	return {
		list,
		save,
		remove,
		getByUserName,
		authenticate
	}

	// query for users
	function list(query){		
		// todo options
		let options = {};
		return UserModel.find(options).then((response) => {
			// todo convert response
			console.log('found users');
			return response;
		});
	}

	// insert or update users
	function save(users = []){

		var requests  = [];
		var succeeded = [];
		var failed = [];

		users.forEach((user) => {
			let { username, email, password } = user;

			// todo.. check if user already exists.. if so throw error.
			
			var userModel = new UserModel({ 
				username: username, 
				email: email,
				password: password	    
			});

			console.log('saving ' + userModel);		
			requests.push(userModel.save());
			userModel.save().then((response) => {
				// todo check for failed or success
				succeeded.push(response);				
			})	
		});

		return Promise.all(requests).then((response) => {
			console.log('succeeded:' + succeeded.length);
			console.log(succeeded);
			return succeeded;
		});
	}

	// remove users
	function remove(users = []){
		// todo define what to remove
		return UserModel.find({}).remove();
	}

	// get single user by username
	function getByUserName (username) {			
		return UserModel.findOne({ username: username }).then((response => {
			// todo convert response
			return response;
		}));		
	}

	// simple authentication by username and password
	function authenticate(username, password){
		return getByUserName(username).then((user)=> {    
	     if (!user) {
			    return { 
			      authenticated: false,
			      message: 'Authentication failed. User not found.' 
			    };      
			  } 		        		 
			  if (user.password != password) {
			    return {
			     authenticated: false, 
			     message: 'Authentication failed. Wrong password.'
			    };
			  }		  
			  return {
			    authenticated: true		    		   
			  };  
		});
	}

}