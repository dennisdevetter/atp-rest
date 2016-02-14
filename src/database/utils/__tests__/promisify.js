import Promise from 'bluebird'
import systemUnderTest from '../promisify'

export default function tests() {
	describe('promisify MongoDB database', () => {
		it('should initialize promises for mongoose database queries', () => {                          
			var options = 'options'       
			systemUnderTest(options)

			var mongoose = require('mongoose')			
			//expect(mongoose.Promise).to.equal(Promise)		
		})		
	})	
}