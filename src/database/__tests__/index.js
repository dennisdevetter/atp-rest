var sut_database = require('../index')

describe('DATABASE', () => {    	
	it ('should not be empty', () => {
		expect(sut_database).to.not.be.empty
	})

	require('./configure-database').default()
	require('../constants/__tests__/').default()
	require('../controllers/__tests__/').default()
	require('../models/__tests__').default()
	require('../utils/__tests__').default()
})  