import tokenizer from '../utils/tokenizer';

function middleware(app) {

  function decodeTokenMiddleware(req, res, next) {  
    console.log('applying decode token middleware');

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
    tokenizer.verify(token, app.get('superSecret'), function(err, decoded) {      
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

  function configure(router, routeTable) {
    //applying middleware
    router.use((req, res, next) => {  
        let route = routeTable.getRouteByEndpoint(req.url);
        if (route && !route.isPublic) {
          decodeTokenMiddleware(req, res, next);  
        }
        else {
          // nothing to do here, continue to the next middleware
          next();
        }
    });
  }

  return {
      configure,
      decodeTokenMiddleware
    }
}

export default middleware;