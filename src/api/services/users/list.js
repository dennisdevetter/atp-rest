import UserModel from '../../../database/models/user-model'

export default function list(query){		
	// todo options
	let options = {}
	return UserModel.find(options).then((response) => {
		// todo convert response
		return response
	})
}