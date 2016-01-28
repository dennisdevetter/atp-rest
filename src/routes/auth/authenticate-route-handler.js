import services from '../../business/services';
import tokenizer from '../../utils/tokenizer';

const authenticateRouteHandler = ({ app }) => {
    
    return (req, res) => {
      var username = req.body.username; 
      var password = req.body.password;
      
      services.userService.authenticate(username, password).then((result => {
          let { authenticated, message } = result;        

          if (!authenticated) {          
            res.json({
              success: false,
              message: message
            })          
            return;
          }
          
          // the token expire timout is set to 24 hours.
          let tokenExpireTimeOut = '1d';
          let tokenSecret = app.get('superSecret');
          
          // create the authentication token based on the username and password and secret.
          let token = tokenizer.create(`${username}+${password}`, tokenSecret, tokenExpireTimeOut);
          
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
}

export default authenticateRouteHandler;