import Route from './route';
import UserEntity from '../business/entities/user-entity';
import services from '../business/services';

var userService = services.userService;

export default function({ app }) {

  function addUser(req, res) {  
    let name = req.body.name;
    let password = req.body.password;  
    let email = req.body.email;
    let admin = !!req.body.admin;
    let user = new UserEntity({name, password, email, admin});
    
    return userService.addUser(user).then((id) => {      
      console.log(id);
        if (id) {                    
          res.json({ id });                
          return;
        }               
        res.status(409).send('The user could not be added. see log.');
      });  
  }

  function getAllUsers(req, res) {
    return userService.getUsers().then((users => {    
      res.json({
        items : users || []
      });
    }));  
  }

  function getUserByName(req, res) {  
    let name = req.params.name;

    return userService.getUserByName(name).then((user => {  
      return (!user) ? res.status(404).send('Not found') : res.json(user);
    }));  
  }

  function getUserById(req, res) {  
    let id = req.params.id;

    return userService.getUserById(id).then((user => {  
      return (!user) ? res.status(404).send('Not found') : res.json(user);  
    }));  
  }

  return [
    new Route({ endpoint :'/users/add', handler: addUser, method: 'POST' }),
    new Route({ endpoint: '/users', handler: getAllUsers }),
    new Route({ endpoint: '/users/:username(\\w+)', handler: getUserByName }),
    new Route({ endpoint: '/users/:id(\\d+)', handler: getUserById })
  ]
}
