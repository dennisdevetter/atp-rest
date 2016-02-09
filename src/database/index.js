import mongoose from 'mongoose'
import Promise from 'bluebird'

// allows mongoose api to use promises
import promisifyMongoose from './promisify'
promisifyMongoose(mongoose)

export function configureDatabase(options) {			
	if (!options) throw Error('options cannot be null')

	let { connectionString } = options
	if (!connectionString) throw Error('connectionString cannot be null')

	return new Promise((resolve, reject) => {
		try {			
			mongoose.connect(connectionString)
			
			let db = mongoose.connection
			db.on('error', (error) => {				
				reject(error)
			}) 
			db.once('open', () => {								
				resolve()
			})
		}
		catch(error) {
			reject(error)
		}
	})
}

export default {
	configure : configureDatabase
}