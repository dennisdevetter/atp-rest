import home from './home';
import users from './users';
import auth from './auth';

export default {
	create : (options) => {
		return [
			home(options),
			users(options),
			auth(options)	
		];
	}
}

