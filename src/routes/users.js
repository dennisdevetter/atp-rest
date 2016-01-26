import ApiRoute from './ApiRoute';
import UserEntity from '../business/entities/UserEntity';
import { userService } from '../business/services/';

export function addUser(req, res) {	
  let name = req.body.name;
  let password = req.body.password;  
  let email = req.body.email;
  let admin = !!req.body.admin;
  let user = new UserEntity({name, password, email, admin});
  console.log(user);

  return userService.addUser(user).then(() => {
      res.json({
        message: 'User has been added'
      });      
    });  
}

export function getAllUsers(req, res) {
  return userService.getUsers().then((users => {    
    res.json({
      items : users || []
    });
  }));  
}

export function getUserByName(req, res) {  
  let name = req.params.name;

  return userService.getUserByName(name).then((user => {  
    return (!user) ? res.status(404).send('Not found') : res.json(user);
  }));  
}

export function getUserById(req, res) {  
  let id = req.params.id;

  return userService.getUserById(id).then((user => {  
    return (!user) ? res.status(404).send('Not found') : res.json(user);  
  }));  
}

var userRoutes = [
  new ApiRoute({ endpoint :'/users/add', handler: addUser, method: 'POST' }),
  new ApiRoute({ endpoint: '/users', handler: getAllUsers }),
  new ApiRoute({ endpoint: '/users/:username(\\w+)', handler: getUserByName }),
  new ApiRoute({ endpoint: '/users/:id(\\d+)', handler: getUserById })


]

export default userRoutes;

