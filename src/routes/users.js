import mongoose from 'mongoose';
import userModel from '../models/user';
import ApiRoute from './ApiRoute';

export function createNewUser(req, res) {
	// create a sample user
  var nick = new userModel({ 
    name: 'Nick Cerminara', 
    password: 'password',
    admin: true 
  });

  // save the sample user
  nick.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({ success: true });
  });
}

export function getAllUsers(req, res) {
   userModel.find({}, function(err, users) {
    res.json(users);
  });
}

var userRoutes = [
  new ApiRoute('/setup', createNewUser),
  new ApiRoute('/users', getAllUsers)
]

export default userRoutes;

