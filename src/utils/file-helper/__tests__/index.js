import sut_fileHelper from '../index'

describe('utils', () => {  			
	describe('file helper', () => {
		it('should not be empty', () => {
			expect(sut_fileHelper).to.not.be.empty
		})
	})
})