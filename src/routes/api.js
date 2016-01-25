import userModel from '../models/user';
import config from '../config'; 
import jwt from 'jsonwebtoken';
import ApiRoute from './ApiRoute';

// route to show a random message (GET http://localhost:8080/api/)
export function index(req, res) {
	res.json({ message: 'Welcome to the coolest API on earth!' });
}

export function authenticate(req, res) {  

	var username = req.body.username;
	var password = req.body.password;

  // find the user
  userModel.findOne({ name: username }, function(err, user) {
    if (err) {
    	throw err;
    }

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
      return;
    } 

    // check if password matches
    if (user.password != password) {
      res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      return;
    } 

    // if user is found and password is right
    // create a token
    var token = jwt.sign(user, config.secret, {
      expiresInMinutes: 1440 // expires in 24 hours
    });

    // return the information including token as JSON
    res.json({
      success: true,
      message: 'Enjoy your token!',
      token: token
    });
  });
}

let isPublicRoute = true;

var apiRoutes = [
  new ApiRoute('/', index, 'GET', isPublicRoute),
  new ApiRoute('/authenticate', authenticate, 'POST', isPublicRoute)  
]

export default apiRoutes;