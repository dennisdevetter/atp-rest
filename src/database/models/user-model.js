import mongoose from 'mongoose'

var Schema = mongoose.Schema

var userSchema = new Schema({ 
    username: String, 
    email : String,
    password: String    
})

export function getSchema(){
	return userSchema
}

var UserModel = mongoose.model('User', userSchema)
export default UserModel

UserModel.create = (data) => new UserModel(data)


