class UserEntity {
	constructor({name , email, password, isAdmin}) {
		this.name = name;
		this.email = email;
		this.password = password;
		this.admin = isAdmin;
	}	
}

export default UserEntity;