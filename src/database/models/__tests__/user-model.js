import mongoose from 'mongoose'

describe('user model',() => {
	it('should return the user model', () => {                       	    
	    var systemUnderTest = require('../user-model').default
	    expect(systemUnderTest.modelName).to.be.equal('User')
	})

	it('should create a schema', () => {                       	    
		// arrange
	    var { getSchema } = require('../user-model')
	    
	    // act
	    var systemUnderTest = getSchema()	    

	    // assert
	    // todo needs some further testing
		expect(systemUnderTest.paths['username']).to.be.ok 
		expect(systemUnderTest.paths['email']).to.be.ok 
		expect(systemUnderTest.paths['password']).to.be.ok
	})
})  