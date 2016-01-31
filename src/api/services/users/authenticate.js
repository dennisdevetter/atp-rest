import getByUserName from './get-by-username';

export default function authenticate(username, password){
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