import UserModel from '../../database/models/user-model';

export default function getByUserName (username) {			
	return UserModel.findOne({ username: username }).then((response => {
		// todo convert response
		return response;
	}));		
}	