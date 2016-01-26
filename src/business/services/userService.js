import UserModel from '../../database/models/user';
import converter from '../converters/UserConverter';
import Promise from 'bluebird';

export function runAsync(promise, success, failure) {
	return new Promise((resolve, reject) => {
		promise.exec().then((result) => {				
				resolve(success(result));
		}).catch((error) => {
				let rejectResult = error;
				if (failure) {
					rejectResult = failure(error);
				}
				reject(rejectResult);
		});
	});
};

export function convert(user) {
	return user && converter.convertFrom(user);				
}

export function getUserByName(name) {	
	var promise = UserModel.findOne({name: name});
	return runAsync(promise, convert);
}

export function authenticate(username, password) {
	return getUserByName(username).then((user)=> {    
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

const userService = {
	authenticate : authenticate,
	getUserByName : getUserByName
};

export default userService;
