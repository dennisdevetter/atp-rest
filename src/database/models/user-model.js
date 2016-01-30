import mongoose from 'mongoose';

var Schema = mongoose.Schema;

var userSchema = new Schema({ 
    username: String, 
    email : String,
    password: String    
});

export default mongoose.model('User', userSchema);