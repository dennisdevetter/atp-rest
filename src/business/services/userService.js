import UserModel from '../../database/models/user';
import converter from '../converters/UserConverter';

import Promise from 'bluebird';

const getUserByName = (name) => {	
	let mongoosePromise = UserModel.findOne({name: name}).exec();

	var handler = (resolve, reject) => {
			mongoosePromise.then((user) => {
					let entity = null;
					if (user) {						
						entity = converter.convertFrom(user);
					}
					resolve(entity);
			}).catch((error) => {
					reject(error);
			});
	};

	let servicePromise = new Promise(handler);

	return Promise.all([mongoosePromise, servicePromise]);
}

const userService = {
	getUserByName : getUserByName
};

export default userService;
