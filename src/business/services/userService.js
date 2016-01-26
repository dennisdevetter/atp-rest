import UserModel from '../../database/models/user';
import ServiceBase from './ServiceBase';
import UserConverter from '../converters/UserConverter';

export default class UserService extends ServiceBase {
	constructor(props = { converter: UserConverter }){
		super(props);		
	}

	getUsers() {
		return this.callApi(UserModel.find());
	}
	
	getUserByName(username) {			
		return this.callApi(UserModel.findOne({
			name: username
		}));			
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
