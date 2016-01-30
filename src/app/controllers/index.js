import createUserController from './user-controller';
import createHomeController from './home-controller';
import createAuthController from './auth-controller';

export function createControllers(options){		
	
	return [
		createHomeController(options),
		createUserController(options),
		createAuthController(options)
	]		
}