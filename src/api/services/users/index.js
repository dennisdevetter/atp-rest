import list from './list'
import save from './save'
import remove from './remove'
import getByUserName from './get-by-username'
import authenticate from './authenticate'

// todo add decorators to retrieve + update from cache

export default function userService(options){

	return {
		list,
		save,
		remove,
		getByUserName,
		authenticate
	}
}