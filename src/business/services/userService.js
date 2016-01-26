import UserModel from '../../database/models/user';
import converter from '../converters/UserConverter';
import Promise from 'bluebird';

const getUserByName = (name) => {	
	return new Promise((resolve, reject) => {
		UserModel.findOne({name: name}).exec().then((user) => {
				let entity = user && converter.convertFrom(user);				
				resolve(entity);
		}).catch((error) => {
				reject(error);
		});
	});
}

const userService = {
	getUserByName : getUserByName
};

export default userService;
