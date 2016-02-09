import mongoose from 'mongoose'
import Promise from 'bluebird'
var systemUnderTest = require('../index')

describe('the database',() => {    
	it('should return a promise and connect when given a proper connectionstring', () => {                          
		// arrange
		var options = { connectionString : 'the connectionstring'}
		var connect = root.sandbox.stub(mongoose, 'connect')
		var onError = root.sandbox.stub(mongoose.connection, 'on')
		var onSuccess = root.sandbox.stub(mongoose.connection, 'once')

		// act
		var promise = systemUnderTest.configureDatabase(options)

		//assert				
		expect(connect).to.have.been.calledWith(options.connectionString) 
		expect(onError).to.have.been.calledWith('error')    
		expect(onSuccess).to.have.been.calledWith('open')    

		// todo: how to check if the promise is resolved??		
	})	

	it('should throw an error when the connectionstring is null', () => {                              	    
	    var options = { connectionstring : null}
	  	expect(systemUnderTest.configureDatabase.bind(systemUnderTest, options)).to.throw('connectionString cannot be null')
	})

	it('should throw an error when the options is null', () => {                              	    
	    var options = null
	  	expect(systemUnderTest.configureDatabase.bind(systemUnderTest, options)).to.throw('options cannot be null')
	})	

	it('should reject the promise when something goes wrong', (done) => {                          
		// arrange
		var somethingWentWrong = new Error('bla')
		var options = { connectionString : 'the connectionstring'}
		var connect = root.sandbox.stub(mongoose, 'connect').throws(somethingWentWrong)

		// act

		// assert
		systemUnderTest.configureDatabase(options).catch((error) => {
			expect(error).to.equal(somethingWentWrong)		
			done()
		})
	})	
})  