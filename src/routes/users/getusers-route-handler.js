import services from '../../business/services';

const routeHandler = ({ app }) => (req, res) => {

	return services.userService.getUsers().then((users => {    
    res.json({
      items : users
    });
  }));  

}

export default routeHandler;