import systemUnderTest from '../promisify'

describe('database', () => {
	describe('utils', () => {
		describe('promisify MongoDB database', () => {
			it('should initialize promises for mongoose database queries', () => {                          
				var options = 'options'       
				systemUnderTest(options)

				var mongoose = require('mongoose')			
				//expect(mongoose.Promise).to.equal(Promise)		
			})		
		})
	})	
})