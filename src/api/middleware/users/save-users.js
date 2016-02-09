import services from '../../services'

export default function saveUsers(req, res, next){
	let { users = []} = req

	if (users.length){
		services.userService.save(users).then((result) => {				
			res.send({message: 'users saved'})
		}).catch((error) => {
			res.send({message: 'failed to saved users'})
		})		
	}
	else{
		res.status(401).send({message: 'Nothing to do'})
	}	
}