import home from './home';
import users from './users';
import players from './players';
import auth from './auth';

export function createControllers(options) {
	return [
		home(options),
		users(options),
		players(options),
		auth(options)	
	];
}
	

