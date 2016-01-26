import UserModel from '../../database/models/user';
import ServiceBase from './ServiceBase';
import UserConverter from '../converters/UserConverter';

export class _UserService extends ServiceBase {
	constructor(props){
		super(props);		
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

const userService = new _UserService({ converter: UserConverter});
export default userService;
