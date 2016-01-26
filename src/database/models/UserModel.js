// get an instance of mongoose and mongoose.Schema
import mongoose from 'mongoose';
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
var userSchema = new Schema({ 
    name: String, 
    email : String,
    password: String, 
    admin: Boolean 
});

export default mongoose.model('User', userSchema);