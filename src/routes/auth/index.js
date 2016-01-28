import Route from '../route';
import authenticateRouteHandler from './authenticate-route-handler';

export default function routes(options) {  
  return [    
    new Route({
    	endpoint: '/authenticate', 
    	method: 'POST', 
    	handler: authenticateRouteHandler(options), 
    	isPublic: true 
    })  
  ]
}