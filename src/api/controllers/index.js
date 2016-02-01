import home from './home';
import users from './users';
import auth from './auth';

export function createControllers(options) {
	return [
		home(options),
		users(options),
		auth(options)	
	];
}
	

