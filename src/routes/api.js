import userService from '../business/services/userService';
import jwt from 'jsonwebtoken';
import ApiRoute from './ApiRoute';

// route to show a random message (GET http://localhost:8080/api/)
export function index(req, res) {
	res.json({ message: 'Welcome to the coolest API on earth!' });
}

export function authenticate(app, req, res) {  

	var username = req.body.username; 
  var password = req.body.password;
  
  userService.getUserByName(username).then((user)=> {
        
    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
      return;
    } 
    
    console.log('the user password = ' + user.password);

    console.log('the body password = ' + password);
    // check if password matches
    if (user.password != password) {
      res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      return;
    } 

    console.log("appp");
    // if user is found and password is right
    // create a token
    var token = jwt.sign(user, app.get('superSecret'), {
      expiresInMinutes: 1440 // expires in 24 hours
    });

    // return the information including token as JSON
    res.json({
      success: true,
      message: 'Enjoy your token!',
      token: token
    });
  }).catch((error) => {
    console.log(error);
    throw error;
  }); 
}

var apiRoutes = [
  new ApiRoute('/', index, 'GET', true)  
]

export default apiRoutes;