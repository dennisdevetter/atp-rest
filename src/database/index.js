import mongoose from 'mongoose';
import Promise from 'bluebird';

export function connectionEstablished() {	
	console.log('connection established');
}

export function connectionError(error) {
	console.log('An error occured connecting to the database');
}

export function configureDatabase(connectionString) {
	if (!connectionString){
		throw Error('connectionString cannot be null');
	}
	
	// this makes all database call async based on promises
	// instead of callback methods.
	// no need to include bluebird library where the database is called.		
	mongoose.Promise = Promise;
	mongoose.connect(connectionString);

	var db = mongoose.connection;
	db.on('error', connectionError);
	db.once('open', connectionEstablished);
}
