import sut_utils from '../index'

describe('utils', () => {  	
	it('should not be empty', () => {
		expect(sut_utils).to.not.be.empty
	})

	it('should have all the utils', () => {
		var keys = ['taskRunner', 'dataImporter', 'csvConverter', 'fileHelper', 'logger']
		expect(sut_utils).to.have.all.keys(keys)
	})	
})