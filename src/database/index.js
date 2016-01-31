import mongoose from 'mongoose';
import promisifyMongoose from './promisify';

export function connectionEstablished() {	
	console.log('database connection established');
}

export function connectionError(error) {	
	console.log('Database connection error: ' + error);
}

export function configureDatabase(options) {
	let { connectionString } = options;

	promisifyMongoose(options);

	console.log('connecting to ' + connectionString);
	mongoose.connect(connectionString);
	
	let db = mongoose.connection;
	db.on('error', connectionError); 
	db.once('open', connectionEstablished);
}

export default {
	configure : configureDatabase
}
