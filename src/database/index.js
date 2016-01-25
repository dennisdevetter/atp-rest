import mongoose from 'mongoose';
import Promise from 'bluebird';

export function connectionEstablished() {	
	console.log("connection established");
}

export function connectionError(error) {
	console.log("An error occured connecting to the database");
}

export function connectToDatabase(connectionString) {
	if (!connectionString){
		throw Error('connectionString cannot be null');
	}
	
	mongoose.Promise = Promise;
	mongoose.connect(connectionString);

	var db = mongoose.connection;
	db.on('error', connectionError);
	db.once('open', connectionEstablished);
}
