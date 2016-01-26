import ServiceBase from './ServiceBase';
import UserModel from '../../database/models/UserModel';
import UserConverter from '../converters/UserConverter';

export default class UserService extends ServiceBase {
	constructor(props = { converter: UserConverter }){
		super(props);		
	}

	getUsers() {
		return this.callApi(UserModel.find({}));
	}
	
	getUserByName(name) {			
		return this.callApi(UserModel.findOne({
			name: name
		}));			
	}

	getUserById(id) {			
		return this.callApi(UserModel.findOne({
			id: id
		}));			
	}

	addUser(user) {
		let { name, email, password, admin = false} = user;

	  var userModel = new UserModel({ 
	    name: name, 
	    email: email,
	    password: password,
	    admin: admin 
	  });

		return userModel.save((user) => {
			 console.log('User saved successfully');
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
