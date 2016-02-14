import mongoose from 'mongoose'

var Schema = mongoose.Schema

var userSchema = new Schema({ 
    username: String, 
    email : String,
    password: String    
})

var UserModel = mongoose.model('User', userSchema)
UserModel.create = (data) => new UserModel(data)

export function getSchema(){
	return userSchema
}

export default UserModel


