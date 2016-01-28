import services from '../../business/services';

const routeHandler = ({ app }) => (req, res) => {
  let id = req.params.id;

  return services.userService.getUserById(id).then((user => {  
    return (!user) 
    			? res.status(404).send('Not found') 
    			: res.json(user);  
  }));  

}

export default routeHandler;