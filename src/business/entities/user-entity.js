class UserEntity {
	constructor({id, name , email, password, admin}) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.password = password;
		this.admin = admin;
	}		
}

export default UserEntity;