import Route from '../route';
import indexRouteHandler from './index-route-handler';

export default function(options) {
	return [
  	new Route({
  		endpoint :'/', 
  		handler: indexRouteHandler(options), 
  		isPublic: true
  	})  
	]
}