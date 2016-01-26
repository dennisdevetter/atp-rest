import { userService } from '../business/services/';
import jwt from 'jsonwebtoken';
import ApiRoute from './ApiRoute';

// the token expire timout is set to 24 hours.
var tokenExpireTimeOut = '1d';

export function createToken(value, secret, expirationTime) {

  var options = {
    expiresIn : tokenExpireTimeOut
  };

  var token = jwt.sign({payload: value}, secret, options);
  return token;
}

// route to show a random message (GET http://localhost:8080/api/)
export function index(req, res) {
	res.json({ message: 'Welcome to the coolest API on earth!' });
}

export function authenticate(app, req, res) {  

	var username = req.body.username; 
  var password = req.body.password;

  userService.authenticate(username, password).then((result => {
      let { authenticated, message } = result;

      if (!authenticated) {
        res.json({
          success: false,
          message: message
        })
        return;
    }

    let token = createToken(`${username}+${password}`, app.get('superSecret'));
    res.json({
      success: true,
      message: `Enjoy your token! it will be available for ${tokenExpireTimeOut}`,
      token: token
    });
  })).catch((error) => {
    res.json({ 
      success: false, 
      message: `An error occurred: '${error}'`});  
  });
}

var apiRoutes = [
  new ApiRoute('/', index, 'GET', true)  
]

export default apiRoutes;
