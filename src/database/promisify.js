import Promise from 'bluebird';
import mongoose from 'mongoose';

export default function Promisify(options){
	
	// this makes all database call async based on promises
	// instead of callback methods.
	// no need to include bluebird library where the database is called.	
	// IMPORTANT! removing this feature breaks the API's asynchronous behavior !!!!	
	mongoose.Promise = Promise;
}