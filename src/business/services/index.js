import UserService from './UserService';

export const userService = new UserService();

const serviceFactory = {
	userService
}

export default serviceFactory;