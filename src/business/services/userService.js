import ServiceBase from './ServiceBase';
import UserModel from '../../database/models/UserModel';
import UserConverter from '../converters/UserConverter';

export default class UserService extends ServiceBase {
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

		return userModel.save((response) => {		 
		   return user;
		});		
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
}
