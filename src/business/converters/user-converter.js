import UserEntity from '../entities/user-entity';
import UserModel from '../../database/models/user-model';

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

export default {
	convertFrom : convertFrom,
	convertTo : convertTo
};

