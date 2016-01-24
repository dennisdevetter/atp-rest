import mongoose from 'mongoose';
import userModel from '../models/user';

function createNewUser(req, res) {
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

function getAllUsers(req, res) {
   userModel.find({}, function(err, users) {
    res.json(users);
  });
}

export default {
	'/setup' : { 'GET' : createNewUser },  
  '/users' : { 'GET' : getAllUsers }
}