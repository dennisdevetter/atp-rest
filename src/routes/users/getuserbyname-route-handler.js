import services from '../../business/services';

const routeHandler = ({ app }) => (req, res) => {
	let name = req.params.name;
  
  return services.userService.getUserByName(name).then((user => {  
      return (!user) 
      		? res.status(404).send('Not found') 
      		: res.json(user);
  }));  
}

export default routeHandler;