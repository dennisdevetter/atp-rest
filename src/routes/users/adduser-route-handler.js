import services from '../../business/services';
import UserEntity from '../../business/entities/user-entity';

const routeHandler = ({ app }) => (req, res) => {  
  let name = req.body.name;
  let password = req.body.password;  
  let email = req.body.email;
  let admin = !!req.body.admin;
  let user = new UserEntity({name, password, email, admin});

  console.log("adding user");
  return services.userService.addUser(user).then((id) => {      
    console.log(id);
    if (id) {                    
        res.json({ id });                
        return;
    }               

    res.status(409).send('The user could not be added. see log.');
  });      
}

export default routeHandler;