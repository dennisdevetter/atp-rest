import UserModel from '../../../database/models/user-model'

export default function save(users = []){

	var requests  = []
	var succeeded = []
	var failed = []

	users.forEach((user) => {
		let { username, email, password } = user

		// todo.. check if user already exists.. if so throw error.
		
		var userModel = new UserModel({ 
			username: username, 
			email: email,
			password: password	    
		})
		
		requests.push(userModel.save())
		userModel.save().then((response) => {
			// todo check for failed or success
			succeeded.push(response)				
		})	
	})

	return Promise.all(requests).then((response) => {						
		// todo convert the entities (update id's for new users)
		return succeeded
	})
}