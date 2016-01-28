import Service from './service';
import UserModel from '../../database/models/user-model';
import UserConverter from '../converters/user-converter';

export default class UserService extends Service {
	constructor(props = { converter: UserConverter }){
		super(props);		
	}
	
	getUsers() {
		let query = UserModel.find({});
		return this.request(query);
	}
	
	getUserByName(name) {			
		let query = UserModel.findOne({ name: name });
		return this.request(query);			
	}

	getUserById(id) {			
		let query = UserModel.findOne({ _id: id	});			
		return this.request(query);
	}

	addUser(user) {
		let { name, email, password, admin = false} = user;

	  var userModel = new UserModel({ 
	    name: name, 
	    email: email,
	    password: password,
	    admin: admin 
	  });
		
		return userModel.save().then(this.__saveResponse);
	}

	authenticate(username, password){
		return this.getUserByName(username).then((user)=> {    
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

	// private methods
	__saveResponse(response, numberAffected) {		
		return response && response._id;
	}	
}
