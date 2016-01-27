import mongoose from 'mongoose';

var Schema = mongoose.Schema;

var userSchema = new Schema({ 
    name: String, 
    email : String,
    password: String, 
    admin: Boolean 
});

export default mongoose.model('User', userSchema);