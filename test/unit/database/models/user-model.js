import mongoose from 'mongoose';

describe('user model',() => {
	it('should create a schema and return the model', () => {                       	    
	    var systemUnderTest = require('../../../../src/database/models/user-model').default;
	    expect(systemUnderTest.modelName).to.be.equal('User');
	});

	it('should create a schema and return the model', () => {                       	    
		// arrange
	    var { getSchema } = require('../../../../src/database/models/user-model');
	    
	    // act
	    var systemUnderTest = getSchema();	    

	    // assert
	    // todo needs some further testing
		expect(systemUnderTest.paths['username']).to.be.ok; 
		expect(systemUnderTest.paths['email']).to.be.ok; 
		expect(systemUnderTest.paths['password']).to.be.ok; 
	});
});  