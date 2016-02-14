import sut_utils from '../index'

describe('UTILS', () => {

	it('should not be empty', () => {
		expect(sut_utils).to.not.be.empty
	})

	it('should have all the utils', () => {
		var keys = ['taskRunner', 'dataImporter', 'csvConverter', 'fileHelper']
		expect(sut_utils).to.have.all.keys(keys)
	})	
	
	require('../task-runner/__tests__').default()
})