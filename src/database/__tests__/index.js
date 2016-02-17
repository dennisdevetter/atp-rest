var sut_database = require('../index')

describe('database', () => {    	
	it ('should not be empty', () => {
		expect(sut_database).to.not.be.empty
	})	
})  