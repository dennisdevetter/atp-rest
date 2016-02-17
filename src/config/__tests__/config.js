import systemUnderTest from '../index'

describe('configuration', () => {
	it('should have a value for secret', () => {
	  expect(systemUnderTest.secret).to.not.be.empty
	})

	it('should have a value for database', () => {
	  expect(systemUnderTest.database).to.not.be.empty
	})	
})

