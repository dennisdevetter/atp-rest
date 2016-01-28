import Route from '../route';
import addUserRouteHandler from './adduser-route-handler';
import getUsersRouteHandler from './getusers-route-handler';
import getUserByNameRouteHandler from './getuserbyname-route-handler';
import getUserByIdRouteHandler from './getuserbyid-route-handler';

export default function(options) {
  return [
    new Route({
      endpoint :'/users/add', 
      handler: addUserRouteHandler(options),
      method: 'POST' 
    }),

    new Route({ 
      endpoint: '/users', 
      handler: getUsersRouteHandler(options), 
      method: 'GET' 
    }),
    new Route({ 
      endpoint: '/users/:username(\\w+)',
      handler: getUserByNameRouteHandler(options), 
      method: 'GET' 
    }),
    new Route({ 
      endpoint: '/users/:id(\\d+)', 
      handler: getUserByIdRouteHandler(options), 
      method: 'GET' 
    })
  ]
}