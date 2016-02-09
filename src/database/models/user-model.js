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

export default mongoose.model('User', userSchema)

