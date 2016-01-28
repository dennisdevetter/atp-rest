import Route from '../route';
import addPlayerRouteHandler from './addplayer-route-handler';

export default function(options) {
	return [
  	new Route({
  		endpoint :'/player/add', 
  		handler: addPlayerRouteHandler(options), 
  		method: 'POST', 
  		isPublic: false
  	})  
	]
}