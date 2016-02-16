import mongoose from 'mongoose'
import promisifyMongoose from './utils/promisify'

export default function configureDatabase(options) {			
	if (!options) throw Error('options cannot be null')

	let { connectionString } = options
	if (!connectionString) throw Error('connectionString cannot be null')

	// allows mongoose api to use promises
	promisifyMongoose(mongoose)

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