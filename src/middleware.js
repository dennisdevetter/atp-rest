import jwt from 'jsonwebtoken';
import { isSecureRoute } from './routes';

export function decodeToken(app, req, res, next) {  
  if (!isSecureRoute(req.url))
  {
    console.log('public route. skip decoding token');
    next();
    return;
  }

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // if there is no token return an error
  if (!token)  {
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });    
  }

  // verifies secret and checks exp
  jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
    if (err) {
      return res.json({ success: false, message: 'Failed to authenticate token.' });    
    } 
    else {
      // if everything is good, save to request for use in other routes
      req.decoded = decoded;    
      next();
    }
  });
}

export const applyMiddleware = (router, app) => {  
  router.use((req, res, next) => {  
      decodeToken(app, req, res, next);
  });
};

export default {
  applyMiddleware
}