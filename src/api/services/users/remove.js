import UserModel from '../../../database/models/user-model'

export default function remove(users = []){
	// todo define what to remove
	return UserModel.find({}).remove()
}