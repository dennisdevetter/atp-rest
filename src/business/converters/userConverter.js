import UserEntity from '../entities/UserEntity';
import UserModel from '../../database/models/UserModel';

function convertFrom(model){
	let entity = new UserEntity({
		id : model._id,
		name : model.name,
		email : model.email,
		password : model.password,
		admin : model.admin		
	});

	return entity;
}

function convertTo(entity){
	let model = new UserModel({
		name : entity.name,
		email : entity.email,
		password : entity.password,
		admin : entity.admin		
	});

	return model;
};


const UserConverter = {
	convertFrom : convertFrom,
	convertTo : convertTo
}

export default UserConverter;

