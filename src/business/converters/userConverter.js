import UserEntity from '../entities/user';
import UserModel from '../../database/models/user';

function convertFrom(model){
	let entity = new UserEntity({
		name : model.name,
		password : model.password,
		isAdmin : model.admin,
		email : model.email
	});
	
	console.log(entity.password);

	return entity;
}

function convertTo(entity){
	let model = new UserModel({
		name : entity.name,
		password : entity.password,
		admin : entity.isAdmin,
		email : entity.entity
	});

	return model;
};


const UserConverter = {
	convertFrom : convertFrom,
	convertTo : convertTo
}

export default UserConverter;

